import { HeroSection } from "@/components/sections/hero-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { WorksSection } from "@/components/sections/works-section";
import { BlogSection } from "@/components/sections/blog-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ContactSection } from "@/components/sections/contact-section";

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <div id="skills">
        <SkillsSection />
      </div>
      <div id="works">
        <WorksSection />
      </div>
      <div id="projects">
        <ProjectsSection />
      </div>
      <div id="blog">
        <BlogSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
    </>
  );
}
