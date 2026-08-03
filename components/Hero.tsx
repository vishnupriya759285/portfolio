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
        className="relative z-20 flex items-center justify-between px-6 py-5 md:px-10"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-sm font-medium">
          V
        </div>
        <ul className="hidden items-center gap-8 text-xs font-medium tracking-wide text-white/80 md:flex">
          {["HOME", "ABOUT", "PROJECTS", "SKILLS", "EXPERIENCE", "CONTACT"].map(
            (item) => (
              <li key={item} className="cursor-pointer transition hover:text-white">
                {item}
              </li>
            )
          )}
        </ul>
        <button className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition hover:bg-white/90">
          LET'S CONNECT
        </button>
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
          <button className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-bold text-black transition hover:gap-4 hover:bg-white/90 md:text-lg">
            EXPLORE MY WORK
            <ArrowRight size={20} className="transition group-hover:translate-x-1" />
          </button>
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
        className="absolute right-10 top-24 z-20 hidden max-w-[280px] text-right text-base leading-relaxed text-white/70 lg:block"
      >
        // Building Intelligent Automations. Designing Impact. Creating the{" "}
        <span className="text-[#a78bfa] font-medium">Future</span>.
      </motion.div>

      {/* Availability badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute right-10 top-52 z-20 hidden items-center gap-2 text-xs font-medium text-white/70 lg:flex"
      >
        <span className="h-2 w-2 animate-pulse rounded-full bg-mint" />
        AVAILABLE FOR WORK
      </motion.div>

      {/* Bottom bar: scroll indicator + social links */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.8 }}
        className="absolute bottom-6 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-10"
      >
        <div />
        <div className="flex flex-col items-center gap-1 text-[10px] tracking-[0.2em] text-white/50">
          <div className="h-6 w-px animate-pulse bg-white/40" />
          SCROLL DOWN
        </div>
        <div className="flex items-center gap-3">
          <span className="mr-2 hidden text-[10px] font-medium tracking-[0.2em] text-white/50 sm:inline">
            CONNECT WITH ME
          </span>
          {[Github, Linkedin, Mail, ArrowUpRight].map((Icon, idx) => (
            <a
              key={idx}
              href="#"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-white/50 hover:text-white"
            >
              <Icon size={14} />
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
