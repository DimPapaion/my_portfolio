"use client";

import ThemeToggle from "@/components/ThemeToggle";
import { links } from "@/data/links";
import { SiGithub, SiLinkedin, SiGooglescholar } from "react-icons/si";
import { MdEmail } from "react-icons/md";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <nav className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Social icons (top-left) */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <a
            href={links.github}
            aria-label="GitHub"
            target="_blank"
            rel="noreferrer"
            className="grid h-11 w-11 place-items-center rounded-full
                       bg-white/90 text-gray-700 ring-1 ring-black/10
                       hover:bg-black hover:text-white transition
                       dark:bg-white/10 dark:text-neutral-200 dark:ring-white/10
                       dark:hover:bg-white dark:hover:text-black"
          >
            <SiGithub size={22} />
            <span className="sr-only">GitHub</span>
          </a>

          <a
            href={links.linkedin}
            aria-label="LinkedIn"
            target="_blank"
            rel="noreferrer"
            className="grid h-11 w-11 place-items-center rounded-full
                       bg-white/90 text-gray-700 ring-1 ring-black/10
                       hover:bg-black hover:text-white transition
                       dark:bg-white/10 dark:text-neutral-200 dark:ring-white/10
                       dark:hover:bg-white dark:hover:text-black"
          >
            <SiLinkedin size={22} />
            <span className="sr-only">LinkedIn</span>
          </a>

          <a
            href={links.scholar}
            aria-label="Google Scholar"
            target="_blank"
            rel="noreferrer"
            className="grid h-11 w-11 place-items-center rounded-full
                       bg-white/90 text-gray-700 ring-1 ring-black/10
                       hover:bg-black hover:text-white transition
                       dark:bg-white/10 dark:text-neutral-200 dark:ring-white/10
                       dark:hover:bg-white dark:hover:text-black"
          >
            <SiGooglescholar size={22} />
            <span className="sr-only">Google Scholar</span>
          </a>

          <a
            href={`mailto:${links.email}`}
            aria-label="Email"
            className="grid h-11 w-11 place-items-center rounded-full
                       bg-white/90 text-gray-700 ring-1 ring-black/10
                       hover:bg-black hover:text-white transition
                       dark:bg-white/10 dark:text-neutral-200 dark:ring-white/10
                       dark:hover:bg-white dark:hover:text-black"
          >
            <MdEmail size={22} />
            <span className="sr-only">Email</span>
          </a>
        </div>

        {/* Right controls: Resume + Theme */}
        <div className="ml-auto flex items-center gap-2 pointer-events-auto">
          <a
            href="/cv_v2.pdf"
            className="hidden sm:inline-flex items-center rounded-full px-3 py-1.5 text-sm
                       bg-black text-white hover:opacity-90 transition
                       dark:bg-white dark:text-black"
          >
            Resume
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
