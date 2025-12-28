import { ProjectsList } from "@/components/pages/projects";
import Header from "@/components/layouts/header";
import { Footer } from "@/components/layouts/footer";
import { Metadata } from "next";
import ProjectsAnimation from "@/animations/projects-animation";

export const metadata: Metadata = {
  title: "Mes Projets | Portfolio",
  description:
    "Découvrez l'ensemble de mes projets, allant des applications web aux outils backend et dashboards.",
};

export default function ProjectsPage() {
  return (
    <div>
      <ProjectsAnimation />
      <div className="bg-white min-h-screen flex flex-col">
        <Header />
        <main className="grow">
          <ProjectsList />
        </main>
        <Footer />
      </div>
    </div>
  );
}
