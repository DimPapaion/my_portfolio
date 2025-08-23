"use client";

import type { IconType } from "react-icons";
import { SiGithub, SiLinkedin, SiGooglescholar } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import { links } from "@/data/links";

type LinkItem = { href: string; label: string; Icon: IconType };

export default function SocialLinks({
  className = "",
  size = 22,
}: { className?: string; size?: number }) {
  const raw: Array<LinkItem | undefined> = [
    links.github   ? { href: links.github,   label: "GitHub",         Icon: SiGithub } : undefined,
    links.linkedin ? { href: links.linkedin, label: "LinkedIn",       Icon: SiLinkedin } : undefined,
    links.scholar  ? { href: links.scholar,  label: "Google Scholar", Icon: SiGooglescholar } : undefined,
    links.email    ? { href: `mailto:${links.email}`, label: "Email", Icon: MdEmail } : undefined,
  ];

  const items: LinkItem[] = raw.filter((x): x is LinkItem => Boolean(x));

  return (
    <nav className={`flex items-center gap-3 ${className}`}>
      {items.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="grid h-11 w-11 md:h-12 md:w-12 place-items-center rounded-full
                     bg-white/90 text-gray-700 ring-1 ring-black/10
                     hover:bg-black hover:text-white transition
                     dark:bg-white/10 dark:text-neutral-200 dark:ring-white/10
                     dark:hover:bg-white dark:hover:text-black"
        >
          <Icon size={size} />
          <span className="sr-only">{label}</span>
        </a>
      ))}
    </nav>
  );
}
