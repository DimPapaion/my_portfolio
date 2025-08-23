"use client";

import type { IconType } from "react-icons";
import {
  SiPython, SiPytorch, SiTensorflow, SiOpencv,
  SiDocker, SiAmazonaws, SiGooglecloud, SiGit,
  SiNumpy, SiPandas, SiScikitlearn, SiOnnx, SiNvidia
} from "react-icons/si";

// map your 'key' to an icon component
const ICONS: Record<string, IconType> = {
  python: SiPython,
  pytorch: SiPytorch,
  tensorflow: SiTensorflow,
  opencv: SiOpencv,
  docker: SiDocker,
  gcp: SiGooglecloud,
  git: SiGit,
  numpy: SiNumpy,
  pandas: SiPandas,
  sklearn: SiScikitlearn,
  onnx: SiOnnx,
  tensorrt: SiNvidia,
  mlops: SiScikitlearn, // placeholder — swap to your preferred icon
};

// brand-ish colors
const COLORS: Record<string, string> = {
  python: "#3776AB",
  pytorch: "#EE4C2C",
  tensorflow: "#FF6F00",
  opencv: "#5C3EE8",
  docker: "#2496ED",
  aws: "#FF9900",
  gcp: "#4285F4",
  git: "#F05032",
  numpy: "#013243",
  pandas: "#150458",
  sklearn: "#F7931E",
  onnx: "#005CED",
  tensorrt: "#76B900",
  mlops: "#64748B",
};

export default function SkillIcon({ name, size = 28 }: { name: string; size?: number }) {
  const Ico = ICONS[name] ?? SiGit;
  const color = COLORS[name] ?? "#64748B";
  return <Ico size={size} style={{ color }} aria-hidden />;
}