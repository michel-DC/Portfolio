import Header from "@/components/layouts/header";
import { Footer } from "@/components/layouts/footer";
import {
  IntroSection,
  EducationSection,
  ExperienceSection,
  SkillsSection,
} from "@/components/pages/about";
import TextSlider from "@/components/pages/home/text-slider";
import { Metadata } from "next";
import AboutAnimation from "@/animations/about-animation";

export const metadata: Metadata = {
  title: "À propos • Michel DJOUMESSI",
  description:
    "Découvrez mon parcours, mes expériences et mes compétences en développement web et design.",
};

export default function AboutPage() {
  return (
    <div>
      <AboutAnimation />
      <div className="bg-transparent min-h-screen flex flex-col">
        <Header />
        <main className="grow pt-20">
          <IntroSection />
          <TextSlider />
          <SkillsSection />
          <EducationSection />
          <ExperienceSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
