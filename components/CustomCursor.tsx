"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const DOT_SIZE = 8;
const RING_SIZE = 36;

export default function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [finePointer, setFinePointer] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hoverLabel, setHoverLabel] = useState<string | null>(null);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const rawRingX = useMotionValue(-100);
  const rawRingY = useMotionValue(-100);
  const springRingX = useSpring(rawRingX, { stiffness: 500, damping: 36, mass: 0.18 });
  const springRingY = useSpring(rawRingY, { stiffness: 500, damping: 36, mass: 0.18 });

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia("(pointer: fine)");
    const updatePointer = () => setFinePointer(media.matches);
    updatePointer();
    media.addEventListener("change", updatePointer);

    return () => media.removeEventListener("change", updatePointer);
  }, []);

  useEffect(() => {
    if (!mounted || !finePointer) {
      return;
    }

    const handleMove = (event: MouseEvent) => {
      const x = event.clientX;
      const y = event.clientY;
      dotX.set(x - DOT_SIZE / 2);
      dotY.set(y - DOT_SIZE / 2);
      if (reducedMotion) {
        rawRingX.set(x - RING_SIZE / 2);
        rawRingY.set(y - RING_SIZE / 2);
      } else {
        rawRingX.set(x - RING_SIZE / 2);
        rawRingY.set(y - RING_SIZE / 2);
      }
      setVisible(true);

      const hovered = document.elementFromPoint(x, y) as HTMLElement | null;
      const hoverTarget = hovered?.closest(
        "[data-cursor-label], a, button, [role='button'], input, textarea, select, summary, nav li"
      ) as HTMLElement | null;
      if (!hoverTarget) {
        setHoveringInteractive(false);
        setHoverLabel(null);
        return;
      }

      setHoveringInteractive(true);
      setHoverLabel(hoverTarget.getAttribute("data-cursor-label"));
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, [mounted, finePointer, reducedMotion, dotX, dotY, rawRingX, rawRingY]);

  if (!mounted || !finePointer) {
    return null;
  }

  const ringX = reducedMotion ? rawRingX : springRingX;
  const ringY = reducedMotion ? rawRingY : springRingY;
  const ringScale = hoverLabel ? 2.05 : hoveringInteractive ? 1.75 : 1;

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          html, body, a, button, [role="button"], input, textarea, select, summary, nav li {
            cursor: none !important;
          }
        }
      `}</style>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-white/90"
        style={{ x: dotX, y: dotY, width: DOT_SIZE, height: DOT_SIZE, opacity: visible && !hoveringInteractive ? 1 : 0 }}
        transition={{ duration: 0.12 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full border border-white/45 bg-transparent text-[10px] font-semibold tracking-[0.2em] text-white"
        style={{
          x: ringX,
          y: ringY,
          width: hoverLabel ? 72 : RING_SIZE,
          height: hoverLabel ? 32 : RING_SIZE,
          scale: ringScale,
          opacity: visible ? 1 : 0,
          borderColor: hoverLabel ? "rgba(232,121,249,0.9)" : hoveringInteractive ? "rgba(167,139,250,0.9)" : "rgba(255,255,255,0.45)",
          background: hoverLabel ? "rgba(10,10,12,0.9)" : "transparent",
        }}
        transition={reducedMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 24 }}
      >
        <span className={hoverLabel ? "opacity-100" : "opacity-0"}>{hoverLabel}</span>
      </motion.div>
    </>
  );
}
