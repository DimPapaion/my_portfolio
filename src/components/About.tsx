"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Section from "@/components/Section";

export default function About() {
  return (
    <Section id="about" title="About">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        {/* Left: your paragraph */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-lg leading-relaxed space-y-4"
        >
          <p>
            I’m a Machine Learning Engineer / AI Researcher passionate about
            <strong> computer vision</strong> and building reliable, production-ready ML systems.
            I enjoy turning research ideas into practical solutions that actually ship.
          </p>
          <p>
            I’ve worked on distributed training, segmentation, and real-time inference. My goals:
            keep shipping useful ML products, publish impactful work, and collaborate with great teams.
          </p>
        </motion.div>

        {/* Right: your image */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center md:justify-end"
        >
          <Image
            src="/me.png"            // put your photo at public/about.jpg (or reuse /me.png)
            alt="Dimitrios — portrait"
            width={560}
            height={700}
            className="w-full max-w-md rounded-3xl object-cover aspect-[4/5]
                       ring-1 ring-black/5 dark:ring-white/10"
            priority
          />
        </motion.div>
      </div>
    </Section>
  );
}
