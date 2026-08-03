"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionFrameProps {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export default function SectionFrame({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "",
  contentClassName = "",
}: SectionFrameProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`scroll-mt-24 border-t border-white/5 px-6 py-16 md:px-10 md:py-24 ${className}`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-3xl">
          {eyebrow ? (
            <p className="mb-3 font-mono text-xs tracking-[0.28em] text-violet-300/80 uppercase">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-3xl font-semibold tracking-tight text-white md:text-5xl">{title}</h2>
          {description ? <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70 md:text-base">{description}</p> : null}
        </div>
        <div className={contentClassName}>{children}</div>
      </div>
    </motion.section>
  );
}
