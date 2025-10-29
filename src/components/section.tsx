import React from "react";

export default function Section({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <section className={`container max-w-4xl mx-auto px-4 ${className ?? ''}`}>
      {children}
    </section>
  );
}