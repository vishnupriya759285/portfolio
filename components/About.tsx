"use client";

import { motion } from "framer-motion";
import SectionFrame from "./SectionFrame";
import { aboutParagraphs, aboutStats } from "./portfolioData";

export default function About() {
  return (
    <SectionFrame id="about" eyebrow="ABOUT ME" title="About Me">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:items-start">
        <div className="max-w-[65ch] space-y-5 text-base leading-8 text-white/75 md:text-lg md:leading-9">
          {aboutParagraphs.map((paragraph, index) => (
            <motion.p
              key={paragraph}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>

        <div className="space-y-4 lg:sticky lg:top-24">
          <motion.blockquote
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="rounded-2xl border border-white/8 bg-[#111114] p-6 text-sm leading-7 text-white/80"
          >
            <p className="font-mono text-xs tracking-[0.22em] text-violet-300 uppercase">Highlights</p>
            <p className="mt-3 text-lg text-white/90">
              Focused on building practical solutions that solve real-world problems.
            </p>
          </motion.blockquote>

          <div className="grid grid-cols-3 gap-3">
            {aboutStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.08 * index }}
                className="rounded-2xl border border-violet-400/15 bg-[#111114] p-4 transition-colors hover:border-violet-300/60"
              >
                <p className="text-2xl font-semibold text-violet-100 md:text-4xl">{stat.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-violet-200/70">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionFrame>
  );
}
