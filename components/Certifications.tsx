"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  Bot,
  BrainCircuit,
  Cloud,
  Code2,
  ClipboardList,
  Database,
  Monitor,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import SectionFrame from "./SectionFrame";
import { certifications } from "./portfolioData";

const iconByIndex = [Cloud, Bot, BrainCircuit, Sparkles, BadgeCheck, Code2, Monitor, Database, ClipboardList, ShieldCheck];

const categoryOrder = [
  "Cloud",
  "AI & Automation",
  "Development",
  "Database",
  "Professional Skills",
  "Problem Solving",
] as const;

export default function Certifications() {
  return (
    <SectionFrame
      id="certifications"
      eyebrow="CERTIFICATIONS"
      title="Certifications"
      description="Certification cards grouped loosely by category."
    >
      <div className="space-y-8">
        {categoryOrder.map((category) => {
          const categoryItems = certifications.filter((item) => item.group === category);
          if (!categoryItems.length) {
            return null;
          }

          return (
            <div key={category}>
              <p className="mb-4 font-mono text-sm tracking-[0.24em] text-[#a78bfa] uppercase">{category}</p>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {categoryItems.map((item) => {
                  const index = certifications.findIndex((cert) => cert.title === item.title);
                  const Icon = iconByIndex[index];
                  return (
                    <motion.article
                      key={item.title}
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{ duration: 0.5, delay: index * 0.04 }}
                      whileHover={{ y: -4 }}
                      className="rounded-2xl border border-white/8 bg-[#111114] p-5 transition-colors duration-300 hover:border-[#a78bfa]/50"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl border border-white/8 bg-white/5 text-[#a78bfa]">
                          <Icon size={18} />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-lg font-semibold text-white md:text-xl">{item.title}</h3>
                          <p className="mt-2 text-base text-white/65">{item.issuer}</p>
                          <span className="mt-3 inline-flex rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs tracking-wide text-white/65">
                            {item.status}
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </SectionFrame>
  );
}
