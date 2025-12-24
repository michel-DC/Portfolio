"use client";

import HeroSection from "./hero-section";
import AboutSection from "./about-section";
import ServicesSection from "./services-section";

export default function Home() {
  return (
    <div>
      <div className="fixed inset-0 z-0">
        <video
          className="absolute top-1/2 left-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/video/video-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ServicesSection />
      </div>
    </div>
  );
}
