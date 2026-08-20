import { Hero } from "./Hero";
import { ComparisonSection } from "./ComparisonSection";
import { DevelopersSection } from "./DevelopersSection";
import { CollaborationSection } from "./CollaborationSection";
import { OrganizationsSection } from "./OrganizationsSection";
import { ArchitectureSection } from "./ArchitectureSection";
import { FinalCTA } from "./FinalCTA";
import { Footer } from "./Footer";

function LandingPage() {
  return (
    <main className="overflow-hidden bg-background text-foreground pt-4">
      <Hero />
      <ComparisonSection />
      <DevelopersSection />
      <CollaborationSection />
      <OrganizationsSection />
      <ArchitectureSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}

export default LandingPage;
