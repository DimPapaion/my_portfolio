// src/lib/search.ts
import MiniSearch, { type SearchResult } from "minisearch";
import { links } from "@/data/links";
import { projects } from "@/data/projects";
import { publications } from "@/data/publications";
import { experience } from "@/data/experience";

type Doc = {
  id: string;
  title: string;
  body: string;
  section: "links" | "about" | "projects" | "publications" | "experience";
  url?: string;
};

// Minimal shapes so we don't rely on external types
type ProjectLike = {
  title: string;
  url?: string;
  summary?: string;
  description?: string;
  tags?: string[];
};

type PublicationLike = {
  title: string;
  year?: number | string;
  venue?: string;
  url?: string;
};

type RoleLike = {
  title: string;
  org: string;
  period: string;
  bullets?: string[];
};

function slug(s?: string) {
  return (s ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

// Ensure document IDs are globally unique
const seen = new Set<string>();
function uniq(base: string) {
  let id = base;
  let n = 1;
  while (seen.has(id)) id = `${base}-${n++}`;
  seen.add(id);
  return id;
}

let _index: MiniSearch<Doc> | null = null;
let _docsById: Map<string, Doc> | null = null;

export function buildIndex(): MiniSearch<Doc> {
  const ms = new MiniSearch<Doc>({
    idField: "id",
    fields: ["title", "body", "section"],
    storeFields: ["title", "body", "section", "url"],
    searchOptions: { boost: { title: 2 } },
  });

  const docs: Doc[] = [];
  const byId = new Map<string, Doc>();

  // LINKS
  const linksDoc: Doc = {
    id: uniq("links"),
    title: "Links",
    body: [
      links.name,
      links.title,
      links.email ?? "",
      links.linkedin ?? "",
      links.github ?? "",
    ].join(" "),
    section: "links",
  };
  docs.push(linksDoc);
  byId.set(linksDoc.id, linksDoc);

  // Short bio so vague queries match
  const bioDoc: Doc = {
    id: uniq("about-bio"),
    title: "About Dimitrios",
    body:
      "Machine Learning Engineer / AI Researcher focusing on computer vision and production ML. " +
      "Bridging research with scalable implementations. Interests: model efficiency, edge inference, reliable evaluation.",
    section: "about",
  };
  docs.push(bioDoc);
  byId.set(bioDoc.id, bioDoc);

  // PROJECTS
  const projs = projects as unknown as ProjectLike[];
  projs.forEach((p, i) => {
    const tags = Array.isArray(p.tags) ? p.tags.join(" ") : "";
    const summary = p.summary ?? "";
    const description = p.description ?? "";
    const d: Doc = {
      id: uniq(`proj-${slug(p.title)}-${i}`),
      title: p.title ?? "Project",
      body: [summary, tags, description].filter(Boolean).join(" "),
      section: "projects",
      url: p.url,
    };
    docs.push(d);
    byId.set(d.id, d);
  });

  // PUBLICATIONS
  const pubs = publications as unknown as PublicationLike[];
  pubs.forEach((pub, i) => {
    const d: Doc = {
      id: uniq(`pub-${slug(pub.title)}-${pub.year ?? "y"}-${i}`,
      ),
      title: pub.title ?? "Publication",
      body: `${pub.venue ?? ""} ${pub.year ?? ""}`.trim(),
      section: "publications",
      url: pub.url,
    };
    docs.push(d);
    byId.set(d.id, d);
  });

  // EXPERIENCE (include index to avoid duplicates)
  const roles = experience as unknown as RoleLike[];
  roles.forEach((r, i) => {
    const bullets = Array.isArray(r.bullets) ? r.bullets.join(" ") : "";
    const d: Doc = {
      id: uniq(`exp-${slug(r.org)}-${slug(r.title)}-${i}`),
      title: `${r.title} — ${r.org}`,
      body: `${r.period} ${bullets}`.trim(),
      section: "experience",
    };
    docs.push(d);
    byId.set(d.id, d);
  });

  ms.addAll(docs);
  _docsById = byId;
  return ms;
}

export function topSnippets(query: string, k = 3): string[] {
  try {
    if (!_index) _index = buildIndex();
    if (!_docsById) _docsById = new Map<string, Doc>();
    if (!query.trim()) return [];

    const results = _index.search(query, {
      prefix: true,
      fuzzy: 0.2,
      combineWith: "AND",
    }) as SearchResult[];

    return results.slice(0, k).map((r) => {
      const d = _docsById!.get(String(r.id));
      if (!d) return String(r.id);
      const parts: string[] = [];
      if (d.title) parts.push(d.title);
      if (d.section) parts.push(d.section);
      if (d.body) parts.push(d.body);
      return parts.join(" — ");
    });
  } catch (e) {
    // Never break the assistant if search chokes
    console.error("MiniSearch error:", e);
    return [];
  }
}
