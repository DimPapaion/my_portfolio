"use client";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur border-b bg-white/70 dark:bg-neutral-950/70">
      <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3">
        <Link href="/" className="font-bold">
          Dimitrios <span className="text-gray-500 dark:text-gray-400">Papaioannou</span>
        </Link>
        <div className="flex items-center gap-3 text-sm">
          <a href="#projects" className="hover:underline">Projects</a>
          <a href="#publications" className="hover:underline">Publications</a>
          <a href="#experience" className="hover:underline">Experience</a>
          <a href="#contact" className="hover:underline">Contact</a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
