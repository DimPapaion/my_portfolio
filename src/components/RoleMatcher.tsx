"use client";
import { useState } from "react";

type MatcherOut = { pitch?: string; bullets?: string; cover?: string; note?: string };

export default function RoleMatcher() {
  const [jd, setJd] = useState("");
  const [out, setOut] = useState<MatcherOut | undefined>();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function run() {
    setLoading(true); setErr(""); setOut(undefined);
    try {
      const r = await fetch("/api/role-matcher", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jd }),
      });
      const j = (await r.json()) as MatcherOut & { error?: string };
      if (!r.ok || j?.error) throw new Error(j?.error || "Failed");
      setOut(j);
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border p-4 bg-white/70 dark:bg-white/5 dark:border-white/10">
      <h4 className="font-semibold text-lg">Role Matcher</h4>
      <textarea className="mt-2 w-full rounded-lg border p-3 dark:bg-white/5 dark:border-white/10" rows={6}
        placeholder="Paste the job description…" value={jd} onChange={e => setJd(e.target.value)} />
      <div className="mt-2 flex gap-2">
        <button onClick={run} disabled={loading || jd.length < 50}
          className="px-4 py-2 rounded-lg bg-black text-white disabled:opacity-50 dark:bg-white dark:text-black">
          {loading ? "Analyzing…" : "Analyze fit"}
        </button>
        {err && <span className="text-red-600 dark:text-red-400">{err}</span>}
      </div>
      {out && (
        <div className="mt-3 space-y-2 text-sm">
          {out.note && <p className="text-gray-500">{out.note}</p>}
          {out.pitch && <p><strong>Pitch:</strong> {out.pitch}</p>}
          {out.bullets && <pre className="whitespace-pre-wrap">{out.bullets}</pre>}
          {out.cover && (
            <>
              <strong>Cover paragraph:</strong>
              <p className="mt-1">{out.cover}</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
