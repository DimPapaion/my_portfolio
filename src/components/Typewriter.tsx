"use client";
import { useEffect, useState } from "react";

export default function RotatingTypewriter({
  lines,
  typingSpeed = 32,
  deletingSpeed = 18,
  pauseMs = 1100,
  className = "",
}: {
  lines: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);                 // which line
  const [text, setText] = useState("");          // current substring
  const [mode, setMode] = useState<"typing"|"pausing"|"deleting">("typing");

  useEffect(() => {
    const full = lines[i];
    let id = 0 as unknown as number;

    if (mode === "typing") {
      if (text.length < full.length) {
        id = window.setTimeout(() => setText(full.slice(0, text.length + 1)), typingSpeed);
      } else {
        id = window.setTimeout(() => setMode("pausing"), pauseMs);
      }
    } else if (mode === "pausing") {
      id = window.setTimeout(() => setMode("deleting"), 350);
    } else {
      if (text.length > 0) {
        id = window.setTimeout(() => setText(full.slice(0, text.length - 1)), deletingSpeed);
      } else {
        setI((i + 1) % lines.length);
        setMode("typing");
      }
    }
    return () => clearTimeout(id);
  }, [text, mode, i, lines, typingSpeed, deletingSpeed, pauseMs]);

  return <span className={className}>{text}</span>;
}