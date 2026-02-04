"use client";

import HeroSection from "./hero-section";
import AboutSection from "./about-section";
import ServicesSection from "./skills-overview-section";
import TextSlider from "./text-slider";
import ProjectsSection from "./projects-section";
import ContactSection from "./contact-section";
import WorksSection from "./works-section";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <TextSlider />
      <ServicesSection />
      <ProjectsSection />
      <WorksSection />
      <ContactSection />
    </div>
  );
}
