import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { Social } from "./_components/social";
import { DoingNow } from "./_components/DoingNow";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Social />
      <DoingNow />
    </main>
  );
}
