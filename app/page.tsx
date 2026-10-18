import Hero from "@/components/Hero";
import About from "@/components/About";
import Blog from "@/components/Blog";
import CareerJourney from "@/components/CareerJourney";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import CurrentlyLearning from "@/components/CurrentlyLearning";
import ExperienceHighlights from "@/components/ExperienceHighlights";
import Footer from "@/components/Footer";
import GlassShards from "@/components/GlassShards";
import Hackathons from "@/components/Hackathons";
import KnowledgeHub from "@/components/KnowledgeHub";
import MyJourney from "@/components/MyJourney";
import Projects from "@/components/Projects";
import ResumeCTA from "@/components/ResumeCTA";
import TechnicalSkills from "@/components/TechnicalSkills";
import { getFeaturedProjects } from "@/lib/github";

export const revalidate = 300;

export default async function Home() {
  const projects = await getFeaturedProjects();

  return (
    <main>
      <div id="home">
        <Hero />
      </div>
      <GlassShards />

      <About />
      <Projects projects={projects} />
      <CareerJourney />
      <TechnicalSkills />
      <ExperienceHighlights />
      <Hackathons />
      <KnowledgeHub />
      <Blog />
      <Certifications />
      <MyJourney />
      <CurrentlyLearning />
      <ResumeCTA />
      <Contact />
      <Footer />
    </main>
  );
}
