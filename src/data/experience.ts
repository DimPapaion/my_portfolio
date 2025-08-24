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
      "Created education material for Cryptography and Blockchain Protocols",
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
      "Conducted research on Adversarial defensive strategies for robust DNN classification, real-time semantic segmentation, and decentralized DNN inference.",
      "ROS-based flood segmentation system for real-time disaster prediction",
      "Android GPS tracking application for emergency situations",
    ],
    logo: "/logos/aiia_icon.png",
    // techIcons: ["/icons/python.svg", "/icons/tensorflow.svg", "/icons/opencv.svg"],
    accent: "blue" ,
  },
];