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
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "À propos • Michel DJOUMESSI",
  description:
    "Découvrez mon parcours, mes expériences et mes compétences en développement web et design.",
  pathname: "/a-propos",
});

export default function AboutPage() {
  return (
    <div>
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
