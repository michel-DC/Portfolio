"use client";

import HeroSection from "./hero-section";
import AboutSection from "./about-section";
import ServicesSection from "./skills-overview-section";
import TextSlider from "./text-slider";
// import ProjectsSection from "./projects-section";

export default function Home() {
  return (
    <div className="bg-[#e6e6e6] ">
      <HeroSection />
      <AboutSection />
      <TextSlider />
      <ServicesSection />
      {/* <ProjectsSection /> */}
    </div>
  );
}
