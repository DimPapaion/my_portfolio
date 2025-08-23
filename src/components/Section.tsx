"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Section({
  id,
  title,
  children,
}: React.PropsWithChildren<{ id?: string; title: string }>) {
  return (
    <motion.section
      id={id}
      className="max-w-4xl mx-auto px-6 py-12"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h2
        className="text-2xl md:text-3xl font-semibold tracking-tight"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05, duration: 0.5 }}
      >
        {title}
      </motion.h2>
      <div className="mt-4 text-gray-700 leading-relaxed">{children}</div>
    </motion.section>
  );
}
