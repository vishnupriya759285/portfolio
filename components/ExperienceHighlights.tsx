"use client";

import { motion } from "framer-motion";
import { Award, Briefcase, Cloud, Database, GraduationCap, Medal, Trophy, UsersRound } from "lucide-react";
import SectionFrame from "./SectionFrame";
import { experienceHighlights } from "./portfolioData";

const icons = [Briefcase, UsersRound, GraduationCap, Award, Trophy, Medal, Cloud, Database];

// Rotate through violet / magenta using literal hex values (flat custom colors, no shade scale).
const hoverBorders = [
  "hover:border-[#a78bfa]/70",  // violet
  "hover:border-[#e879f9]/70",  // magenta
  "hover:border-[#a78bfa]/70",
  "hover:border-[#e879f9]/70",
  "hover:border-[#a78bfa]/70",
  "hover:border-[#e879f9]/70",
  "hover:border-[#a78bfa]/70",
  "hover:border-[#e879f9]/70",
] as const;

export default function ExperienceHighlights() {
  return (
    <SectionFrame
      id="experience"
      eyebrow="EXPERIENCE HIGHLIGHTS"
      title="Experience Highlights"
      description="A compact stat row that surfaces the most important numbers, awards, and certifications at a glance."
    >
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {experienceHighlights.map((item, index) => {
          const Icon = icons[index];
          return (
            <motion.article
              key={item.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className={`rounded-2xl border border-white/8 bg-[#111114] p-5 transition-colors duration-300 ${hoverBorders[index]}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-2xl font-semibold tracking-tight text-white md:text-3xl">{item.value}</p>
                  <h3 className="mt-3 text-sm font-semibold text-white md:text-base">{item.label}</h3>
                  <p className="mt-2 text-xs leading-6 text-white/55">{item.caption}</p>
                </div>
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl border border-white/8 bg-white/5 text-[#a78bfa]">
                  <Icon size={18} />
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </SectionFrame>
  );
}
