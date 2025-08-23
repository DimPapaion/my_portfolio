export type Skill = {
  key: string;      // icon key (see map below)
  name: string;
  blurb: string;
};

export const skillsRow1: Skill[] = [
  { key: "python",     name: "Python",        blurb: "Automation, scripting, backend, data tooling." },
  { key: "pytorch",    name: "PyTorch",       blurb: "Training, fine-tuning, Lightning, TorchScript." },
  { key: "opencv",     name: "Computer Vision", blurb: "Segmentation, detection, tracking, metrics." },
  { key: "aws",        name: "AWS",           blurb: "S3, Batch, ECS, Lambda, CI/CD." },
  { key: "docker",     name: "Docker",        blurb: "Reproducible images for training & serving." },
];

export const skillsRow2: Skill[] = [
  { key: "mlops",      name: "MLOps",         blurb: "Experiment tracking, eval suites, monitoring." },
  { key: "tensorflow", name: "TensorFlow",    blurb: "Modeling & export pipelines." },
  { key: "numpy",      name: "NumPy",         blurb: "Array crunching; vectorized data ops." },
  { key: "pandas",     name: "Pandas",        blurb: "Data wrangling at scale." },
  { key: "git",        name: "Git",           blurb: "Clean branching, reviews, releases." },
];