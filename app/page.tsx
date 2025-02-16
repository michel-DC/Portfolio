import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { Social } from "./_components/social";
import { DoingNow } from "./_components/DoingNow";
import { HowHelp } from "./_components/HowHelp";
import { Skills } from "./_components/skills";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Social />
      <DoingNow />
      <HowHelp />
      <Skills />
    </main>
  );
}
