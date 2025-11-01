import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import React from "react";

// Helper pour récupérer le nom du projet par son slug
async function getProjectName(slug: string): Promise<string | null> {
  const dataDir = path.join(process.cwd(), "src/data/projects");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dataDir);
  } catch {
    return null;
  }

  for (const file of files) {
    if (!file.endsWith(".json")) continue;
    const fullPath = path.join(dataDir, file);
    let content = "";
    try {
      content = fs.readFileSync(fullPath, "utf-8");
    } catch {
      continue;
    }

    let parsed: Record<string, unknown> | null = null;
    try {
      parsed = JSON.parse(content) as Record<string, unknown>;
    } catch {
      continue;
    }

    const getString = (
      obj: Record<string, unknown> | null,
      key: string
    ): string | undefined => {
      if (!obj) return undefined;
      const v = obj[key];
      return typeof v === "string" ? v : undefined;
    };

    const slugNameField = getString(parsed, "slugName");
    const slugField = getString(parsed, "slug");
    const nameField = getString(parsed, "name");
    const derivedFromName = nameField
      ? nameField
          .toLowerCase()
          .replace(/[^a-z0-9]+/gi, "-")
          .replace(/(^-|-$)/g, "")
      : undefined;

    const candidateSlug = slugNameField || slugField || derivedFromName;

    if (candidateSlug && String(candidateSlug) === String(slug)) {
      return nameField ?? null;
    }
  }

  return null;
}

export async function generateMetadata({
  params,
}: {
  params: unknown;
}): Promise<Metadata> {
  const isThenable = (v: unknown): v is PromiseLike<unknown> =>
    v !== null &&
    typeof v === "object" &&
    typeof (v as { then?: unknown }).then === "function";

  let resolvedParams: unknown = params;
  if (isThenable(resolvedParams)) {
    try {
      resolvedParams = await resolvedParams;
    } catch {
      resolvedParams = undefined;
    }
  }

  let slug: unknown = undefined;
  if (
    resolvedParams &&
    typeof resolvedParams === "object" &&
    resolvedParams !== null &&
    "slug" in resolvedParams
  ) {
    slug = (resolvedParams as Record<string, unknown>)["slug"];
  }

  const name = typeof slug === "string" ? await getProjectName(slug) : null;

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
