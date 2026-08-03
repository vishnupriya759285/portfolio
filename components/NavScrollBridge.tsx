"use client";

import { useEffect } from "react";

const targetMap: Record<string, string> = {
  HOME: "home",
  ABOUT: "about",
  PROJECTS: "projects",
  SKILLS: "skills",
  EXPERIENCE: "experience",
  CONTACT: "contact",
  "LET'S CONNECT": "contact",
  "EXPLORE MY WORK": "projects",
};

export default function NavScrollBridge() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) {
        return;
      }

      const navNode = target.closest("nav li, nav button");
      if (!navNode) {
        return;
      }

      const key = navNode.textContent?.replace(/\s+/g, " ").trim().toUpperCase();
      const sectionId = key ? targetMap[key] : undefined;
      if (!sectionId) {
        return;
      }

      const section = document.getElementById(sectionId);
      if (!section) {
        return;
      }

      event.preventDefault();
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
