"use client";
import { motion } from "framer-motion";
import React from "react";

export default function Section({
  id,
  title,
  children,
  className,
}: React.PropsWithChildren<{ id?: string; title: string; className?: string }>) {
  return (
    <motion.section
      id={id}
      className={`snap-center min-h-[100svh] flex items-center ${className ?? ""}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="w-full max-w-4xl mx-auto px-6">
        <motion.h2
          className="text-2xl md:text-3xl font-semibold tracking-tight"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05, duration: 0.5 }}
        >
          {title}
        </motion.h2>
        <div className="mt-4 text-gray-700 dark:text-neutral-300 leading-relaxed">
          {children}
        </div>
      </div>
    </motion.section>
  );
}
