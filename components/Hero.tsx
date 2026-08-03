"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight, ArrowRight } from "lucide-react";

const NAME = "Vishnupriya M V";

/**
 * TUNE THIS AGAINST YOUR OWN VIDEO.
 * This is the ONLY place you need to touch to sync typing speed to your clip.
 *
 * MS_PER_CHAR: base delay between characters, in milliseconds.
 *   - Watch your keyboard video and count roughly how many keystrokes happen
 *     per second in the clip you want to sync to (e.g. a fast typist hits
 *     ~6-8 keys/sec -> ~130-160ms/char; a deliberate, cinematic pace is
 *     often slower, ~180-260ms/char, which reads better on camera).
 *   - Set MS_PER_CHAR to 1000 / (keys per second) from your clip.
 * JITTER: +/- randomness added per character so it doesn't feel robotic.
 * START_DELAY: how long to wait after mount/video start before typing begins,
 *   so the first keystroke in the video lines up with the first typed letter.
 */
const MS_PER_CHAR = 145;
const JITTER = 45;
const START_DELAY = 600;
const CURSOR_LINGER_MS = 1400; // how long the cursor blinks alone after typing finishes

export default function Hero() {
  const [typed, setTyped] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let cancelled = false;
    let i = 0;

    const startTimeout = setTimeout(() => {
      // Try to (re)start the video right as typing begins, for tighter sync.
      videoRef.current?.play().catch(() => {});

      const typeNext = () => {
        if (cancelled) return;
        i += 1;
        setTyped(NAME.slice(0, i));
        if (i < NAME.length) {
          const delay = MS_PER_CHAR + (Math.random() * JITTER * 2 - JITTER);
          setTimeout(typeNext, Math.max(40, delay));
        } else {
          setTimeout(() => {
            if (!cancelled) setTypingDone(true);
          }, CURSOR_LINGER_MS);
        }
      };

      typeNext();
    }, START_DELAY);

    return () => {
      cancelled = true;
      clearTimeout(startTimeout);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-ink">
      {/* Cinematic looping video background */}
      <video
        ref={videoRef}
        className="hero-video absolute inset-0 h-full w-full object-cover"
        src="/videos/keyboard-hero.mp4" /* re-lit: bloom + brightness/contrast/saturation boost applied */
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      />
      {/* Dark gradient scrim for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />

      {/* Nav — visible immediately, no gating */}
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 flex items-center justify-between px-6 py-6 md:px-12"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/30 bg-white/5 text-base font-extrabold text-white">
          V
        </div>
        <ul className="hidden items-center gap-10 text-sm font-bold tracking-widest text-white/90 md:flex lg:text-base">
          {["HOME", "ABOUT", "PROJECTS", "SKILLS", "EXPERIENCE", "CONTACT"].map(
            (item) => (
              <li key={item} className="cursor-pointer transition hover:text-[#34d399]">
                <a href={`#${item.toLowerCase()}`}>{item}</a>
              </li>
            )
          )}
        </ul>
        <a
          href="#contact"
          className="rounded-full bg-white px-6 py-2.5 text-sm font-extrabold text-black transition hover:bg-white/90 md:text-base"
        >
          LET'S CONNECT
        </a>
      </motion.nav>

      {/* Hero content */}
      <div className="relative z-20 mx-auto flex min-h-[80vh] max-w-7xl flex-col justify-center px-6 md:px-10">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-4 text-sm font-semibold tracking-[0.25em] text-[#a78bfa] md:text-base"
        >
          AI AUTOMATION ENGINEER
        </motion.span>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-3xl font-medium text-white/85 sm:text-4xl md:text-5xl"
        >
          Hi, I'm
        </motion.p>

        {/* Typewriter name — the ONLY animated-per-character element */}
        <h1 className="gradient-text mt-2 text-6xl font-extrabold leading-tight sm:text-7xl md:text-8xl lg:text-9xl">
          {typed}
          <span
            className="typewriter-cursor h-[0.85em] align-middle"
            style={{ opacity: typingDone ? 0 : undefined }}
            aria-hidden="true"
          />
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="mt-5 font-mono text-base text-[#34d399] md:text-xl"
        >
          &gt; ai_automation_engineer.exe <span className="animate-pulse">|</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mt-10"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-bold text-black transition hover:gap-4 hover:bg-white/90 md:text-lg"
          >
            EXPLORE MY WORK
            <ArrowRight size={20} className="transition group-hover:translate-x-1" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.7 }}
          className="mt-14 flex flex-col gap-3"
        >
          <span className="text-xs font-semibold tracking-[0.2em] text-white/50 md:text-sm">
            SPECIALIZING IN
          </span>
          <ul className="flex flex-col gap-2.5 text-base text-white/85 md:text-lg">
            <li className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#a78bfa]" />
              AI Automation
            </li>
            <li className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#34d399]" />
              Full-Stack Development
            </li>
          </ul>
        </motion.div>
      </div>

      {/* Right-side tagline */}
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="absolute right-10 top-24 z-20 hidden max-w-[340px] text-right text-lg font-medium leading-snug text-white/90 lg:block xl:text-xl"
      >
        Building Intelligent Automations. Designing Impact. Creating the{" "}
        <span className="font-bold text-[#a78bfa]">Future</span>.
      </motion.div>

      {/* Availability highlight box for recruiters */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute right-10 top-52 z-20 hidden items-center gap-3 rounded-2xl border border-[#34d399]/40 bg-[#34d399]/15 px-5 py-3 shadow-lg shadow-[#34d399]/10 backdrop-blur-md lg:flex"
      >
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#34d399] opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-[#34d399]" />
        </span>
        <span className="text-sm font-extrabold tracking-wider text-[#34d399]">
          AVAILABLE FOR WORK
        </span>
      </motion.div>

      {/* Bottom bar: scroll indicator + social links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.8 }}
        className="absolute bottom-6 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-10"
      >
        <div />
        <div className="flex flex-col items-center gap-1 text-[11px] font-bold tracking-[0.2em] text-white/60">
          <div className="h-6 w-px animate-pulse bg-white/50" />
          SCROLL DOWN
        </div>
        <div className="flex items-center gap-4">
          <span className="mr-2 hidden text-xs font-bold tracking-[0.22em] text-white/70 sm:inline">
            CONNECT WITH ME
          </span>
          {[
            { Icon: Github, href: "https://github.com/vishnupriya759285", target: "_blank" },
            { Icon: Linkedin, href: "https://linkedin.com/in/vishnupriya-m-v", target: "_blank" },
            { Icon: Mail, href: "https://mail.google.com/mail/?view=cm&fs=1&to=v74641001@gmail.com", target: "_blank" },
            { Icon: ArrowUpRight, href: "/resume.pdf", target: "_blank" },
          ].map(({ Icon, href, target }, idx) => (
            <a
              key={idx}
              href={href}
              target={target}
              rel={target ? "noreferrer" : undefined}
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white/30 bg-white/5 text-white/90 transition hover:scale-110 hover:border-white hover:bg-white/10 hover:text-white md:h-12 md:w-12"
            >
              <Icon size={22} />
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
