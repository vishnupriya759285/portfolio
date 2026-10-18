"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Code2, Github, Radio } from "lucide-react";
import type { FeaturedProject } from "@/lib/github";
import SectionFrame from "./SectionFrame";
import { profileLinks } from "./portfolioData";

const hoverBorders = [
  "hover:border-[#a78bfa]/70",
  "hover:border-[#e879f9]/70",
  "hover:border-[#34d399]/70",
] as const;

type ProjectsProps = {
  projects: FeaturedProject[];
};

export default function Projects({ projects }: ProjectsProps) {
  return (
    <SectionFrame
      id="projects"
      eyebrow="LIVE GITHUB PROJECTS"
      title="Featured Projects"
    >
      {projects.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.sourceUrl}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: index * 0.06 }}
              whileHover={{ y: -4 }}
              data-cursor-label="View"
              className={`group flex min-h-[290px] flex-col rounded-2xl border border-white/8 bg-[#111114] p-6 transition-colors duration-300 ${hoverBorders[index % hoverBorders.length]}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border border-white/8 bg-white/5 text-[#a78bfa] transition group-hover:border-[#a78bfa]/40 group-hover:text-[#c4b5fd]">
                  <Code2 size={18} aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white md:text-2xl">{project.title}</h3>
                  {project.language ? (
                    <span className="mt-2 inline-flex rounded-full border border-[#34d399]/20 bg-[#34d399]/5 px-3 py-1 text-xs font-medium tracking-wide text-[#6ee7b7]">
                      {project.language}
                    </span>
                  ) : null}
                </div>
              </div>

              <p className="mt-5 text-base leading-8 text-white/65">{project.description}</p>

              <div className="mt-auto flex flex-wrap gap-3 pt-6 text-sm font-semibold">
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white transition hover:text-[#c4b5fd]"
                >
                  <Github size={16} aria-hidden="true" />
                  Source code
                </a>
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#6ee7b7] transition hover:text-[#a7f3d0]"
                  >
                    <ArrowUpRight size={16} aria-hidden="true" />
                    Live demo
                  </a>
                ) : null}
              </div>
            </motion.article>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-white/8 bg-[#111114] p-8 text-center">
          <Radio className="mx-auto text-[#a78bfa]" size={28} aria-hidden="true" />
          <p className="mt-4 text-lg font-semibold text-white">Projects are syncing from GitHub.</p>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-7 text-white/65">
            New public repositories appear here once their README has a clear title and project summary.
          </p>
          <a
            href={profileLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#c4b5fd] transition hover:text-white"
          >
            <Github size={16} aria-hidden="true" />
            View GitHub profile
          </a>
        </div>
      )}
    </SectionFrame>
  );
}
