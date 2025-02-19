import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { Social } from "./_components/social";
import { DoingNow } from "./_components/DoingNow";
import { HowHelp } from "./_components/HowHelp";
import { Skills } from "./_components/skills";
import { Projects } from "./_components/Projects";
import { ContactMe } from "./_components/contactMe";
import { SnakeGame } from "./_components/snakeGame";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Social />
      <DoingNow />
      <HowHelp />
      <Skills />
      <Projects />
      <ContactMe />
      <SnakeGame />
    </main>
  );
}
