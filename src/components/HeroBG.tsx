"use client";
import { motion } from "framer-motion";

export default function HeroBG() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      {/* Subtle grid, fades out toward edges */}
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]">
        <div className="absolute inset-0
          bg-[linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)]
          bg-[size:24px_24px]
          dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]
        " />
      </div>

      {/* Animated blobs */}
      <motion.div
        className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-sky-400/40 blur-3xl will-change-transform"
        animate={{ x: [0, 40, 0], y: [0, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-indigo-400/40 blur-3xl will-change-transform"
        animate={{ x: [0, -30, 0], y: [0, -10, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/30 blur-3xl will-change-transform"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      {/* Soft bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/60 dark:to-neutral-950/60" />

      {/* Micro “grain” dots */}
      <div className="pointer-events-none absolute inset-0 opacity-15
        [background-image:radial-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)]
        [background-size:2px_2px]
        dark:[background-image:radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)]
      " />
    </div>
  );
}
