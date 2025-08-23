"use client";
import { motion } from "framer-motion";

type Item = { title: string; org: string; period: string; bullets: string[] };

export default function Timeline({ items }: { items: Item[] }) {
  return (
    <div className="relative pl-6">
      <div className="absolute left-1 top-0 bottom-0 w-px bg-gray-200 dark:bg-neutral-800" />
      <ul className="space-y-8">
        {items.map((r) => (
          <motion.li
            key={`${r.title}-${r.org}-${r.period}`}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
          >
            <div className="flex items-start gap-3">
              <span className="mt-2 h-2.5 w-2.5 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 inline-block" />
              <div className="flex-1 rounded-2xl border bg-white/60 dark:bg-neutral-900/50 p-5 shadow-sm">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-lg font-semibold">{r.title} — {r.org}</h3>
                  <span className="text-sm text-gray-500">{r.period}</span>
                </div>
                <ul className="mt-2 list-disc pl-6 space-y-1 text-gray-700 dark:text-neutral-300">
                  {r.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
