"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { Role } from "@/data/experience";


// near top
type Accent = NonNullable<Role["accent"]>;

function bgForAccent(accent: Accent) {
  if (accent === "blue") {
    return `
      bg-[radial-gradient(ellipse_at_20%_10%,rgba(59,130,246,0.16),transparent_45%),
         radial-gradient(ellipse_at_80%_25%,rgba(99,102,241,0.14),transparent_45%),
         radial-gradient(ellipse_at_50%_85%,rgba(16,185,129,0.12),transparent_50%)]
      dark:bg-[radial-gradient(ellipse_at_20%_10%,rgba(59,130,246,0.10),transparent_45%),
              radial-gradient(ellipse_at_80%_25%,rgba(99,102,241,0.10),transparent_45%),
              radial-gradient(ellipse_at_50%_85%,rgba(16,185,129,0.08),transparent_50%)]
    `;
  }
  // gray
  return `
    bg-[radial-gradient(ellipse_at_20%_10%,rgba(0,0,0,0.06),transparent_45%),
       radial-gradient(ellipse_at_80%_25%,rgba(0,0,0,0.05),transparent_45%),
       radial-gradient(ellipse_at_50%_85%,rgba(0,0,0,0.04),transparent_50%)]
    dark:bg-[radial-gradient(ellipse_at_20%_10%,rgba(255,255,255,0.10),transparent_45%),
            radial-gradient(ellipse_at_80%_25%,rgba(255,255,255,0.08),transparent_45%),
            radial-gradient(ellipse_at_50%_85%,rgba(255,255,255,0.06),transparent_50%)]
  `;
}


export default function ExperienceCard({ role, index = 0 }: { role: Role; index?: number }) {
  const { title, org, period, bullets, logo, techIcons } = role;
  const accent: Accent = role.accent ?? "blue"; // default

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="relative h-full flex flex-col overflow-hidden
                 rounded-3xl border border-black/5 dark:border-white/10
                 bg-white dark:bg-neutral-900
                 shadow-md hover:shadow-lg transition-shadow"
    >
      {/* soft header gradient like the reference */}
      <div
        className={
            "pointer-events-none absolute inset-0 rounded-3xl z-0 " +
            ((accent === "gray")
            ? "bg-[radial-gradient(ellipse_at_20%_10%,rgba(0,0,0,0.06),transparent_45%),radial-gradient(ellipse_at_80%_25%,rgba(0,0,0,0.05),transparent_45%),radial-gradient(ellipse_at_50%_85%,rgba(0,0,0,0.04),transparent_50%)] " +
                "dark:bg-[radial-gradient(ellipse_at_20%_10%,rgba(255,255,255,0.12),transparent_45%),radial-gradient(ellipse_at_80%_25%,rgba(255,255,255,0.10),transparent_45%),radial-gradient(ellipse_at_50%_85%,rgba(255,255,255,0.08),transparent_50%)]"
            : "bg-[radial-gradient(ellipse_at_20%_10%,rgba(59,130,246,0.20),transparent_45%),radial-gradient(ellipse_at_80%_25%,rgba(99,102,241,0.18),transparent_45%),radial-gradient(ellipse_at_50%_85%,rgba(16,185,129,0.16),transparent_50%)] " +
                "dark:bg-[radial-gradient(ellipse_at_20%_10%,rgba(59,130,246,0.14),transparent_45%),radial-gradient(ellipse_at_80%_25%,rgba(99,102,241,0.12),transparent_45%),radial-gradient(ellipse_at_50%_85%,rgba(16,185,129,0.10),transparent_50%)]"
            )
        }
        />

      {/* corner logo */}
      <div className="mt-4 flex justify-center relative z-10">
        {/* optional: gradient ring around the white circle */}
        <div className="p-[3px] rounded-full bg-gradient-to-br from-sky-400 via-indigo-400 to-emerald-400">
            {/* WHITE inner circle that stays white in both themes */}
            <div className="relative h-20 w-20 md:h-24 md:w-24 rounded-full bg-white ring-1 ring-black/10 overflow-hidden">
            {/* Use fill + object-contain to keep aspect ratio; padding prevents crowding */}
            {logo ? (
                <Image
                src={logo}
                alt={`${org} logo`}
                fill
                sizes="96px"
                className="object-contain p-3"
                />
            ) : (
                <div className="h-full w-full grid place-items-center">
                <span className="text-2xl font-semibold text-gray-700"> {org?.charAt(0) ?? "•"} </span>
                </div>
            )}
            </div>
        </div>
        </div>

      {/* content */}
      <div className="relative z-10 p-6 md:p-8 flex-1 flex flex-col">
        <h3 className="mt-16 md:mt-20 text-2xl md:text-3xl font-semibold tracking-tight
               text-gray-900 dark:text-gray-100">
            {title}
        </h3>

        <div className="mt-1 text-lg font-semibold text-emerald-600 dark:text-emerald-400">
          {org}
        </div>

        {/* tiny tech icons row */}
        {techIcons?.length ? (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {techIcons.map((src) => (
              <span key={src} className="inline-flex h-7 w-7 rounded-full bg-white dark:bg-white/10
                                         ring-1 ring-black/10 dark:ring-white/10 overflow-hidden">
                <Image src={src} alt="" width={28} height={28} className="object-contain" />
              </span>
            ))}
          </div>
        ) : null}

        {/* dates */}
        <div className="mt-5 text-xs uppercase tracking-[0.25em] text-gray-500">
          {period}
        </div>

        {/* bullets (scroll if long) */}
        <ul className="mt-4 space-y-2 text-gray-800 dark:text-gray-200 text-[0.95rem] leading-relaxed
                       flex-1 overflow-y-auto pr-2">
          {bullets.map((b, i) => (
            <li key={i} className="list-disc ml-5">{b}</li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}