"use client";

import { motion } from "framer-motion";
import {
  Award,
  BadgeCheck,
  BusFront,
  BrainCircuit,
  GraduationCap,
  Medal,
  ShieldAlert,
  UsersRound,
  ScanSearch,
} from "lucide-react";
import SectionFrame from "./SectionFrame";
import { projects } from "./portfolioData";

const cardIcons = [BusFront, ShieldAlert, GraduationCap, BrainCircuit, UsersRound, ScanSearch];
const badgeIcons = [null, Award, BadgeCheck, null, Medal, null] as const;

// Rotate through violet / magenta / mint using literal hex (flat custom color, no shade scale in Tailwind config).
const hoverBorders = [
  "hover:border-[#a78bfa]/70",  // violet
  "hover:border-[#e879f9]/70",  // magenta
  "hover:border-[#34d399]/70",  // mint
  "hover:border-[#a78bfa]/70",  // violet
  "hover:border-[#e879f9]/70",  // magenta
  "hover:border-[#34d399]/70",  // mint
] as const;

export default function Projects() {
  return (
    <SectionFrame
      id="projects"
      eyebrow="FEATURED PROJECTS"
      title="Featured Projects"
      description="Selected work across AI, full-stack development, mobile applications, computer vision, and academic technology."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => {
          const Icon = cardIcons[index];
          const BadgeIcon = badgeIcons[index];

          return (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
              whileHover={{ y: -4 }}
              data-cursor-label="View"
              className={`group rounded-2xl border border-white/8 bg-[#111114] p-6 transition-colors duration-300 ${hoverBorders[index]}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border border-white/8 bg-white/5 text-[#a78bfa] transition group-hover:border-[#a78bfa]/40 group-hover:text-[#c4b5fd]">
                    <Icon size={18} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white md:text-xl">{project.title}</h3>
                    {project.achievement ? (
                      <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-[#a78bfa]/20 bg-[#a78bfa]/5 px-3 py-1 text-[11px] font-medium tracking-wide text-[#c4b5fd]/80">
                        {BadgeIcon ? <BadgeIcon size={12} className="text-[#a78bfa]" /> : null}
                        {project.achievement}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] tracking-wide text-white/70"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <p className="mt-5 text-sm leading-7 text-white/65">{project.description}</p>
            </motion.article>
          );
        })}
      </div>
    </SectionFrame>
  );
}
