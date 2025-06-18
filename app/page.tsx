import Background from "./_components/background/background";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { Social } from "./_components/social";
import { DoingNow } from "./_components/DoingNow";
import { Skills } from "./_components/skills";
import { Projects } from "./_components/Projects";
import { ContactMe } from "./_components/contactMe";
import { SnakeGame } from "./_components/snakeGame";
import Maintenance from "./maintenance/maintenance";

export default function Home() {
  return (
    <main>
      <Background />
      {/* <Header />
      <Hero />
      <Social />
      <DoingNow />
      <Skills />
      <Projects />
      <ContactMe />
      <SnakeGame /> */}
      <Maintenance />
    </main>
  );
}
