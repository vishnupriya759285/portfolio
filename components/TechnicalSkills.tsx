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
      {/* 4×2 equal-height grid for the 8 skill categories */}
      <div className="grid auto-rows-fr grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
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
              className={`flex h-full min-h-[12rem] flex-col rounded-2xl border bg-[#111114] p-5 transition-colors duration-300 ${accent.border} ${accent.hover}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl border border-white/8 bg-white/5 ${accent.icon}`}
                >
                  <Icon size={18} />
                </div>
                <h3 className="text-base font-semibold text-white md:text-lg">{category.title}</h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] tracking-wide text-white/70"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.article>
          );
        })}

        {/* Full-width Tools row */}
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.35 }}
          whileHover={{ y: -4 }}
          className="col-span-1 flex min-h-[9rem] flex-col rounded-2xl border border-[#a78bfa]/20 bg-[#111114] p-5 transition-colors duration-300 hover:border-[#a78bfa]/70 md:col-span-2 xl:col-span-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl border border-white/8 bg-white/5 text-[#a78bfa]">
              <Wrench size={18} />
            </div>
            <h3 className="text-base font-semibold text-white md:text-lg">Tools</h3>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {tools.map((tool) => (
              <span
                key={tool}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-2 text-[11px] tracking-wide text-white/70"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#a78bfa]" />
                {tool}
              </span>
            ))}
          </div>
        </motion.article>
      </div>
    </SectionFrame>
  );
}
