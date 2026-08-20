import { Hero } from "./Hero";
import { ComparisonSection } from "./ComparisonSection";
import { DevelopersSection } from "./DevelopersSection";
import { CollaborationSection } from "./CollaborationSection";
import { OrganizationsSection } from "./OrganizationsSection";
import { ArchitectureSection } from "./ArchitectureSection";
import { FinalCTA } from "./FinalCTA";
import { Footer } from "./Footer";

const NAV_OFFSET = 88;

function LandingPage() {
  return (
    <main className="overflow-hidden bg-background text-foreground pt-4">
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        .scroll-anchor {
          scroll-margin-top: ${NAV_OFFSET}px;
        }
      `}</style>

      <div id="top" className="scroll-anchor">
        <Hero />
      </div>
      <div id="comparison" className="scroll-anchor">
        <ComparisonSection />
      </div>
      <div id="developers" className="scroll-anchor">
        <DevelopersSection />
      </div>
      <div id="collaboration" className="scroll-anchor">
        <CollaborationSection />
      </div>
      <div id="organizations" className="scroll-anchor">
        <OrganizationsSection />
      </div>
      <div id="architecture" className="scroll-anchor">
        <ArchitectureSection />
      </div>
      <div id="get-started" className="scroll-anchor">
        <FinalCTA />
      </div>
      <Footer />
    </main>
  );
}

export default LandingPage;
