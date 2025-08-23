import Link from "next/link";
import { links } from "@/data/links";


export default function Header() {
return (
<header className="sticky top-0 z-50 backdrop-blur border-b bg-white/70">
<nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3">
<Link href="/" className="font-bold">
{links.name.split(" ")[0]}
<span className="text-gray-500">{` ${links.name.split(" ").slice(1).join(" ")}`}</span>
</Link>
<div className="flex gap-3 text-sm">
<a href="#projects" className="hover:underline">Projects</a>
<a href="#publications" className="hover:underline">Publications</a>
<a href="#experience" className="hover:underline">Experience</a>
<a href="#contact" className="hover:underline">Contact</a>
</div>
</nav>
</header>
);
}