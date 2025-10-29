import { Header } from "@/components/layout/header";
import { HeroSection } from "@/components/sections/hero-section";
import { SkillsSection } from "@/components/sections/skills-section";

export function LandingPage() {
  return (
    <>
      <Header />
      <HeroSection />
      <SkillsSection />
    </>
  );
}