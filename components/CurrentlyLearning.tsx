"use client";

import { motion } from "framer-motion";
import SectionFrame from "./SectionFrame";
import { learningTopics } from "./portfolioData";

export default function CurrentlyLearning() {
  return (
    <SectionFrame
      id="learning"
      eyebrow="CURRENTLY LEARNING"
      title="Currently Learning"
      description="Small, in-progress topics I am actively exploring right now."
    >
      <div className="rounded-2xl border border-white/8 bg-[#111114] p-5 md:p-6">
        <div className="flex flex-wrap gap-2">
          {learningTopics.map((topic, index) => (
            <motion.span
              key={topic}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-2 text-sm text-white/75"
            >
              {/* Pulsing green dot = "in progress" indicator */}
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#34d399]" />
              {topic}
            </motion.span>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
