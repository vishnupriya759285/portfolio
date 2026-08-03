"use client";

import SectionFrame from "./SectionFrame";
import Timeline from "./Timeline";
import { careerJourney } from "./portfolioData";

export default function CareerJourney() {
  return (
    <SectionFrame
      id="career"
      eyebrow="CAREER JOURNEY"
      title="Career Journey"
      description="A vertical timeline of the internships and applied AI work that shaped my current focus."
      contentClassName="max-w-4xl"
    >
      <Timeline items={careerJourney} />
    </SectionFrame>
  );
}
