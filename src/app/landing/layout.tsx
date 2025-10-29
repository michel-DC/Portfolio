import type { Metadata, Viewport } from "next";
import { Background } from "@/components/background/background";

export const metadata: Metadata = {

  title: "Développement",
  description: "Développement",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="backdrop-blur-3xl">
      <Background>
        {children}
      </Background>
      </main>
  );
}
