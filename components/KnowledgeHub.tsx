"use client";

import { motion } from "framer-motion";
import SectionFrame from "./SectionFrame";
import { knowledgeTopics } from "./portfolioData";

export default function KnowledgeHub() {
  return (
    <SectionFrame
      id="knowledge"
      eyebrow="KNOWLEDGE HUB"
      title="Knowledge Hub"
      description="Technical topics and project learnings covering:"
    >
      <div className="rounded-2xl border border-white/8 bg-[#111114] p-5 md:p-6">
        <div className="flex flex-wrap gap-2">
          {knowledgeTopics.map((topic, index) => (
            <motion.span
              key={topic}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.04 }}
              className="rounded-full border border-white/10 bg-black/25 px-3 py-2 text-sm text-white/75"
            >
              {topic}
            </motion.span>
          ))}
        </div>
      </div>
    </SectionFrame>
  );
}
