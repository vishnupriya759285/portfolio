"use client";

import { Github, Mail, MapPin, Linkedin, FileDown } from "lucide-react";
import SectionFrame from "./SectionFrame";
import { contactItems } from "./portfolioData";

const icons = [Mail, Linkedin, Github, MapPin, FileDown];

export default function Contact() {
  return (
    <SectionFrame
      id="contact"
      eyebrow="CONTACT"
      title="Contact"
      description="Let's build something meaningful together. Have an interesting idea, collaboration opportunity, internship opportunity, or project in mind?"
    >
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/8 bg-[#111114] p-6 md:p-7">
          <p className="text-lg leading-8 text-white/85">
            Let's build something meaningful together.
          </p>
          <p className="mt-4 max-w-xl text-sm leading-7 text-white/65 md:text-base">
            Have an interesting idea, collaboration opportunity, internship opportunity, or project in mind?
          </p>
        </div>

        <div className="space-y-3">
          {contactItems.map((item, index) => {
            const Icon = icons[index];
            const row = (
              <div className="flex items-start gap-4 rounded-2xl border border-white/8 bg-[#111114] p-5 transition hover:border-white/15">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/8 bg-white/5 text-violet-200">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-xs font-mono tracking-[0.22em] text-white/45 uppercase">{item.label}</p>
                  <p className="mt-2 text-sm font-medium text-white md:text-base">{item.value}</p>
                </div>
              </div>
            );

            if (!item.href) {
              return <div key={item.label}>{row}</div>;
            }

            return (
              <a key={item.label} href={item.href} className="block" download={item.href === "/resume.pdf" ? true : undefined} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noreferrer" : undefined}>
                {row}
              </a>
            );
          })}
        </div>
      </div>
    </SectionFrame>
  );
}
