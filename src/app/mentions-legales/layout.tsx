import type { Metadata } from "next";
import React from "react";
import Section from "@/components/section";

export const metadata: Metadata = {
  title: "Mentions légales - Michel DJOUMESSI",
  description:
    "Mentions légales et informations légales du site onlinemichel.dev",
};

export default function MentionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="pt-24 pb-12">
      <Section className="py-12">{children}</Section>
    </main>
  );
}
