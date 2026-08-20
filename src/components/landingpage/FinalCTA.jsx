import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ArrowRight, Sparkles } from "lucide-react";

export function FinalCTA() {
  const navigate = useNavigate();

  const user = useSelector((state) => state?.auth?.user || state?.user);
  const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);

  const handleCTA = () => {
    if (isAuthenticated && user?.username) {
      navigate(`/${user.username}`);
    } else {
      navigate("/auth");
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-border/60 bg-background py-24">
      {/* Background radial gradient & prominent grid pattern */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-80 [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-96 rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        {/* Subtle pill badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1 text-xs font-mono text-muted-foreground backdrop-blur-md shadow-sm">
          <Sparkles className="size-3.5 text-primary" />
          <span>Streamline your entire Git lifecycle</span>
        </div>

        {/* Clean, high-contrast headline */}
        <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-tight">
          Ready to transform how your team builds?
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground leading-relaxed">
          From your first ticket to the final merge, connect your projects,
          teams, and code into one unified workflow.
        </p>

        {/* Dynamic CTA Button */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={handleCTA}
            className="group relative inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:shadow-lg active:scale-[0.98]"
          >
            {isAuthenticated ? "Go to Dashboard" : "Get Started Free"}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
