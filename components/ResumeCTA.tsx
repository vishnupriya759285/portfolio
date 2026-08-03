"use client";

import { ArrowDownToLine } from "lucide-react";
import SectionFrame from "./SectionFrame";

export default function ResumeCTA() {
  return (
    <SectionFrame
      id="resume"
      eyebrow="RESUME"
      title="The Highlights Reel 💫"
      description="A quick look at what I've been building, skills I've picked up, and projects I'm proud of. Check it out or grab the PDF version below!"
    >
      <div className="rounded-3xl border border-white/8 bg-[#111114] p-6 md:flex md:items-center md:justify-between md:p-8">
        <div className="max-w-2xl">
          <p className="font-mono text-xs tracking-[0.24em] text-[#a78bfa] uppercase">The Highlights Reel 💫</p>
          <p className="mt-3 text-sm leading-7 text-white/75 md:text-base">
            A quick look at what I&apos;ve been building, skills I&apos;ve picked up, and projects I&apos;m proud of. Check it out or grab the PDF version below!
          </p>
        </div>
        <a
          id="download-resume-btn"
          href="/resume.pdf"
          download
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90 md:mt-0"
        >
          <ArrowDownToLine size={16} />
          Download Resume
        </a>
      </div>
    </SectionFrame>
  );
}
