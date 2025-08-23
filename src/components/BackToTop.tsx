"use client";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const root = document.querySelector("main") as HTMLElement | null;
    const hero = document.getElementById("hero");
    if (!root || !hero) return;
    const io = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { root, threshold: 0.6 }
    );
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  const goTop = () => {
    const scroller = document.querySelector("main") as HTMLElement | null;
    if (scroller) scroller.scrollTo({ top: 0, behavior: "smooth" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!show) return null;
  return (
    <button
      onClick={goTop}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full border px-4 py-2 shadow bg-white/90 dark:bg-neutral-900/90 z-50"
      aria-label="Back to top"
      title="Back to top"
    >
      ↑ Top
    </button>
  );
}
