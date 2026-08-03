"use client";

import SectionFrame from "./SectionFrame";
import Timeline from "./Timeline";
import { journeyEntries } from "./portfolioData";

export default function MyJourney() {
  return (
    <SectionFrame
      id="journey"
      eyebrow="MY JOURNEY"
      title="My Journey"
      description="A broader life-and-learning timeline kept in the same visual family as Career Journey."
      contentClassName="max-w-4xl"
    >
      <Timeline items={journeyEntries} />
    </SectionFrame>
  );
}
