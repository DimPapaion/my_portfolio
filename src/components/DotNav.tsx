"use client";
import { useEffect, useState } from "react";

const SECTIONS = ["hero", "projects", "publications", "experience", "contact"];

export default function DotNav() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const els = SECTIONS
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const obs = new IntersectionObserver(
      (entries) => {
        // pick the most visible section
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio || 0) - (a.intersectionRatio || 0))[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { root: document.querySelector("main"), threshold: [0.4, 0.6, 0.8] }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {SECTIONS.map((id) => (
        <button
          key={id}
          onClick={() => go(id)}
          aria-label={`Go to ${id}`}
          className={[
            "h-3 w-3 rounded-full border",
            active === id ? "bg-black border-black dark:bg-white dark:border-white" : "bg-white/60 dark:bg-neutral-800/80"
          ].join(" ")}
        />
      ))}
    </div>
  );
}
