export type Project = {
title: string;
summary: string;
stack: string[];
links?: { github?: string; paper?: string; demo?: string };
};


export const projects: Project[] = [
{
title: "Real-Time Flood Water Segmentation",
summary:
"ROS-based semantic segmentation pipeline for real-time disaster prediction; contributed Android GPS tracking app for emergencies (TEMA Project).",
stack: ["Python", "PyTorch", "ROS", "Docker", "Android"],
links: {
paper: "https://doi.org/10.1016/j.image.2025.117306", // placeholder; replace with relevant link if needed
},
},
{
title: "Decentralized DNN Inference (PoQI, Sharded BFT)",
summary:
"Research & prototypes on distributed consensus for decentralized DNN inference; multiple conference publications (ISCC 2024/2025, ICIPCW 2024).",
stack: ["Blockchain", "Distributed Systems", "PyTorch"],
links: {
paper: "https://www.sciencedirect.com/science/article/pii/S0923596525000530",
github: "https://github.com/DimPapaion",
},
},
{
title: "Forest Fire Image Classification",
summary:
"Robust CV classification model; results published/under submission (ICIPCW 2024, ICASSP submission 2026).",
stack: ["Computer Vision", "PyTorch"],
links: {
github: "https://github.com/DimPapaion",
},
},
];