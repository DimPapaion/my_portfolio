"use client";

import { motion } from "framer-motion";
import Section from "@/components/Section";
import { links } from "@/data/links";
import { projects } from "@/data/projects";
import { publications } from "@/data/publications";
import { experience } from "@/data/experience";
import ProjectCard from "@/components/ProjectCard";
// (optional) import BackToTop below after you create it
import BackToTop from "@/components/BackToTop";
import DotNav from "@/components/DotNav";

export default function Home() {
  return (
    <main className="h-[100svh] overflow-y-auto snap-y snap-mandatory scroll-smooth">
      {/* HERO (full-screen, snap) */}
      <motion.section
        id="hero"
        className="relative snap-start min-h-[100svh] flex items-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* soft radial background */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.12),transparent_60%)]" />

        <div className="max-w-5xl mx-auto px-6">
          <p className="text-xs uppercase tracking-widest text-gray-500">Portfolio</p>

          <motion.h1
            className="mt-3 text-5xl md:text-6xl font-bold bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-500 bg-clip-text text-transparent dark:from-sky-400 dark:via-indigo-400 dark:to-emerald-400"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.55 }}
          >
            {links.name}
          </motion.h1>

          <motion.p
            className="mt-4 text-xl text-gray-600 dark:text-neutral-300 max-w-2xl"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.5 }}
          >
            {links.title}
          </motion.p>

          <motion.div
            className="mt-8 flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <a href="/cv.pdf" className="px-4 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black">Download CV</a>
            <a className="px-4 py-2 rounded-lg border" href={links.github} target="_blank" rel="noreferrer">GitHub</a>
            <a className="px-4 py-2 rounded-lg border" href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="px-4 py-2 rounded-lg border" href={links.scholar} target="_blank" rel="noreferrer">Google Scholar</a>
            <a className="px-4 py-2 rounded-lg border" href={`mailto:${links.email}`}>Email</a>
          </motion.div>
        </div>
      </motion.section>

      {/* PROJECTS — full-screen panel */}
      <Section id="projects" title="Projects">
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -6, scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard p={p} />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* PUBLICATIONS — full-screen panel */}
      <Section id="publications" title="Publications">
        <ul className="list-disc pl-6 space-y-2">
          {publications.map((pub) => (
            <motion.li
              key={`${pub.title}-${pub.year}`}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4 }}
            >
              <span className="font-medium">{pub.title}</span>{" — "}
              <span className="text-gray-700 dark:text-neutral-300">
                {pub.venue} ({pub.year})
              </span>
              {pub.url && (
                <>
                  {" — "}
                  <a className="underline" target="_blank" rel="noreferrer" href={pub.url}>
                    Link
                  </a>
                </>
              )}
            </motion.li>
          ))}
        </ul>
      </Section>

      {/* EXPERIENCE — full-screen panel */}
      <Section id="experience" title="Experience">
        <div className="space-y-6">
          {experience.map((r) => (
            <motion.div
              key={`${r.title}-${r.org}-${r.period}`}
              className="border rounded-2xl p-5"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45 }}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-lg font-semibold">
                  {r.title} — {r.org}
                </h3>
                <span className="text-sm text-gray-500">{r.period}</span>
              </div>
              <ul className="mt-2 list-disc pl-6 space-y-1 text-gray-700 dark:text-neutral-300">
                {r.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CONTACT — full-screen panel */}
      <Section id="contact" title="Contact">
        <p>
          Email me at{" "}
          <a className="underline" href={`mailto:${links.email}`}>{links.email}</a>{" "}
          or connect via{" "}
          <a className="underline" href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>.
        </p>
      </Section>

      {/* Optional: floating back-to-top button */}
      <BackToTop />
      <DotNav />
    </main>
  );
}
