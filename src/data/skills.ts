export type Skill = {
  key: string;      // icon key (see map below)
  name: string;
  blurb: string;
};

export const skillsRow1: Skill[] = [
  { key: "python",     name: "Python",        blurb: "Automation, scripting, backend, data tooling." },
  { key: "pytorch",    name: "PyTorch",       blurb: "Training, fine-tuning, export (TorchScript/ONNX)." },
  { key: "opencv",     name: "Computer Vision", blurb: "Segmentation, detection, tracking, metrics." },
  { key: "llms",       name: "LLMs",          blurb: "OpenAI/Hugging Face, RAG basics, prompt engineering." },
  { key: "react",      name: "React",         blurb: "Interactive UIs, Next.js demos & tools." },
  { key: "docker",     name: "Docker",        blurb: "Reproducible images for training & serving." },
];

export const skillsRow2: Skill[] = [
  { key: "tensorflow", name: "TensorFlow",    blurb: "Modeling & export pipelines." },
  { key: "numpy",      name: "NumPy",         blurb: "Array ops; vectorized data processing." },
  { key: "pandas",     name: "Pandas",        blurb: "Data wrangling and analysis." },
  { key: "cplusplus",  name: "C++",           blurb: "Perf-critical CV/geometry, native addons." },
  { key: "csharp",     name: "C#",            blurb: "Gameplay logic, tools, editor scripts." },
  { key: "unity",      name: "Unity",         blurb: "Rapid 3D/AR prototyping, simulation." },
  { key: "unreal",     name: "Unreal Engine", blurb: "High-fidelity scenes & realtime rendering." },
];