"use client";
import type { IconType } from "react-icons";
import {
  SiPython, SiPytorch, SiTensorflow, SiOpencv,
  SiDocker, SiGit, SiNumpy, SiPandas, SiScikitlearn, SiOnnx, SiNvidia,
  SiReact, SiCplusplus, SiDotnet,
  SiUnity, SiUnrealengine, SiOpenai, SiHuggingface,
} from "react-icons/si";

/* ===== icons + colors ===== */
export const ICONS: Record<string, IconType> = {
  python: SiPython,
  pytorch: SiPytorch,
  tensorflow: SiTensorflow,
  opencv: SiOpencv,
  docker: SiDocker,
  git: SiGit,
  numpy: SiNumpy,
  pandas: SiPandas,
  sklearn: SiScikitlearn,
  onnx: SiOnnx,
  tensorrt: SiNvidia,

  react: SiReact,
  cplusplus: SiCplusplus,
  csharp: SiDotnet,       // using .NET logo for C#
  unity: SiUnity,
  unreal: SiUnrealengine,

  llms: SiOpenai,
  openai: SiOpenai,
  huggingface: SiHuggingface,
};

export const COLORS: Record<string, string> = {
  python: "#3776AB",
  pytorch: "#EE4C2C",
  tensorflow: "#FF6F00",
  opencv: "#5C3EE8",
  docker: "#2496ED",
  git: "#F05032",
  numpy: "#013243",
  pandas: "#150458",
  sklearn: "#F7931E",
  onnx: "#005CED",
  tensorrt: "#76B900",

  react: "#61DAFB",
  cplusplus: "#00599C",
  csharp: "#239120",
  unity: "#222222",
  unreal: "#0E1128",
  llms: "#74AA9C",
  openai: "#74AA9C",
  huggingface: "#FFCC4D",
};

export default function SkillIcon({
  keyName,
  className,
  size = 24,
  color,
}: {
  keyName: string;
  className?: string;
  size?: number;
  /** optional override; otherwise we pick from COLORS by key */
  color?: string;
}) {
  const I = ICONS[keyName] ?? SiPython;
  const resolved = color ?? COLORS[keyName]; // <- auto brand color
  return <I className={className} size={size} color={resolved} aria-hidden />;
}

