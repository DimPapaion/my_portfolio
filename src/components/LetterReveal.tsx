"use client";
import { motion } from "framer-motion";

export default function LetterReveal({
  text,
  delay = 0.0,
  className = "",
}: { text: string; delay?: number; className?: string }) {
  const chars = Array.from(text);
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: delay },
    },
  };
  const child = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.25, ease: "easeOut" } },
  };

  return (
    <motion.span variants={container} initial="hidden" animate="show" className={className}>
      {chars.map((c, i) => (
        <motion.span key={i} variants={child}>
          {c === " " ? "\u00A0" : c}
        </motion.span>
      ))}
    </motion.span>
  );
}
