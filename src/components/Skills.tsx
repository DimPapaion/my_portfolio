"use client";

import Section from "@/components/Section";
import SkillCard from "@/components/SkillCard";
import { skillsRow1, skillsRow2 } from "@/data/skills";

export default function Skills() {
  // duplicate arrays so the loop looks continuous
  const row1 = [...skillsRow1, ...skillsRow1];
  const row2 = [...skillsRow2, ...skillsRow2];

  return (
    <Section id="skills" title="Skills" titleClassName="text-lg md:text-xl" containerClassName="max-w-screen-2xl">
      <div className="mx-auto max-w-4xl text-center">
        <h3 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Skills that <span className="bg-gradient-to-r from-violet-400 to-sky-400 bg-clip-text text-transparent">differentiate me</span>
        </h3>
      </div>

      {/* marquee rows */}
      <div className="mt-8 space-y-8">
        {/* Row 1 (left to right) */}
        <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="marquee-28 flex w-[200%] gap-6 group-hover:[animation-play-state:paused]">
            {row1.map((s, i) => (
              <SkillCard key={`r1-${i}-${s.name}`} s={s} />
            ))}
          </div>
        </div>

        {/* Row 2 (right to left, slightly different speed) */}
        <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="marquee-36 marquee-reverse flex w-[200%] gap-6 group-hover:[animation-play-state:paused]">
            {row2.map((s, i) => (
              <SkillCard key={`r2-${i}-${s.name}`} s={s} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 flex justify-center">
          <a
            href="/cv.pdf"
            className="inline-flex items-center gap-2 rounded-xl border px-5 py-2.5
                       hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black
                       transition"
          >
            <span>View all skills</span>
            <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </Section>
  );
}
