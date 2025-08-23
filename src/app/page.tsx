import Section from "@/components/Section";
import { links } from "@/data/links";
import { projects } from "@/data/projects";
import { publications } from "@/data/publications";
import { experience } from "@/data/experience";
import ProjectCard from "@/components/ProjectCard";


export default function Home() {
return (
  <main>
    {/* Hero */}
    <section className="max-w-5xl mx-auto px-6 pt-16 pb-10">
      <p className="text-xs uppercase tracking-widest text-gray-500">Portfolio</p>
      <h1 className="mt-2 text-4xl md:text-5xl font-bold">{links.name}</h1>
      <p className="mt-3 text-lg text-gray-600">{links.title}</p>
      <p className="mt-1 text-sm text-gray-500">{links.location}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <a href="/cv.pdf" className="px-4 py-2 rounded-lg bg-black text-white">Download CV</a>
        <a className="px-4 py-2 rounded-lg border" href={links.github} target="_blank">GitHub</a>
        <a className="px-4 py-2 rounded-lg border" href={links.linkedin} target="_blank">LinkedIn</a>
        <a className="px-4 py-2 rounded-lg border" href={links.scholar} target="_blank">Google Scholar</a>
        <a className="px-4 py-2 rounded-lg border" href={`mailto:${links.email}`}>Email</a>
      </div>
    </section>


    {/* Projects */}
    <Section id="projects" title="Projects">
      <div className="grid md:grid-cols-2 gap-5">
        {projects.map((p) => (
        <ProjectCard key={p.title} p={p} />
        ))}
      </div>
    </Section>

    {/* Publications */}
    <Section id="publications" title="Publications">
      <ul className="list-disc pl-6 space-y-2">
        {publications.map((pub) => (
          <li key={pub.title}>
            <span className="font-medium">{pub.title}</span>
            {" — "}
            <span className="text-gray-700">{pub.venue} ({pub.year})</span>
            {pub.url && (
              <>
                {" — "}
                <a className="underline" target="_blank" href={pub.url}>Link</a>
              </>
          )}
          </li>
        ))}
      </ul>
    </Section>


    {/* Experience */}
    <Section id="experience" title="Experience">
      <div className="space-y-6">
        {experience.map((r) => (
          <div key={`${r.title}-${r.org}-${r.period}`} className="border rounded-2xl p-5">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="text-lg font-semibold">{r.title} — {r.org}</h3>
              <span className="text-sm text-gray-500">{r.period}</span>
            </div>
              <ul className="mt-2 list-disc pl-6 space-y-1 text-gray-600">
                {r.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>

    {/* Contact */}
    <Section id="contact" title="Contact">
      <p>
      Email me at {" "}
        <a className="underline" href={`mailto:${links.email}`}>{links.email}</a>
        {" "}or connect via {" "}
        <a className="underline" href={links.linkedin} target="_blank">LinkedIn</a>.
      </p>
    </Section>
  </main>
  );
}