"use client";

import { motion } from "framer-motion";
import type { Skill } from "@/data/skills";
import SkillIcon from "./SkillIcon";

export default function SkillCard({ s }: { s: Skill }) {
  return (
    <motion.article
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2 }}
      className="min-w-[320px] max-w-[420px] rounded-2xl border
                 bg-white/70 dark:bg-white/5 dark:border-white/10 border-black/5
                 px-5 py-4 shadow-sm"
    >
      <div className="flex items-start gap-3">
        <div className="grid place-items-center h-10 w-10 rounded-full
                        bg-gray-100 dark:bg-white/10 ring-1 ring-black/5 dark:ring-white/10">
          <SkillIcon keyName={s.key} className="h-[22px] w-[22px]" />
        </div>
        <div>
          <h4 className="text-lg font-semibold">{s.name}</h4>
          <p className="mt-1 text-sm text-gray-700 dark:text-neutral-300">{s.blurb}</p>
        </div>
      </div>
    </motion.article>
  );
}