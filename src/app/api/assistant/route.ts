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

type GeminiResponse = {
  candidates?: Array<{
    content?: { parts?: Array<{ text?: string }> };
  }>;
};

type GroqResponse = {
  choices?: Array<{ message?: { content?: string } }>;
};

type OpenRouterResponse = {
  choices?: Array<{ message?: { content?: string } }>;
};

export async function GET() {
  const prov = provider();
  return NextResponse.json({ ok: true, provider: prov, hasKey: prov !== "none" });
}

export async function POST(req: NextRequest) {
  const prov = provider();

  let body: AssistantRequest | null = null;
  try {
    body = (await req.json()) as AssistantRequest;
  } catch {
    return NextResponse.json<AssistantError>({ error: "Bad JSON" }, { status: 400 });
  }

  const prompt = body?.prompt?.trim();
  const context = Array.isArray(body?.context) ? body!.context : [];

  if (!prompt) {
    return NextResponse.json<AssistantError>({ error: "Missing prompt" }, { status: 400 });
  }

  if (prov === "none") {
    return NextResponse.json<AssistantSuccess>({
      text:
        "LLM mode is off (no API key set). Try: “open CV”, “show projects”, “go to experience”.",
    });
  }

  const grounded =
    [
      "You are a helpful assistant for Dimitrios’s portfolio site.",
      "Rely primarily on this site context when answering:",
      ...context,
      "\nKeep answers concise; point to sections (Projects, Publications, Experience) when relevant.",
    ].join("\n---\n") + `\n\nQ: ${prompt}`;

  try {
    let text = "";

    if (prov === "gemini") {
      const r = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
          process.env.GEMINI_API_KEY,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: grounded }] }],
          }),
          cache: "no-store",
        }
      );
      if (!r.ok) {
        const t = await r.text().catch(() => "");
        return NextResponse.json<AssistantError>({ error: `Gemini error: ${t.slice(0, 400)}` }, { status: 502 });
      }
      const data = (await r.json()) as GeminiResponse;
      text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "(no answer)";
    }

    if (prov === "groq") {
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
      });
      if (!r.ok) {
        const t = await r.text().catch(() => "");
        return NextResponse.json<AssistantError>({ error: `Groq error: ${t.slice(0, 400)}` }, { status: 502 });
      }
      const data = (await r.json()) as GroqResponse;
      text = data?.choices?.[0]?.message?.content ?? "(no answer)";
    }

    if (prov === "openrouter") {
      const model = process.env.OPENROUTER_MODEL || "meta-llama/llama-3.1-70b-instruct";
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
      });
      if (!r.ok) {
        const t = await r.text().catch(() => "");
        return NextResponse.json<AssistantError>({ error: `OpenRouter error: ${t.slice(0, 400)}` }, { status: 502 });
      }
      const data = (await r.json()) as OpenRouterResponse;
      text = data?.choices?.[0]?.message?.content ?? "(no answer)";
    }

    return NextResponse.json<AssistantSuccess>({ text: text.trim() });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json<AssistantError>({ error: msg.slice(0, 500) }, { status: 502 });
  }
}
