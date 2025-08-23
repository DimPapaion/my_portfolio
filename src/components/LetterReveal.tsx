"use client";
import { motion, type Variants } from "framer-motion";

export default function LetterReveal({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const chars = Array.from(text);

  // cubic-bezier for easeOut: matches FM’s Easing type
  const easeOut: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1,
        // no 'ease' here — not needed on the container
      },
    },
  };

  const child: Variants = {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: easeOut, // ✅ typed tuple, not a string
      },
    },
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
