import ProjectGallery from "./project-gallery";

export default function ProjectsList(): React.JSX.Element {
  return (
    <section className="min-h-screen w-full pb-24 pt-36 md:pb-32 md:pt-44" aria-label="Tous mes projets">
      <ProjectGallery headingLevel="h1" prioritizeImages />
    </section>
  );
}
