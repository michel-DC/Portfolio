import Home from "@/components/pages/home";
import Header from "@/components/layouts/header";
import { Footer } from "@/components/layouts/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}
