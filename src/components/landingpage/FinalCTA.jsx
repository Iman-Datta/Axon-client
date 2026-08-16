import { ArrowRight, Zap, Rocket } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-b border-[#30363d]/60 bg-[#0d1117]">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
      <div className="relative mx-auto max-w-6xl px-5 py-20 text-center">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl text-[#e6edf3] flex items-center justify-center gap-2">
          Build your next project with Axon.
          <Zap className="h-6 w-6 text-[#58a6ff]" />
        </h2>
        <p className="mt-3 text-sm text-[#8b949e] flex items-center justify-center gap-1.5">
          <Rocket className="h-4 w-4 text-[#3fb950]" />
          From your first ticket to the final merge.
        </p>
        <button className="mt-7 inline-flex h-9 items-center gap-2 rounded-lg bg-[#238636] px-4 text-sm font-medium text-white shadow-sm transition hover:bg-[#2ea043] active:bg-[#238636]">
          Get Started
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
