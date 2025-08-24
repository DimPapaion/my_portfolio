export type Project = {
  title: string;
  summary: string;          // 1–2 lines max
  role?: string;            // your role/ownership
  stack: string[];
  impact?: string;          // business/user impact
  metrics?: { label: string; value: string }[];
  links?: { github?: string; paper?: string; demo?: string; video?: string };
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Real-Time Flood Water Segmentation (Horizon TEMA)",
    role: "Lead ML + KPI Owner",
    summary:
      "ROS-based semantic segmentation pipeline with overlay and telemetry; paired Android app for GPS capture during emergencies; Proposed a novel Flood Segmentation Dataset for Supervised and Semi-supervised tasks",
    stack: ["Python", "PyTorch", "ROS", "Docker", "Android"],
    impact: "Enabled field teams to visualize flood extent in real time and report geo-tagged evidence.",
    metrics: [
      { label: "KPIs", value: "mIoU / F1, p95 latency, FPS, robustness" },
      // Fill real numbers when ready, e.g. { label: "mIoU", value: "0.76 (val)" }
    ],
    links: {
      // Put the correct paper link here if/when published for this project
      // paper: "https://…",
      // demo: "https://…", // optional HuggingFace Space/Gradio demo
      paper: "https://www.computer.org/csdl/proceedings-article/ccgridw/2025/093800a085/27ZLvBXjyrS", // repo or umbrella repo
    },
    featured: true,
  },
  {
    title: "Decentralized DNN Inference (PoQI / Sharded BFT)",
    role: "Research & Protocol Design",
    summary:
      "Byzantine-resilient consensus for inference: nodes agree on input and commit a single classification via PBFT-style quorum, tolerating malicious peers.",
    stack: ["Distributed Systems", "Distributed Consensus Protocols", "PyTorch"],
    impact: "Shifts robustness to inference time; reliable decisions in multi-agent CV systems.",
    metrics: [
      { label: "Fault model", value: "Byzantine tolerance" },
      { label: "Consensus", value: "PBFT-inspired, sharded" },
    ],
    links: {
      paper: "https://www.sciencedirect.com/science/article/pii/S0923596525000530",
      github: "https://github.com/DimPapaion",
    },
    featured: true,
  },
  {
  title: "Adversarial Robustness with One-vs-One (OvO) + HCP",
  summary:
    "Revisited multi-class classification with an OvO output layer and HCP loss, yielding stronger resilience than OvA baselines under FGSM/BIM/MIM and transfer attacks across CIFAR-10/STL-10/SVHN/MNIST/BLAZE.",
  stack: ["PyTorch", "Robustness", "OvO", "HCP"],
  links: { github: "https://github.com/DimPapaion" },
},


  // Optional small personal pieces (nice to have 1–2 like these)
  {
    title: "Edge Segmentation Demo (ONNX Runtime Web)",
    role: "Personal project",
    summary:
      "Client-side mask overlay in the browser using ONNX Runtime Web; upload an image → get segmentation overlay (no server).",
    stack: ["TypeScript", "ONNX Runtime Web", "Next.js"],
    impact: "Zero-backend demo visitors can try instantly.",
    links: { demo: "/demo/segmentation", github: "https://github.com/DimPapaion" },
  },
  // {
  //   title: "Vision Service Skeleton",
  //   role: "Personal project",
  //   summary:
  //     "Cookie-cutter server for CV models (FastAPI + Torch/ONNX, health checks, batching, p95 latency logging, Dockerfile).",
  //   stack: ["Python", "FastAPI", "Docker", "PyTorch"],
  //   impact: "Templates production concerns for faster iterations.",
  //   links: { github: "https://github.com/DimPapaion" },
  // },
];
