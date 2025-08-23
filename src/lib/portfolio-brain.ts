import { links } from "@/data/links";
import { projects } from "@/data/projects";
import { publications } from "@/data/publications";
import { experience } from "@/data/experience";

// Action a UI can take (scroll/open)
export type Action =
  | { type: "scroll"; targetId: string }
  | { type: "open"; url: string };

// LLM/local answer shape
export type BrainAnswer = { text: string; action?: Action };

// ---- Quick actions for the UI chips ----
export type QuickAction = { label: string; action: Action };

export const QUICK_ACTIONS: QuickAction[] = [
  { label: "Open CV",       action: { type: "open",   url: "/cv.pdf" } },
  { label: "Projects",      action: { type: "scroll", targetId: "projects" } },
  { label: "Experience",    action: { type: "scroll", targetId: "experience" } },
  { label: "Publications",  action: { type: "scroll", targetId: "publications" } },
  { label: "Skills",        action: { type: "scroll", targetId: "skills" } },
  { label: "Contact",       action: { type: "scroll", targetId: "contact" } },
];

// Optional slash commands: "/cv", "/projects", ...
const CMD: Record<string, Action> = {
  cv:           { type: "open", url: "/cv.pdf" },
  resume:       { type: "open", url: "/cv.pdf" },
  projects:     { type: "scroll", targetId: "projects" },
  experience:   { type: "scroll", targetId: "experience" },
  pubs:         { type: "scroll", targetId: "publications" },
  publications: { type: "scroll", targetId: "publications" },
  skills:       { type: "scroll", targetId: "skills" },
  contact:      { type: "scroll", targetId: "contact" },
};

// Recruiter/fit detector
const HIRE_REGEX = /(hire|fit|suitable|good candidate|should.*(hire|recruit)|is.*ok.*hire)/i;

export function answerPortfolioQuestion(qRaw: string): BrainAnswer {
  const s = qRaw.trim();
  const q = s.toLowerCase();

  // --- Slash commands first: "/cv", "/projects", ...
  if (q.startsWith("/")) {
    const key = q.slice(1);
    const act = CMD[key];
    if (act) return { text: "✅", action: act };
  }

  // --- Explicit open/scroll commands
  if (/open\s+(cv|resume)/i.test(s)) {
    return { text: "Opening CV…", action: { type: "open", url: "/cv.pdf" } };
  }
  if (/projects?/i.test(s) && /(show|open|view|go)/i.test(s)) {
    return { text: "Jumping to Projects…", action: { type: "scroll", targetId: "projects" } };
  }
  if (/publications?/i.test(s) && /(show|open|view|go)/i.test(s)) {
    return { text: "Jumping to Publications…", action: { type: "scroll", targetId: "publications" } };
  }
  if (/experience|work/i.test(s) && /(show|open|view|go)/i.test(s)) {
    return { text: "Jumping to Experience…", action: { type: "scroll", targetId: "experience" } };
  }

  // --- Phrase shortcuts
  if (q.includes("cv") || q.includes("resume")) {
    return { text: "Opening CV.", action: { type: "open", url: "/cv.pdf" } };
  }
  if (q.includes("github")) {
    return { text: "Opening GitHub.", action: { type: "open", url: links.github } };
  }
  if (q.includes("linkedin")) {
    return { text: "Opening LinkedIn.", action: { type: "open", url: links.linkedin } };
  }
  if (q.includes("scholar")) {
    return { text: "Opening Google Scholar.", action: { type: "open", url: links.scholar } };
  }
  if (q.includes("email") || q.includes("contact")) {
    return { text: `Email me at ${links.email}.`, action: { type: "scroll", targetId: "contact" } };
  }

  if (q.includes("project")) {
    return { text: `I list ${projects.length} projects.`, action: { type: "scroll", targetId: "projects" } };
  }
  if (q.includes("publication")) {
    return { text: `I list ${publications.length} publications.`, action: { type: "scroll", targetId: "publications" } };
  }
  if (q.includes("experience") || q.includes("work")) {
    return { text: `I list ${experience.length} roles.`, action: { type: "scroll", targetId: "experience" } };
  }
  if (q.includes("skills")) {
    return { text: "Jumping to skills.", action: { type: "scroll", targetId: "skills" } };
  }
  if (q.includes("about")) {
    return { text: "Here’s a short bio.", action: { type: "scroll", targetId: "about" } };
  }

  // --- List commands
  if (q.includes("list") && q.includes("projects")) {
    const names = projects.map(p => `• ${p.title}`).join("\n");
    return { text: `Projects:\n${names}` };
  }
  if (q.includes("list") && q.includes("publications")) {
    const names = publications.map(p => `• ${p.title} (${p.year})`).join("\n");
    return { text: `Publications:\n${names}` };
  }

  // --- Hiring/fit fallback (recruiter-style)
  if (HIRE_REGEX.test(s) || /what.*think.*dimitri/i.test(q)) {
    const text = [
      "Verdict: **Yes** — strong fit for Machine Learning Engineer roles.",
      "Why:",
      "• Hands-on CV & production ML work (segmentation, classification, distributed/disaggregated inference).",
      "• Evidence of research impact (publications) + delivery in real projects.",
      "• Tooling breadth (PyTorch/TensorFlow, Docker; basic cloud), practical implementations.",
      "Evidence:",
      "• **Experience** — AIIA Lab (distributed DL, flood segmentation).",
      "• **Projects** — flood water segmentation, forest fire classification.",
      "• **Publications** — computer vision & efficiency topics.",
      "Next step: Open the CV or review Projects.",
    ].join("\n");
    return { text, action: { type: "open", url: "/cv.pdf" } };
  }

  // --- Generic fallback
  return {
    text:
      "Try: “open CV”, “show projects”, “list publications”, or “go to experience”. You can also type slash commands like /cv or /projects.",
  };
}