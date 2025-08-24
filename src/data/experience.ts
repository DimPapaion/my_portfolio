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
    org: "CVML Group - AIIA Lab, Aristotle University of Thessaloniki",
    period: "Jan 2022 – Jan 2023",
    bullets: [
    "Explored ML–blockchain integration (on-chain data retrieval, off-chain training, provenance).",
    "Designed a decentralized DNN inference protocol using BFT-style consensus (PBFT) so all nodes process the same input and commit a single classification, tolerating Byzantine nodes.",
    "Positioned robustness at inference time: synchronized input agreement, cross-node voting, quorum commits; evaluated latency/accuracy trade-offs.",
    "Created education material for Cryptography and Blockchain Protocols",
    ],
    logo: "/logos/aiia_icon.png",
    // techIcons: ["/icons/python.svg", "/icons/pytorch.svg", "/icons/git.svg"],
    accent: "blue",
  },
  {
    title: "AI Researcher",
    org: "CVML Group - AIIA Lab, Aristotle University of Thessaloniki",
    period: "Sept 2023 – Present",
    bullets: [
    "Owned KPI definition & monitoring for the flood-segmentation stack (mIoU, latency, FPS); automated evaluation runs and reports to the TEMA consortium.",
    "Designed and deployed a ROS-based real-time flood segmentation system (capture → inference → overlay) for field/edge use.",
    "Built an Android GPS tracking app for emergency scenarios",
    "Maintained data/experiment pipelines and model versioning; reproducible training and CI for model releases; contributed to project deliverables and publications.",
    ],
    logo: "/logos/aiia_icon.png",
    // techIcons: ["/icons/python.svg", "/icons/tensorflow.svg", "/icons/opencv.svg"],
    accent: "blue" ,
  },
];