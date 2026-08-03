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
        <div className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#111114] p-7 md:p-9">
          <div>
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#34d399]/30 bg-[#34d399]/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-[#34d399]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#34d399]" />
              AVAILABLE FOR NEW OPPORTUNITIES
            </div>

            {/* Headline with larger typography */}
            <h3 className="mt-6 text-2xl font-extrabold leading-tight text-white sm:text-3xl lg:text-4xl">
              Let's build something <span className="gradient-text">meaningful</span> together.
            </h3>

            {/* Sub-description with larger font */}
            <p className="mt-5 text-base leading-relaxed text-white/80 sm:text-lg">
              Have an interesting idea, collaboration opportunity, internship, or AI automation project in mind? I'd love to connect and bring it to life.
            </p>

            {/* Structured Info Grid */}
            <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
              <div className="flex items-center gap-3 text-sm text-white/80 sm:text-base">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 text-[#a78bfa]">⚡</span>
                <span><b>Fast Response:</b> Usually within 24 hours</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/80 sm:text-base">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 text-[#34d399]">💼</span>
                <span><b>Focus:</b> AI Agents, Workflows & Full-Stack Apps</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/80 sm:text-base">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 text-[#e879f9]">📍</span>
                <span><b>Location:</b> Thrissur, Kerala, India (Remote / Hybrid)</span>
              </div>
            </div>
          </div>

          {/* Direct Email Action Button */}
          <div className="mt-10">
            <a
              id="say-hello-btn"
              href="https://mail.google.com/mail/?view=cm&fs=1&to=v74641001@gmail.com&su=Hello%20Vishnupriya"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-base font-bold text-black transition hover:bg-white/90"
            >
              <Mail size={18} />
              Say Hello &nbsp;&rarr;
            </a>
          </div>
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
                  <p className="text-sm font-mono tracking-[0.22em] text-white/45 uppercase">{item.label}</p>
                  <p className="mt-2 text-base font-medium text-white md:text-lg">{item.value}</p>
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
