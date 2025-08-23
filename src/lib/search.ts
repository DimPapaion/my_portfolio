import MiniSearch from "minisearch";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { publications } from "@/data/publications";
import { links } from "@/data/links";

type Doc = { id: string; title: string; body: string; section: string; url?: string };

let mini: MiniSearch<Doc> | null = null;

function docsFromSite(): Doc[] {
  const docs: Doc[] = [];

  // Experience roles
  for (const r of experience) {
    docs.push({
      id: `exp-${r.org}-${r.title}`,
      title: `${r.title} — ${r.org}`,
      body: [r.period, ...(r.bullets ?? [])].join(" "),
      section: "experience",
    });
  }

  // Projects
  // Projects (tolerant to missing fields like tags/summary/description)
    type ProjectLike = {
    title: string;
    summary?: string;
    description?: string;
    tags?: string[];
    url?: string;
    };

    const projs = projects as unknown as ProjectLike[];

    for (const p of projs) {
    const tags = Array.isArray(p.tags) ? p.tags.join(" ") : "";
    const summary = typeof p.summary === "string" ? p.summary : "";
    const description = typeof p.description === "string" ? p.description : "";

    docs.push({
        id: `proj-${p.title}`,
        title: p.title,
        body: [summary, tags, description].filter(Boolean).join(" "),
        section: "projects",
        url: p.url,
    });
    }


  // Publications
  for (const pub of publications) {
    docs.push({
      id: `pub-${pub.title}`,
      title: `${pub.title} (${pub.year})`,
      body: `${pub.venue ?? ""} ${pub.url ?? ""}`,
      section: "publications",
      url: pub.url,
    });
  }

  // Quick “About”/links
  docs.push({
    id: "about-links",
    title: "Links",
    body: `Email: ${links.email} GitHub: ${links.github} LinkedIn: ${links.linkedin} Scholar: ${links.scholar}`,
    section: "about",
  });

  return docs;
}

export function buildIndex() {
  if (mini) return mini;
  mini = new MiniSearch<Doc>({
    fields: ["title", "body"],
    storeFields: ["title", "body", "section", "url"],
    searchOptions: { boost: { title: 2 } },
  });
  mini.addAll(docsFromSite());
  return mini;
}

export function topSnippets(query: string, k = 3): string[] {
  const ms = buildIndex();
  return ms.search(query).slice(0, k).map(r =>
    `${r.section.toUpperCase()}: ${r.title}\n${(r.body ?? "").slice(0, 600)}`
  );
}
