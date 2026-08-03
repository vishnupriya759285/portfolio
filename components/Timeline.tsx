"use client";

import { motion } from "framer-motion";

interface TimelineItem {
  title?: string;
  role?: string;
  org?: string;
  dates?: string;
  year?: string;
  description: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative pl-6 md:pl-8">
      <div className="absolute left-1.5 top-2 h-[calc(100%-0.5rem)] w-px bg-gradient-to-b from-violet-400 via-magenta-400 to-mint-400" />
      <div className="space-y-8 md:space-y-10">
        {items.map((item, index) => (
          <motion.article
            key={`${item.title}-${item.dates}`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            className="relative rounded-2xl border border-white/8 bg-[#111114] p-5 md:p-6"
          >
            <div className="absolute -left-[0.95rem] top-6 h-4 w-4 rounded-full border border-violet-300 bg-ink shadow-[0_0_0_4px_rgba(167,139,250,0.12)]" />
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="font-mono text-[11px] tracking-[0.24em] text-mint uppercase">{item.dates ?? item.year}</p>
                <h3 className="mt-2 text-lg font-semibold text-white md:text-xl">{item.title ?? item.role}</h3>
                {item.org ? <p className="mt-1 text-sm text-violet-200/90">{item.org}</p> : null}
              </div>
            </div>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70">{item.description}</p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
