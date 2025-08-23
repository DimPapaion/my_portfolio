"use client";
import type { Project } from "@/data/projects";


export default function ProjectCard({ p }: { p: Project }) {
  return (
    <div className="rounded-2xl border p-5 shadow-sm">
      <h3 className="text-lg font-semibold">{p.title}</h3>
      <p className="mt-2 text-sm text-gray-700">{p.summary}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {p.stack.map((s) => (
          <span key={s} className="text-xs border rounded-full px-2 py-1">
            {s}
          </span>
        ))}
      </div>
      {(p.links?.github || p.links?.paper || p.links?.demo) && (
        <div className="mt-4 flex gap-3 text-sm">
          {p.links.github && (
            <a className="underline" href={p.links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          )}
          {p.links.paper && (
            <a className="underline" href={p.links.paper} target="_blank" rel="noreferrer">
              Paper
            </a>
          )}
          {p.links.demo && (
            <a className="underline" href={p.links.demo} target="_blank" rel="noreferrer">
              Demo
            </a>
          )}
        </div>
      )}
    </div>
  );
}
