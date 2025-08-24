export type Pub = {
  authors?: string; // new
  title: string;
  venue: string;
  year: string;
  url?: string;
  
  author?: string;  // optional: backward-compat if some entries still use "author"
};


export const publications: Pub[] = [
{
authors: "Dimitrios Papaioannou, Vasileios Mygdalis and Ioannis Pitas",
title: "Towards human society-inspired decentralized DNN inference",
venue: "Signal Processing: Image Communication",
year: "2025",
url: "https://www.sciencedirect.com/science/article/pii/S0923596525000530",
},
{
authors: "Dimitrios Papaioannou, Vasileios Mygdalis and Ioannis Pitas",
title: "Revisiting One versus One Classification for Adversarial Robustness (Under Review)",
venue: "Neural Networks",
year: "2025",

},
{
authors: "Dimitrios Papaioannou, Vasileios Mygdalis and Ioannis Pitas",
title: "A Decentralized Sharding BFT Consensus Approach, for Efficient Decentralized DNN Inference Classification",
venue: "2025 IEEE Symposium on Computers and Communications (ISCC) ",
year: "2025",
url: "https://zenodo.org/records/15281260"
},
{
authors: "Anastasios Gerontopoulos, Dimitrios Papaioannou, Christos Papaioannidis and Ioannis Pitas",
title: "Real-Time Flood Water Segmentation with Deep Neural Networks",
venue: "2025 IEEE 25th International Symposium on Cluster, Cloud and Internet Computing Workshops (CCGridW)",
year: "2025",
url: "https://www.computer.org/csdl/proceedings-article/ccgridw/2025/093800a085/27ZLvBXjyrS"
},
{
authors: "Dimitrios Papaioannou, Vasileios Mygdalis and Ioannis Pitas",
title: "Proof of Quality Inference (PoQI): An AI Consensus Protocol for Decentralized DNN Inference",
venue: "2024 IEEE Symposium on Computers and Communications (ISCC) ",
year: "2024",
url: "https://doi.ieeecomputersociety.org/10.1109/ISCC61673.2024.10733731"
},
{
authors: "Dimitrios Papaioannou, Vasileios Mygdalis and Ioannis Pitas",
title: "Forest Fire Image Classification Through Decentralized DNN Inference",
venue: "IEEE ICIP Challenges & Workshops 2024",
year: "2024",
url: "https://ieeexplore.ieee.org/document/10769107"
},
];