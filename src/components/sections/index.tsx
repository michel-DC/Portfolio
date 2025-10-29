import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/sections/hero-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { WorksSection } from "@/components/sections/works-section";

export function LandingPage() {
  return (
    <>
      <Header />
      <HeroSection />
      <SkillsSection />
      <WorksSection />
    </>
  );
}