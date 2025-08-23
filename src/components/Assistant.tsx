"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { answerPortfolioQuestion, type Action, QUICK_ACTIONS } from "@/lib/portfolio-brain";
import { topSnippets } from "@/lib/search";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { links } from "@/data/links";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { publications } from "@/data/publications";
type ApiAssistantResponse = { text?: string; error?: string };
type Msg = { role: "user" | "assistant"; text: string };

// single, shared helper — typed with Action
function runAction(ans?: Action) {
  if (!ans) return;
  if (ans.type === "scroll") {
    document
      .getElementById(ans.targetId)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  } else if (ans.type === "open") {
    window.open(ans.url, "_blank", "noopener,noreferrer");
  }
}

export default function Assistant() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
  { role: "assistant",
    text: "Hi! Ask about my projects, publications, experience — or use quick actions below (/cv, /projects)." }
]);

  const [input, setInput] = useState("");
  const [llm, setLlm] = useState(true);
  const [busy, setBusy] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open]);

  async function send() {
  const q = input.trim();
  if (!q) return;
  setMessages((m) => [...m, { role: "user", text: q }]);
  setInput("");

  if (!llm) {
    const ans = answerPortfolioQuestion(q);
    setMessages((m) => [...m, { role: "assistant", text: ans.text }]);
    runAction(ans.action);
    return;
  }

  setBusy(true);
  try {
    // 1) Try Lite RAG first
    const snippets = topSnippets(q, 3);

    // 2) Guaranteed base context (always available)
    const baseCtx = [
      `${links.name} — ${links.title}. Email: ${links.email}.`,
      `Experience: ${experience.map(r => `${r.title} at ${r.org} (${r.period})`).join(" | ")}`,
      `Projects: ${projects.map(p => p.title).join(" | ")}`,
      `Publications: ${publications.length} items` +
        (publications.length ? `: ${publications.slice(0, 5).map(p => `${p.title} (${p.year})`).join(" | ")}` : ""),
    ];

    // Use RAG snippets if we got any; otherwise fall back to base context
    const context = snippets.length ? snippets : baseCtx;

    const r = await fetch("/api/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: q, context }),
    });

    type ApiAssistantResponse = { text?: string; error?: string };
    let j: ApiAssistantResponse | null = null;
    try {
      j = (await r.json()) as ApiAssistantResponse;
    } catch {
      j = null; // non-JSON error page
    }

    if (!r.ok || !j || j.error) {
   const serverErr = j?.error ? ` (server: ${j.error.slice(0,120)})` : "";
      const ans = answerPortfolioQuestion(q);
      setMessages((m) => [
        ...m,
        {
          
          role: "assistant",
          text: (j?.error ? "LLM unavailable" : "Network issue") + serverErr + ". " + ans.text,
        },
      ]);
      runAction(ans.action);
    } else {
      setMessages((m) => [...m, { role: "assistant", text: j.text ?? "" }]);
    }
  } catch (e) {
      const ans = answerPortfolioQuestion(q);
      const msg = e instanceof Error ? e.message : String(e);
     setMessages((m) => [
        ...m,
        { role: "assistant", text: `Network error: ${msg}\n` + ans.text },
      ]);
    runAction(ans.action);
   } finally {
    setBusy(false);
  }
}


  if (!mounted) return null;

  return createPortal(
    <>
      {/* Floating button */}
      <button
        aria-label="Open assistant"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-[9999] grid h-14 w-14 place-items-center rounded-full
                   bg-black text-white shadow-lg hover:opacity-90 pointer-events-auto
                   dark:bg-white dark:text-black"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed bottom-24 right-5 z-[9999] w-[min(92vw,380px)] overflow-hidden
                     rounded-2xl border border-black/10 dark:border-white/10
                     bg-white/90 dark:bg-neutral-900/90 backdrop-blur shadow-2xl pointer-events-auto"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-black/10 dark:border-white/10">
            <div className="text-sm font-semibold uppercase tracking-[0.2em]">
              Assistant
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setLlm((v) => !v)}
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs ring-1 transition
                           ${
                             llm
                               ? "bg-black text-white ring-black/20 dark:bg-white dark:text-black dark:ring-white/20"
                               : "bg-white text-gray-700 ring-black/10 dark:bg-white/10 dark:text-neutral-200 dark:ring-white/10"
                           }`}
                title="Toggle LLM mode"
              >
                <Sparkles className="h-3.5 w-3.5" /> {llm ? "LLM: Auto" : "LLM: Off"}
              </button>
              <button onClick={() => setOpen(false)} aria-label="Close">
                <X className="h-5 w-5 opacity-70 hover:opacity-100" />
              </button>
            </div>
          </div>

          <div ref={listRef} className="max-h-80 overflow-y-auto px-4 py-3 space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm leading-relaxed ${
                  m.role === "assistant"
                    ? "text-gray-800 dark:text-neutral-200"
                    : "text-gray-900 dark:text-white"
                }`}
              >
                {m.role === "user" ? (
                  <span className="font-semibold mr-1">You:</span>
                ) : (
                  <span className="font-semibold mr-1">Assistant:</span>
                )}
                {m.text
                  .split("\n")
                  .map((line, idx) => <div key={idx}>{line}</div>)}
              </div>
            ))}
          </div>
          <div className="px-4 pt-3 pb-1 flex flex-wrap gap-2">
            {QUICK_ACTIONS.map((qa) => (
              <button
                key={qa.label}
                onClick={() => runAction(qa.action)}
                className="rounded-full border px-3 py-1 text-xs transition
                          hover:bg-black hover:text-white
                          dark:hover:bg-white dark:hover:text-black"
              >
                {qa.label}
              </button>
            ))}
          </div>
          <div className="p-3 border-t border-black/10 dark:border-white/10">
            <div className="flex items-center gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !busy && send()}
                placeholder={ llm ? "Ask about my work… (/cv, /projects)" : "LLM off — try: /cv, /projects, /experience" }
                className="flex-1 rounded-xl border px-3 py-2 text-sm
                           bg-white dark:bg-white/5 dark:border-white/10 outline-none
                           focus:ring-2 ring-sky-400/50"
              />
              <button
                onClick={send}
                disabled={busy}
                className="grid h-10 w-10 place-items-center rounded-xl bg-black text-white dark:bg-white dark:text-black disabled:opacity-50"
                aria-label="Send"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>,
    document.body
  );
}
