"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ───────────────────────────────────────────────────────────
   Design System Palette
   ─────────────────────────────────────────────────────────── */
const PALETTE = [
  "#a78bfa", // violet
  "#e879f9", // magenta
  "#34d399", // mint
  "#38bdf8", // cyan
  "#ffffff", // white
];

/* ───────────────────────────────────────────────────────────
   MICRO-PARTICLE GENERATOR
   Creates a dense field of tiny crystal specks & glitter
   ─────────────────────────────────────────────────────────── */
interface MicroParticle {
  id: number;
  size: number;
  left: number; // 0 - 100%
  top: number;  // 0 - 100%
  color: string;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
  pulseDur: number;
  isDiamond: boolean;
}

function generateMicroParticles(count: number): MicroParticle[] {
  return Array.from({ length: count }, (_, i) => {
    const isDiamond = i % 5 === 0;
    return {
      id: i,
      size: isDiamond ? Math.random() * 3 + 2.5 : Math.random() * 2 + 1,
      left: Math.random() * 98,
      top: Math.random() * 95,
      color: PALETTE[i % PALETTE.length],
      duration: Math.random() * 12 + 14,
      delay: Math.random() * 6,
      driftX: (Math.random() - 0.5) * 70,
      driftY: -(Math.random() * 100 + 40),
      pulseDur: Math.random() * 2.5 + 1.5,
      isDiamond,
    };
  });
}

/* ───────────────────────────────────────────────────────────
   MEDIUM FLOATING CRYSTAL SHARDS (Subtle, non-distracting)
   ─────────────────────────────────────────────────────────── */
const CRYSTAL_SHARDS = [
  { id: 1, size: 45, left: "8%", top: "15%", color: "#38bdf8", moveX: [0, 30, -20, 0], moveY: [0, -40, 20, 0], rot: [0, 45, 90, 0], dur: 22 },
  { id: 2, size: 55, left: "82%", top: "12%", color: "#a78bfa", moveX: [0, -35, 20, 0], moveY: [0, -35, 15, 0], rot: [0, -60, -120, 0], dur: 26 },
  { id: 3, size: 40, left: "88%", top: "45%", color: "#e879f9", moveX: [0, -25, 30, 0], moveY: [0, -45, 25, 0], rot: [0, 90, 180, 0], dur: 24 },
  { id: 4, size: 50, left: "12%", top: "65%", color: "#34d399", moveX: [0, 40, -15, 0], moveY: [0, -30, 30, 0], rot: [0, -45, 45, 0], dur: 20 },
  { id: 5, size: 60, left: "75%", top: "78%", color: "#38bdf8", moveX: [0, -40, 25, 0], moveY: [0, -50, 20, 0], rot: [0, 60, 120, 0], dur: 28 },
  { id: 6, size: 35, left: "45%", top: "85%", color: "#a78bfa", moveX: [0, 25, -30, 0], moveY: [0, -35, 15, 0], rot: [0, 120, 240, 0], dur: 19 },
];

/* ───────────────────────────────────────────────────────────
   BACKGROUND BOKEH ORBS
   ─────────────────────────────────────────────────────────── */
const BOKEH = [
  { id: 1, size: 180, left: "15%", top: "20%", color: "#38bdf8", dur: 22 },
  { id: 2, size: 150, left: "75%", top: "25%", color: "#a78bfa", dur: 26 },
  { id: 3, size: 200, left: "80%", top: "60%", color: "#e879f9", dur: 24 },
  { id: 4, size: 160, left: "10%", top: "70%", color: "#34d399", dur: 20 },
];

export default function GlassShards() {
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(800);

  // Generate 80 micro particles deterministically
  const microParticles = useMemo(() => generateMicroParticles(80), []);

  useEffect(() => {
    setVh(window.innerHeight);
    const onResize = () => setVh(window.innerHeight);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Fades in when scrolling past Hero
  const opacity = useTransform(scrollY, [vh * 0.25, vh * 0.75], [0, 1]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ opacity, zIndex: 5 }}
      aria-hidden="true"
    >
      {/* ── 1. Soft Background Bokeh Glows ── */}
      {BOKEH.map((b) => (
        <motion.div
          key={`bokeh-${b.id}`}
          className="absolute rounded-full will-change-transform"
          style={{
            width: b.size,
            height: b.size,
            left: b.left,
            top: b.top,
            background: `radial-gradient(circle, ${b.color}15 0%, transparent 70%)`,
            filter: "blur(40px)",
          }}
          animate={{
            scale: [1, 1.25, 0.9, 1],
            x: [0, 30, -20, 0],
            y: [0, -30, 20, 0],
          }}
          transition={{
            duration: b.dur,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* ── 2. Dense Micro-Particle Field (Tiny Glowing Specks & Glitter) ── */}
      {microParticles.map((p) => (
        <motion.div
          key={`micro-${p.id}`}
          className="absolute will-change-transform"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            x: [0, p.driftX, p.driftX * 0.5, 0],
            y: [0, p.driftY, p.driftY * 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        >
          {p.isDiamond ? (
            /* Miniature Diamond Shape */
            <motion.div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: p.color,
                transform: "rotate(45deg)",
                boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
              }}
              animate={{
                opacity: [0.3, 1, 0.4, 0.9, 0.3],
                scale: [0.8, 1.3, 0.9, 1.2, 0.8],
              }}
              transition={{
                duration: p.pulseDur,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay,
              }}
            />
          ) : (
            /* Tiny Glowing Speck */
            <motion.div
              className="w-full h-full rounded-full"
              style={{
                backgroundColor: p.color,
                boxShadow: `0 0 ${p.size * 2.5}px ${p.color}`,
              }}
              animate={{
                opacity: [0.2, 0.95, 0.3, 0.8, 0.2],
                scale: [0.7, 1.2, 0.8, 1.1, 0.7],
              }}
              transition={{
                duration: p.pulseDur,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay,
              }}
            />
          )}
        </motion.div>
      ))}

      {/* ── 3. Subtle Floating Crystal Shards ── */}
      {CRYSTAL_SHARDS.map((s) => (
        <motion.div
          key={`shard-${s.id}`}
          className="absolute will-change-transform"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size * 1.2,
          }}
          animate={{
            x: s.moveX,
            y: s.moveY,
            rotate: s.rot,
          }}
          transition={{
            duration: s.dur,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg
            width={s.size}
            height={s.size * 1.2}
            viewBox="0 0 40 50"
            className="overflow-visible"
          >
            <defs>
              <linearGradient id={`mGrad-${s.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity={0.6} />
                <stop offset="40%" stopColor={s.color} stopOpacity={0.3} />
                <stop offset="100%" stopColor="#0a0a0c" stopOpacity={0.5} />
              </linearGradient>
            </defs>

            {/* Crystal Shard Polygon */}
            <polygon
              points="20,2 38,18 20,48 2,18"
              fill={`url(#mGrad-${s.id})`}
              stroke={s.color}
              strokeOpacity={0.4}
              strokeWidth="0.8"
            />
            {/* Facet Line */}
            <line
              x1="20"
              y1="2"
              x2="20"
              y2="48"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="0.6"
            />
          </svg>
        </motion.div>
      ))}
    </motion.div>
  );
}
