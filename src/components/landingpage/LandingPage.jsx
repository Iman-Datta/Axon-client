import { Hero } from "./Hero";
import { IdeaSection } from "./IdeaSection";
import { ComparisonSection } from "./ComparisonSection";
import { KanbanSection } from "./KanbanSection";
import { DevelopersSection } from "./DevelopersSection";
import { CollaborationSection } from "./CollaborationSection";
import { ProductPreview } from "./ProductPreview";
import { OrganizationsSection } from "./OrganizationsSection";
import { FinalCTA } from "./FinalCTA";
import { Footer } from "./Footer";

function LandingPage() {
  return (
    <main className="overflow-hidden bg-background text-foreground pt-4">
      <Hero />
      <IdeaSection />
      <ComparisonSection />
      <KanbanSection />
      <DevelopersSection />
      <CollaborationSection />
      <ProductPreview />
      <OrganizationsSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}

export default LandingPage;
