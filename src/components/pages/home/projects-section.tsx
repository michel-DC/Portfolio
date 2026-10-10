import ProjectGallery from "@/components/pages/projects/project-gallery";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FEATURED_PROJECT_COUNT = 4;

export default function ProjectsSection(): React.JSX.Element {
  return (
    <section className="w-full py-20 md:py-28" id="projects" aria-label="Mes projets">
      <ProjectGallery projectLimit={FEATURED_PROJECT_COUNT} showFilters={false} />
      <div className="mt-12 flex justify-center px-6">
        <Button asChild size="lg" className="rounded-full px-8">
          <Link href="/mes-projets">
            Voir tous mes projets <ArrowUpRight aria-hidden="true" className="size-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
