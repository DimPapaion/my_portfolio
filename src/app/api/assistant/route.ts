import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Provider = "gemini" | "groq" | "openrouter" | "none";
function provider(): Provider {
  if (process.env.GEMINI_API_KEY) return "gemini";
  if (process.env.GROQ_API_KEY) return "groq";
  if (process.env.OPENROUTER_API_KEY) return "openrouter";
  return "none";
}

type AssistantRequest = { prompt: string; context?: string[] };
type AssistantSuccess = { text: string };
type AssistantError = { error: string };

export async function GET() {
  const prov = provider();
  return NextResponse.json({ ok: true, provider: prov, hasKey: prov !== "none" });
}

export async function POST(req: NextRequest) {
  const prov = provider();

  let body: AssistantRequest;
  try {
    body = (await req.json()) as AssistantRequest;
  } catch {
    return NextResponse.json<AssistantError>({ error: "Bad JSON" }, { status: 400 });
  }

  const prompt = body?.prompt?.trim();
  const context = Array.isArray(body?.context) ? body!.context : [];
  if (!prompt) return NextResponse.json<AssistantError>({ error: "Missing prompt" }, { status: 400 });

  if (prov === "none") {
    return NextResponse.json<AssistantSuccess>({
      text: "LLM mode is off (no API key). Use: “open CV”, “show projects”, “go to experience”.",
    });
  }

  const grounded =
  [
    "You are a helpful assistant for Dimitrios Papaioannou’s portfolio site.",
    "Use the provided site context when possible. Never request the user to paste content.",
    "Style: concise, confident, third-person when asked about Dimitrios. Prefer bullets over long paragraphs.",
    "If the question is about hiring/fit/suitability, respond with this format:\n" +
      "1) Verdict: (Yes/Yes, with caveats/No)\n" +
      "2) Why (3 short bullets)\n" +
      "3) Evidence (cite which section: Projects, Publications, Experience)\n" +
      "4) Next step (suggest: Open CV, View Projects, Email link)\n",
    ...context, // or your 'context'
    "\nWhen helpful, mention the relevant section by name (Projects, Publications, Experience).",
  ].join("\n---\n") + `\n\nQ: ${prompt}`;

  // small timeout so the UI doesn’t hang forever
  const withTimeout = (ms: number) => {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), ms);
    return { signal: ctl.signal, clear: () => clearTimeout(t) };
  };

  try {
    let text = "";

    if (prov === "gemini") {
      // Try a robust model first, then fall back if needed
      const models = [
        "gemini-1.5-flash-latest",
        "gemini-1.5-flash",
        "gemini-2.0-flash-exp",
      ];

      let lastErr = "";
      for (const model of models) {
        try {
          const t = withTimeout(15000);
          const r = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                contents: [{ role: "user", parts: [{ text: grounded }] }],
              }),
              cache: "no-store",
              signal: t.signal,
            }
          );
          t.clear();

          const raw = await r.text();
          if (!r.ok) {
            lastErr = `Gemini ${model} ${r.status}: ${raw.slice(0, 300)}`;
            continue;
          }
          const data = JSON.parse(raw) as {
            candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
          };
          text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
          if (text) break;
          lastErr = `Gemini ${model} returned no text`;
        } catch (e) {
          lastErr = `Gemini ${model} fetch failed: ${(e as Error).message}`;
        }
      }

      if (!text) {
        return NextResponse.json<AssistantError>({ error: lastErr || "Gemini failed" }, { status: 502 });
      }
    }

    if (prov === "groq") {
      const t = withTimeout(15000);
      const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-70b-versatile",
          messages: [
            { role: "system", content: grounded },
            { role: "user", content: prompt },
          ],
          temperature: 0.4,
        }),
        cache: "no-store",
        signal: t.signal,
      });
      t.clear();

      const raw = await r.text();
      if (!r.ok) return NextResponse.json<AssistantError>({ error: `Groq ${r.status}: ${raw.slice(0, 300)}` }, { status: 502 });
      const data = JSON.parse(raw) as { choices?: Array<{ message?: { content?: string } }> };
      const txt = data?.choices?.[0]?.message?.content ?? "";
      if (!txt) return NextResponse.json<AssistantError>({ error: "Groq returned no text" }, { status: 502 });
      text = txt;
    }

    if (prov === "openrouter") {
      const model = process.env.OPENROUTER_MODEL || "meta-llama/llama-3.1-70b-instruct";
      const t = withTimeout(15000);
      const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://dimpap.vercel.app",
          "X-Title": "Dimitrios Portfolio Assistant",
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: "system", content: grounded },
            { role: "user", content: prompt },
          ],
          temperature: 0.4,
        }),
        cache: "no-store",
        signal: t.signal,
      });
      t.clear();

      const raw = await r.text();
      if (!r.ok) return NextResponse.json<AssistantError>({ error: `OpenRouter ${r.status}: ${raw.slice(0, 300)}` }, { status: 502 });
      const data = JSON.parse(raw) as { choices?: Array<{ message?: { content?: string } }> };
      const txt = data?.choices?.[0]?.message?.content ?? "";
      if (!txt) return NextResponse.json<AssistantError>({ error: "OpenRouter returned no text" }, { status: 502 });
      text = txt;
    }

    return NextResponse.json<AssistantSuccess>({ text: text.trim() });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json<AssistantError>({ error: msg.slice(0, 500) }, { status: 502 });
  }
}
