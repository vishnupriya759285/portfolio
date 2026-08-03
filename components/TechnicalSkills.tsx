"use client";

import { motion } from "framer-motion";
import {
  Bot,
  Code2,
  Palette,
  ServerCog,
  Database,
  BrainCircuit,
  ScanSearch,
  ShoppingCart,
  Wrench,
} from "lucide-react";
import SectionFrame from "./SectionFrame";
import { skillCategories, tools } from "./portfolioData";

// Accent rotation: violet → magenta → mint → violet → magenta → mint → violet → magenta
// Using raw hex values because the custom Tailwind palette has flat (non-shade) colors.
const accents = [
  { border: "border-[#a78bfa]/20", hover: "hover:border-[#a78bfa]/70", icon: "text-[#a78bfa]" }, // violet
  { border: "border-[#e879f9]/20", hover: "hover:border-[#e879f9]/70", icon: "text-[#e879f9]" }, // magenta
  { border: "border-[#34d399]/20", hover: "hover:border-[#34d399]/70", icon: "text-[#34d399]" }, // mint
  { border: "border-[#a78bfa]/20", hover: "hover:border-[#a78bfa]/70", icon: "text-[#a78bfa]" }, // violet
  { border: "border-[#e879f9]/20", hover: "hover:border-[#e879f9]/70", icon: "text-[#e879f9]" }, // magenta
  { border: "border-[#34d399]/20", hover: "hover:border-[#34d399]/70", icon: "text-[#34d399]" }, // mint
  { border: "border-[#a78bfa]/20", hover: "hover:border-[#a78bfa]/70", icon: "text-[#a78bfa]" }, // violet
  { border: "border-[#e879f9]/20", hover: "hover:border-[#e879f9]/70", icon: "text-[#e879f9]" }, // magenta
] as const;

// Semantically correct icons per category (no duplicates within the grid)
const icons = [Bot, Code2, Palette, ServerCog, Database, BrainCircuit, ScanSearch, ShoppingCart];

export default function TechnicalSkills() {
  return (
    <SectionFrame
      id="skills"
      eyebrow="TECHNICAL SKILLS"
      title="Technical Skills"
      description="A symmetrical bento grid built to keep every category card the same visual weight, with tools collected into a single full-width row."
    >
      <div className="space-y-4">
        {/* 4×2 equal-height grid for the 8 skill categories */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {skillCategories.map((category, index) => {
            const Icon = icons[index];
            const accent = accents[index];
            return (
              <motion.article
                key={category.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: index * 0.04 }}
                whileHover={{ y: -4 }}
                className={`flex flex-col justify-between rounded-2xl border bg-[#111114] p-5 transition-colors duration-300 ${accent.border} ${accent.hover}`}
              >
                <div>
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/5 ${accent.icon}`}
                    >
                      <Icon size={22} />
                    </div>
                    <h3 className="text-xl font-extrabold text-white md:text-2xl">{category.title}</h3>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 md:gap-2.5">
                    {category.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-xl border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-bold tracking-wide text-white transition hover:border-white/35 md:text-base"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Compact, ultra-sleek Tools strip */}
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.35 }}
          whileHover={{ y: -2 }}
          className="rounded-2xl border border-[#a78bfa]/25 bg-[#111114] p-4 md:p-5 transition-colors duration-300 hover:border-[#a78bfa]/70"
        >
          <div className="flex flex-col gap-3.5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/12 bg-white/5 text-[#a78bfa]">
                <Wrench size={20} />
              </div>
              <h3 className="text-xl font-extrabold text-white md:text-2xl">Tools</h3>
            </div>
            <div className="flex flex-wrap items-center gap-2 md:gap-2.5">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-bold tracking-wide text-white transition hover:border-white/35 md:text-base"
                >
                  <span className="h-2 w-2 rounded-full bg-[#a78bfa]" />
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </motion.article>
      </div>
    </SectionFrame>
  );
}
