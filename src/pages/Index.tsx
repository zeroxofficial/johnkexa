import { SirenBar } from "@/components/SirenBar";
import { SiteHeader } from "@/components/SiteHeader";
import { Hero } from "@/components/Hero";
import { Announcements } from "@/components/Announcements";
import { About } from "@/components/About";
import { Divisions } from "@/components/Divisions";
import { Officers } from "@/components/Officers";
import { Rules } from "@/components/Rules";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SirenBar />
      <SiteHeader />
      <main>
        <Hero />
        <Announcements />
        <About />
        <Divisions />
        <Officers />
        <Rules />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
