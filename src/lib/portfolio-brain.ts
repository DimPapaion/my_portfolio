import { links } from "@/data/links";
import { projects } from "@/data/projects";
import { publications } from "@/data/publications";
import { experience } from "@/data/experience";


// Shared action type
export type Action =
  | { type: "scroll"; targetId: string }
  | { type: "open"; url: string };

// Every answer has text; action is optional
export type BrainAnswer = {
  text: string;
  action?: Action;
};

export function answerPortfolioQuestion(qRaw: string): BrainAnswer {
  const q = qRaw.toLowerCase().trim();

  // shortcuts
  if (q.includes("cv") || q.includes("resume")) return { text: "Opening CV.", action: { type: "open", url: "/cv.pdf" } };
  if (q.includes("github")) return { text: "Opening GitHub.", action: { type: "open", url: links.github } };
  if (q.includes("linkedin")) return { text: "Opening LinkedIn.", action: { type: "open", url: links.linkedin } };
  if (q.includes("scholar")) return { text: "Opening Google Scholar.", action: { type: "open", url: links.scholar } };
  if (q.includes("email") || q.includes("contact")) return { text: `Email me at ${links.email}.`, action: { type: "scroll", targetId: "contact" } };

  if (q.includes("project")) return { text: `I list ${projects.length} projects.`, action: { type: "scroll", targetId: "projects" } };
  if (q.includes("publication")) return { text: `I list ${publications.length} publications.`, action: { type: "scroll", targetId: "publications" } };
  if (q.includes("experience") || q.includes("work")) return { text: `I list ${experience.length} roles.`, action: { type: "scroll", targetId: "experience" } };
  if (q.includes("skills")) return { text: "Jumping to skills.", action: { type: "scroll", targetId: "skills" } };
  if (q.includes("about")) return { text: "Here’s a short bio.", action: { type: "scroll", targetId: "about" } };

  if (q.includes("list") && q.includes("projects")) {
    const names = projects.map(p => `• ${p.title}`).join("\n");
    return { text: `Projects:\n${names}` };
  }
  if (q.includes("list") && q.includes("publications")) {
    const names = publications.map(p => `• ${p.title} (${p.year})`).join("\n");
    return { text: `Publications:\n${names}` };
  }

  return {
    text:
      "Try: “open CV”, “show projects”, “list publications”, “go to experience”. Paste a job description to analyze fit if LLM mode is on.",
  };
}