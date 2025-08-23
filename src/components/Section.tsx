"use client";
import { motion } from "framer-motion";
import React from "react";

type SectionProps = React.PropsWithChildren<{
  id?: string;
  title?: string;
  className?: string;
  titleClassName?: string;      // NEW
  containerClassName?: string;  // NEW
}>;

export default function Section({
  id,
  title,
  children,
  className,
  titleClassName,
  containerClassName,
}: SectionProps) {
  return (
    <motion.section
      id={id}
      className={`snap-center min-h-[100svh] flex items-center ${className ?? ""}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* use containerClassName to control max width */}
      <div className={`w-full mx-auto px-6 ${containerClassName ?? "max-w-5xl"}`}>
        {title ? (
          <motion.h2
            className={`text-center uppercase tracking-[0.35em] !text-black dark:!text-gray-500
                        text-base md:text-lg ${titleClassName ?? ""}`}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05, duration: 0.5 }}
          >
            {title}
          </motion.h2>
        ) : null}

        <div className={title ? "mt-6 text-gray-800 dark:text-gray-500" : ""}>
          {children}
        </div>
      </div>
    </motion.section>
  );
}