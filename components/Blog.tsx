"use client";

import { motion } from "framer-motion";
import SectionFrame from "./SectionFrame";
import { blogPosts } from "./portfolioData";

// Rotate accent hover borders through violet / magenta / mint
const hoverBorders = [
  "hover:border-[#a78bfa]/70",
  "hover:border-[#e879f9]/70",
  "hover:border-[#34d399]/70",
] as const;

export default function Blog() {
  return (
    <SectionFrame
      id="blog"
      eyebrow="BLOG"
      title="Blog"
      description="Short teaser cards for future long-form write-ups and project notes."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {blogPosts.map((post, index) => (
          <motion.article
            key={post.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: index * 0.06 }}
            whileHover={{ y: -4 }}
            data-cursor-label="Read"
            className={`rounded-2xl border border-white/8 bg-[#111114] p-6 transition-colors duration-300 ${hoverBorders[index]}`}
          >
            <p className="text-2xl" aria-hidden="true">{post.emoji}</p>
            <h3 className="mt-4 text-lg font-semibold text-white md:text-xl">{post.title}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-[11px] tracking-wide text-white/65"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm leading-7 text-white/65">{post.excerpt}</p>
          </motion.article>
        ))}
      </div>
    </SectionFrame>
  );
}
