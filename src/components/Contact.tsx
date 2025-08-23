"use client";

import { motion } from "framer-motion";
import Section from "@/components/Section";
import { links } from "@/data/links";
import { MdCall, MdEmail, MdLocationOn } from "react-icons/md";

export default function Contact() {
  // simple mailto submit (no backend needed)
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = (fd.get("name") as string) || "";
    const email = (fd.get("email") as string) || "";
    const subject = (fd.get("subject") as string) || "Contact from portfolio";
    const message = (fd.get("message") as string) || "";

    const mailto = `mailto:${links.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(`${message}\n\n— ${name} (${email})`)}`;

    window.location.href = mailto;
  }

  return (
    <Section id="contact" title="Contact" titleClassName="text-lg md:text-xl">
      <div className="max-w-2xl mx-auto text-center">
        {/* Big headline */}
        <motion.h3
          className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-gray-500"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
        >
          Do you find my profile interesting? Let’s connect and discuss how I can help you.
        </motion.h3>

        {/* Info rows */}
        {/* phone (optional) */}
        {links.phone && (
        <li className="flex items-center justify-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full
                            bg-sky-100 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300">
            <MdCall size={18} aria-hidden />
            </span>
            <a href={`tel:${links.phone}`} className="hover:underline">{links.phone}</a>
        </li>
        )}

        {/* email */}
        <li className="flex items-center justify-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-full
                        bg-sky-100 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300">
            <MdEmail size={18} aria-hidden />
        </span>
        <a href={`mailto:${links.email}`} className="hover:underline">{links.email}</a>
        </li>

        {/* location (optional) */}
        {links.location && (
        <li className="flex items-center justify-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full
                            bg-sky-100 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300">
            <MdLocationOn size={18} aria-hidden />
            </span>
            <span>{links.location}</span>
        </li>
        )}


        {/* Form */}
        <form onSubmit={onSubmit} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            name="name"
            placeholder="Name"
            className="rounded-xl border bg-gray-100 dark:bg-white/5 dark:border-white/10
                       px-4 py-3 outline-none focus:ring-2 ring-sky-400/50 w-full"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="rounded-xl border bg-gray-100 dark:bg-white/5 dark:border-white/10
                       px-4 py-3 outline-none focus:ring-2 ring-sky-400/50 w-full"
            required
          />
          <input
            name="subject"
            placeholder="Subject"
            className="md:col-span-2 rounded-xl border bg-gray-100 dark:bg-white/5 dark:border-white/10
                       px-4 py-3 outline-none focus:ring-2 ring-sky-400/50 w-full"
          />
          <textarea
            name="message"
            placeholder="Message"
            rows={5}
            className="md:col-span-2 rounded-xl border bg-gray-100 dark:bg-white/5 dark:border-white/10
                       px-4 py-3 outline-none focus:ring-2 ring-sky-400/50 w-full resize-y"
            required
          />
          <button
            type="submit"
            className="md:col-span-2 h-12 rounded-xl bg-blue-500 text-white font-semibold
                       hover:bg-magenta-600 active:scale-[0.99] transition"
          >
            Submit
          </button>
        </form>
      </div>
    </Section>
  );
}
