import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import React from "react";

// Helper pour récupérer le nom du projet par son slug
async function getProjectName(slug: string): Promise<string | null> {
  const dataDir = path.join(process.cwd(), "src/data/projects");
  const files = fs.readdirSync(dataDir);
  for (const file of files) {
    if (!file.endsWith(".json")) continue;
    const fullPath = path.join(dataDir, file);
    const content = fs.readFileSync(fullPath, "utf-8");
    try {
      const data = JSON.parse(content);
      if (data.slugName === slug) {
        return data.name as string;
      }
    } catch {}
  }
  return null;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const name = await getProjectName(params.slug);
  return {
    title: name ? name : "Projet",
  };
}

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
