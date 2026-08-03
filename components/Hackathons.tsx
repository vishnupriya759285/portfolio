"use client";

import { motion } from "framer-motion";
import { Award, BadgeCheck, Rocket, Trophy, Medal } from "lucide-react";
import SectionFrame from "./SectionFrame";
import { hackathons } from "./portfolioData";

const icons = [Trophy, Award, Medal, Rocket, BadgeCheck];

// Rotate accents: trophy=violet, award=magenta, medal=mint, rocket=violet, badge=magenta
const hoverBorders = [
  "hover:border-[#a78bfa]/70",
  "hover:border-[#e879f9]/70",
  "hover:border-[#34d399]/70",
  "hover:border-[#a78bfa]/70",
  "hover:border-[#e879f9]/70",
] as const;

const iconColors = [
  "text-[#a78bfa]",
  "text-[#e879f9]",
  "text-[#34d399]",
  "text-[#a78bfa]",
  "text-[#e879f9]",
] as const;

export default function Hackathons() {
  return (
    <SectionFrame
      id="hackathons"
      eyebrow="HACKATHONS & ACHIEVEMENTS"
      title="Hackathons & Achievements"
      description="A shorter card set that surfaces the outcomes and competitive milestones behind the portfolio."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {hackathons.map((item, index) => {
          const Icon = icons[index];
          return (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className={`rounded-2xl border border-white/8 bg-[#111114] p-6 transition-colors duration-300 ${hoverBorders[index]}`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border border-white/8 bg-white/5 ${iconColors[index]}`}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white md:text-xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/65">{item.description}</p>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </SectionFrame>
  );
}
