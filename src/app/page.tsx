import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { Tools } from "@/components/sections/tools";
import { SuggestionForm } from "@/components/sections/suggestion-form";
import { Footer } from "@/components/layout/footer";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-neutral-950">
      <BackgroundBeamsWithCollision className="absolute inset-0" />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Tools />
        <SuggestionForm />
        <Footer />
      </div>
    </main>
  );
}
