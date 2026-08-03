"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

const DOT_SIZE  = 8;
const RING_SIZE = 36;

export default function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const [mounted,             setMounted]             = useState(false);
  const [finePointer,         setFinePointer]         = useState(false);
  const [visible,             setVisible]             = useState(false);
  const [hoverLabel,          setHoverLabel]          = useState<string | null>(null);
  const [hoveringInteractive, setHoveringInteractive] = useState(false);
  const [hoveringCTA,         setHoveringCTA]         = useState(false);

  const dotX    = useMotionValue(-100);
  const dotY    = useMotionValue(-100);
  const rawRingX = useMotionValue(-100);
  const rawRingY = useMotionValue(-100);
  const ringX   = useSpring(rawRingX, { stiffness: 500, damping: 36, mass: 0.18 });
  const ringY   = useSpring(rawRingY, { stiffness: 500, damping: 36, mass: 0.18 });

  /* detect if element is a CTA (download / connect / mailto) */
  function isCTA(el: Element | null): boolean {
    if (!el) return false;
    const t = el.closest("a, button") as HTMLElement | null;
    if (!t) return false;
    const txt  = (t.textContent ?? "").toLowerCase();
    const href = (t as HTMLAnchorElement).href ?? "";
    return (
      txt.includes("download") ||
      txt.includes("connect")  ||
      txt.includes("say hello")||
      href.includes("resume.pdf") ||
      href.startsWith("mailto:") ||
      href.includes("mail.google.com")
    );
  }

  useEffect(() => {
    setMounted(true);
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setFinePointer(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!mounted || !finePointer) return;

    const handleMove = (e: MouseEvent) => {
      const x = e.clientX, y = e.clientY;
      dotX.set(x - DOT_SIZE  / 2);
      dotY.set(y - DOT_SIZE  / 2);
      rawRingX.set(x - RING_SIZE / 2);
      rawRingY.set(y - RING_SIZE / 2);
      setVisible(true);

      const hovered = document.elementFromPoint(x, y) as HTMLElement | null;
      const cta     = isCTA(hovered);
      setHoveringCTA(cta);

      if (cta) { setHoveringInteractive(false); setHoverLabel(null); return; }

      const target = hovered?.closest(
        "[data-cursor-label], a, button, [role='button'], input, textarea, select, nav li"
      ) as HTMLElement | null;

      setHoveringInteractive(!!target);
      setHoverLabel(target?.getAttribute("data-cursor-label") ?? null);
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, [mounted, finePointer, dotX, dotY, rawRingX, rawRingY]);

  if (!mounted || !finePointer) return null;

  const ringScale = hoverLabel ? 2.05 : hoveringInteractive ? 1.75 : 1;

  return (
    <>
      {/*
        We do NOT inject cursor:none via JS-in-CSS here anymore.
        cursor:none is set in globals.css on `html` only, so the browser
        still processes text-selection events normally (user-select is unaffected).
        CTAs get their native cursor back via pointer-events on the element itself.
      */}

      {/* Dot — hidden when hovering interactive or CTA */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-white/90"
        style={{
          x: dotX, y: dotY,
          width: DOT_SIZE, height: DOT_SIZE,
          opacity: visible && !hoveringInteractive && !hoveringCTA ? 1 : 0,
        }}
        transition={{ duration: 0.12 }}
      />

      {/* Ring — hidden on CTAs */}
      {!hoveringCTA && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full border border-white/45 bg-transparent text-[10px] font-semibold tracking-[0.2em] text-white"
          style={{
            x: ringX, y: ringY,
            width:  hoverLabel ? 72 : RING_SIZE,
            height: hoverLabel ? 32 : RING_SIZE,
            scale:  ringScale,
            opacity: visible ? 1 : 0,
            borderColor: hoverLabel
              ? "rgba(232,121,249,0.9)"
              : hoveringInteractive
              ? "rgba(167,139,250,0.9)"
              : "rgba(255,255,255,0.45)",
            background: hoverLabel ? "rgba(10,10,12,0.9)" : "transparent",
          }}
          transition={
            reducedMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 260, damping: 24 }
          }
        >
          <span className={hoverLabel ? "opacity-100" : "opacity-0"}>{hoverLabel}</span>
        </motion.div>
      )}
    </>
  );
}
