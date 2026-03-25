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
    title: "AI Engineer (Computer Vision)",
    org: "IKnowHow SA., Athens, Greece",
    period: "Nov 2025 – present",
    bullets: [
     "Designed a semi-automated annotation pipeline using YOLO11 for bbox generation and SAM2 for mask refinement via text and bbox-guided prompts, managed dataset versioning on Roboflow",
      "Developed and benchmarked RF-DETR and YOLO family models for leaf detection ($mAP@50: ~92\%$) and tomato ripeness classification on edge devices, authored technical report on accuracy/compute trade-offs",
      " Implemented a vegetation index-based plant health alert system (NDVI, NDWI, NIR-derived indices) from multispectral imagery to flag disease indicators and estimate water content",
      "Conducted greenhouse field campaigns using multispectral imaging (RGB + NIR bands) to create a novel dataset for plant disease detection and downstream classification tasks",
      "Engineered a modular multimodal classification pipeline for RGB and multispectral imagery, improving classification accuracy from $83\%$ to up to ~$90\%$, enabling flexible experimentation with stacked-band inputs and attention-based multi-branch fusion architectures",
      "Maintained collaborative ML workflows using Git/GitHub, managed model and dataset versioning via Hugging Face, and performed hyperparameter optimization with Optuna and experiment tracking using MLflow",
    ],
    logo: "/logos/ikh_icon.png",
    // techIcons: ["/icons/python.svg", "/icons/pytorch.svg", "/icons/git.svg"],
    accent: "blue",
  },
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