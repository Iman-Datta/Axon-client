import { cn } from "../../lib/utils";
import { SectionHeading } from "./primitives";

const manual = ["Create ticket", "Developer works", "Manually update status", "Move ticket"];
const axon = [
  "Create ticket",
  "Branch created",
  "Commit pushed",
  "Pull request opened",
  "Pull request merged",
  "Ticket automatically progresses",
];

function Flow({ title, steps, accent }) {
  return (
    <div className={cn("panel p-5", accent && "border-primary/40 bg-surface shadow-panel")}>
      <div className="flex items-center gap-2">
        <span className={cn("size-1.5 rounded-full", accent ? "bg-primary" : "bg-border-strong")} />
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
          {title}
        </span>
      </div>
      <ol className="mt-5 space-y-0">
        {steps.map((s, i) => (
          <li key={s} className="relative flex items-start gap-3 pb-5 last:pb-0">
            {i < steps.length - 1 && (
              <span
                className={cn(
                  "absolute left-[7px] top-4 bottom-0 w-px",
                  accent ? "bg-primary/40" : "bg-border",
                )}
              />
            )}
            <span
              className={cn(
                "mt-1 size-[15px] shrink-0 rounded-full border",
                accent ? "border-primary/60 bg-primary/15" : "border-border-strong bg-card",
              )}
            />
            <span
              className={cn(
                "text-[13px]",
                accent && i === steps.length - 1 ? "font-medium text-primary" : "text-muted-foreground",
              )}
            >
              {s}
            </span>
            {accent && i > 0 && i < steps.length - 1 && (
              <span className="ml-auto font-mono text-[10px] text-muted-foreground/70">auto</span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function ComparisonSection() {
  return (
    <section id="git" className="border-b border-border bg-card/30">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <SectionHeading
          label="Manual vs Git-aware"
          title="Work manually when you want. Automate when you connect Git."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <Flow title="Without Git integration" steps={manual} />
          <Flow title="With Axon" steps={axon} accent />
        </div>
      </div>
    </section>
  );
}
