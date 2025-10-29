import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/sections/hero-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { WorksSection } from "@/components/sections/works-section";
import { BlogSection } from "@/components/sections/blog-section"

export function LandingPage() {
  return (
    <>
      <Header />
      <HeroSection />
      <div id="skills">
      <SkillsSection />
      </div>
      <div id="works">
      <WorksSection />
      </div>
      <div id="blog">
      <BlogSection />
      </div>
    </>
  );
}