import React from "react";

export default function Section({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) {
  return (
    <section className={`container max-w-4xl mx-auto px-4 ${className ?? ''} ${id ?? ''}`}>
      {children}
    </section>
  );
}