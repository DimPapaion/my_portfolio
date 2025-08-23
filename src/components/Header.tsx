"use client";

import ThemeToggle from "@/components/ThemeToggle";
import { Github, Linkedin, GraduationCap, Mail } from "lucide-react";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Social icons (top-left) */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <a href="https://github.com/DimPapaion" aria-label="GitHub" target="_blank" rel="noreferrer"
             className="p-2 rounded-full border hover:shadow transition">
            <Github className="h-4 w-4" />
          </a>
          <a href="https://www.linkedin.com/in/dimitrios-papaioannou-b855871a8" aria-label="LinkedIn" target="_blank" rel="noreferrer"
             className="p-2 rounded-full border hover:shadow transition">
            <Linkedin className="h-4 w-4" />
          </a>
          <a href="https://scholar.google.com/citations?user=fgIA2p4AAAAJ&hl=el&oi=sra" aria-label="Google Scholar" target="_blank" rel="noreferrer"
             className="p-2 rounded-full border hover:shadow transition">
            <GraduationCap className="h-4 w-4" />
          </a>
          <a href="mailto:dnpapaion@gmail.com" aria-label="Email"
             className="p-2 rounded-full border hover:shadow transition">
            <Mail className="h-4 w-4" />
          </a>
        </div>

        {/* Theme toggle (top-right) */}
        <div className="pointer-events-auto">
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
