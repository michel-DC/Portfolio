import Header from "@/components/layouts/header";
import HeroSection from "@/components/pages/home/hero-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F0F0F0] text-black">
      <Header />
      <HeroSection />
    </div>
  );
}
