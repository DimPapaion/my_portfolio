import SkillIcon from "@/components/SkillIcon";
import { skillsRow1, skillsRow2 } from "@/data/skills"; // adjust if your path differs

export const metadata = {
  title: "Skills",
};

export default function SkillsPage() {
  const all = [...skillsRow1, ...skillsRow2];
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-center text-3xl md:text-4xl font-bold tracking-tight">
        Skills
      </h1>

      <p className="mt-3 text-center text-gray-600 dark:text-neutral-300">
        A fuller list of tools and technologies I use.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
        {all.map((s) => (
          <article
            key={s.key}
            className="rounded-2xl border border-black/5 dark:border-white/10 p-4 bg-white dark:bg-neutral-900"
          >
            <div className="flex items-center gap-3">
              <div className="grid place-items-center h-10 w-10 rounded-full bg-gray-100 dark:bg-white/10 ring-1 ring-black/5 dark:ring-white/10">
                <SkillIcon keyName={s.key} />
              </div>
              <h3 className="font-semibold">{s.name}</h3>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-neutral-300">
              {s.blurb}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
