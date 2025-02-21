import Background from "./_components/background/background";
import InteractiveBackground from "./_components/background/InteractiveBackground";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { Social } from "./_components/social";
import { DoingNow } from "./_components/DoingNow";
import { Skills } from "./_components/skills";
import { Projects } from "./_components/Projects";
import { ContactMe } from "./_components/contactMe";
import { SnakeGame } from "./_components/snakeGame";

export default function Home() {
  return (
    <main className="">
      <Background />
      <Header />
      <Hero />
      <Social />
      <DoingNow />
      <Skills />
      <Projects />
      <ContactMe />
      <SnakeGame />
    </main>
  );
}
