import Home from "@/components/pages/home";
import EntryAnimation from "@/animations/entry-animation";
import Header from "@/components/layouts/header";
import { Footer } from "@/components/layouts/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <EntryAnimation />
      <Header />
      <Home />
      <Footer />
    </div>
  );
}
