"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Section from "@/components/Section";
import ProjectCard from "@/components/ProjectCard";
import { links } from "@/data/links";
import { projects } from "@/data/projects";
import { publications } from "@/data/publications";
import { experience } from "@/data/experience";
import BackToTop from "@/components/BackToTop"; 
import DotNav from "@/components/DotNav";
import Typewriter from "@/components/Typewriter";
import LetterReveal from "@/components/LetterReveal";
import HeroBG from "@/components/HeroBG";
import ConstellationBG from "@/components/ConstellationBG";
import About from "@/components/About";
import ExperienceCard from "@/components/ExperienceCard";
import Contact from "@/components/Contact";
import Skills from "@/components/Skills";
import SocialLinks from "@/components/SocialLinks";


const sectionLinks = [
  { id: "about", label: "About" },
  { id: "experience", label: "WORK Experience" },
  { id: "projects", label: "Projects" },
  { id: "publications", label: "Publications" },
  { id: "skills", label: "SKILLS" },
  { id: "contact", label: "Contact" },
];

export default function Home() {
  return (
    <main className="h-[100svh] overflow-y-auto snap-y snap-mandatory scroll-smooth">
      {/* HERO (full-screen) */}
      <motion.section
      id="hero"
      
      className="relative snap-center min-h-[100svh] flex items-center"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      {/* <SocialLinks
        className="flex items-center gap-3 pointer-events-auto"
        size={20}   // tweak to 22–24 if you want even bigger
      /> */}
      {/* keep your animated background here if you added one, e.g. <HeroBG /> */}
      <ConstellationBG density={1.5} speed={1.9} connectDistance={170} dotRadius={2} lineWidth={1} />


       <div className="relative z-10 max-w-5xl mx-auto px-6 w-full flex flex-col items-center text-center">
        {/* avatar */}
        <Image
          src="/me.png"
          alt={links.name}
          width={240}
          height={240}
          className="rounded-full ring-1 ring-black/5 dark:ring-white/10"
          priority
        />

        {/* small uppercase role (like the screenshot) */}
        <p className="mt-6 text-[1.5rem] md:text-sm uppercase tracking-[0.6em] text-gray-500">
          {links.title}
        </p>

        {/* BIG rotating typewriter + teal caret */}
        <div className="mt-4 flex items-baseline justify-center">
          <Typewriter
            lines={[
              `Hi, my name is ${links.name}.`,
              "I love coffee.",
              "Computer Vision is my passion.",
              "I love hiking.",
            ]}
            //  className="text-5xl md:text-7xl font-extrabold tracking-tight
            //  !text-gray-900 dark:!text-gray-200 !opacity-100"
            typingSpeed={70}     // slower typing
            deletingSpeed={50}   // slower deleting
            pauseMs={1700} 
            className="text-5xl md:text-7xl font-extrabold tracking-tight !text-black dark:!text-gray-500 !opacity-100"
            />
            <span
              aria-hidden
              className="ml-2 inline-block h-[1em] w-[3px] !bg-black dark:!bg-gray-300
                        align-bottom [animation:caret-blink_1s_steps(1,end)_infinite]"
          />
        </div>

        {/* section chips (uppercase + rectangular hover) */}
        <nav
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
          aria-label="Section quick links"
        >
          {[
            { id: "about", label: "ABOUT" },
            { id: "projects", label: "PROJECTS" },
            { id: "publications", label: "PUBLICATIONS" },
            { id: "experience", label: "WORK EXPERIENCE" },
            { id: "skills", label: "SKILLS" },
            { id: "contact", label: "CONTACT" },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() =>
                document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "center" })
              }
              className="px-5 py-2 rounded-full border border-transparent
           text-[1.1rem] tracking-[0.35em]!text-gray-200 dark:!text-gray-500
           hover:bg-sky-100 hover:text-sky-800 hover:border-sky-400
           dark:hover:bg-sky-500/15 dark:hover:text-sky-200 dark:hover:border-sky-400
           transition shadow-none hover:shadow-sm focus-visible:outline-none
           focus-visible:ring-2 focus-visible:ring-sky-400/60"
          //     className="px-5 py-2 rounded-full border border-transparent
          //  text-[0.8rem] tracking-[0.35em]
          //  !text-gray-200 dark:!text-gray-500
          //  hover:bg-gray-400 hover:text-white hover:border-gray-700
          //  dark:hover:bg-gray-200 dark:hover:text-gray-900 dark:hover:border-gray-200
          //  transition shadow-none hover:shadow-sm focus-visible:outline-none
          //  focus-visible:ring-2 focus-visible:ring-gray-800/40
          //  dark:focus-visible:ring-gray-200/40"
            >
              {s.label}
            </button>
          ))}
        </nav>
      </div>
    </motion.section>

    <About />
          {/* Work Experience */}
    <Section
        id="experience"
        title="Work Experience"
        className="items-center"            // ← center vertically
        containerClassName="max-w-none px-6 md:px-8" 
        titleClassName="text-lg md:text-xl mb-8"
      >
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {experience.map((r, i) => (
            <ExperienceCard key={`${r.title}-${r.org}-${r.period}`} role={r} index={i} />
          ))}
        </div>
      </Section>


      {/* PROJECTS */}
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

      {/* PUBLICATIONS */}
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

      <Skills />

      {/* CONTACT */}
      <Contact />
      <BackToTop/>
      <DotNav/>
    </main>
  );
}