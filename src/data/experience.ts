// src/data/experience.ts
export type Role = {
  title: string;
  org: string;
  period: string;
  bullets: string[];
  accent?: "blue" | "gray";
  logo?: string;        // e.g. "/logos/aiia.png"
  techIcons?: string[]; // e.g. ["/icons/python.svg", "/icons/pytorch.svg"]
};

export const experience: Role[] = [
  {
    title: "AI Researcher",
    org: "AIIA Lab, Aristotle University of Thessaloniki",
    period: "Jan 2022 – Jan 2023",
    bullets: [
      "Research on Deep Learning applications in Blockchain systems.",
      "Authored MSc thesis; guest lecture on blockchain technologies.",
    ],
    logo: "/logos/aiia_icon.png",
    // techIcons: ["/icons/python.svg", "/icons/pytorch.svg", "/icons/git.svg"],
    accent: "blue",
  },
  {
    title: "AI Researcher",
    org: "AIIA Lab, Aristotle University of Thessaloniki",
    period: "Sept 2023 – Present",
    bullets: [
      "Distributed Deep Learning & Computer Vision research.",
      "ROS-based flood segmentation + Android GPS emergency app (TEMA).",
      "1 journal submission & 4 conference papers; Horizon TEMA deliverables.",
    ],
    logo: "/logos/aiia_icon.png",
    // techIcons: ["/icons/python.svg", "/icons/tensorflow.svg", "/icons/opencv.svg"],
    accent: "blue" ,
  },
];