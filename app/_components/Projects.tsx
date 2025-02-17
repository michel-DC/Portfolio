import React from "react";
import { Section } from "./section";
import { Card, CardContent } from "../components/ui/card";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const projects = [
  {
    title: "Halcyon Theme",
    description:
      "A minimal, dark blue theme for VS Code, Sublime Text, Atom, iTerm, and more. Available on Visual Studio Marketplace, Package Control, Atom Package Manager, and npm.",
    tags: ["VS Code", "Sublime Text", "Atom", "iTerm2", "Hyper"],
    image: "/halcyon.png",
    links: { github: "#", external: "#" },
  },
  {
    title: "Spotify Profile",
    description:
      "A web app for visualizing personalized Spotify data. View your top artists, top tracks, recently played tracks, and detailed audio information about each track.",
    tags: ["React", "Styled Components", "Express", "Spotify API", "Heroku"],
    image: "/spotify-profile.png",
    links: { github: "#", external: "#" },
  },
];

export const Projects = () => {
  return (
    <Section>
      <div className="bg-[#0a192f] text-white p-10 grid gap-8 md:grid-cols-2">
        {projects.map((project, index) => (
          <Card key={index} className="relative bg-[#112240] p-5 rounded-lg">
            <img
              src={project.image}
              alt={project.title}
              className="w-full rounded-md"
            />
            <CardContent className="mt-4">
              <p className="text-green-400 text-sm">Featured Project</p>
              <h3 className="text-xl font-semibold text-[#ccd6f6]">
                {project.title}
              </h3>
              <p className="bg-[#0a192f] p-4 rounded-md text-[#a8b2d1]">
                {project.description}
              </p>
              <div className="flex flex-wrap mt-3 gap-2 text-[#8892b0] text-sm">
                {project.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="flex gap-4 mt-4">
                <a
                  href={project.links.github}
                  className="text-[#a8b2d1] text-lg"
                >
                  <FaGithub />
                </a>
                <a
                  href={project.links.external}
                  className="text-[#a8b2d1] text-lg"
                >
                  <FaExternalLinkAlt />
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
};
