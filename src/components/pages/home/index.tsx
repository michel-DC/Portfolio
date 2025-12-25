"use client";

import HeroSection from "./hero-section";
import AboutSection from "./about-section";
import ServicesSection from "./services-section";
import ProjectsSection from "./projects-section";

export default function Home() {
  return (
    <div className="bg-[#e6e6e6] ">
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
    </div>
  );
}
