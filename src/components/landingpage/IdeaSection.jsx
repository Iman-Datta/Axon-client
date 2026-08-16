import { SectionHeading } from "./primitives";
import { Folder, Ticket, GitBranch, Workflow } from "lucide-react";

const chain = [
  { label: "Project", icon: Folder, note: "Axon Project · 4 members" },
  { label: "Tickets", icon: Ticket, note: "#101 · #104 · #108 · #96" },
  { label: "Git activity", icon: GitBranch, note: "branches · commits · pull requests" },
  { label: "Automated workflow", icon: Workflow, note: "status moves as code moves" },
];

const orbit = ["Developers", "Teams", "Branches", "Commits", "Pull Requests", "Kanban", "Activity"];

export function IdeaSection() {
  return (
    <section id="how-it-works" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <SectionHeading
          label="The Axon idea"
          title="One workflow. Connected from code to completion."
        />
        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="panel p-5">
            <ol className="relative">
              {chain.map((c, i) => {
                const Icon = c.icon;
                return (
                  <li key={c.label} className="relative flex gap-4 pb-6 last:pb-0">
                    {i < chain.length - 1 && (
                      <span className="absolute left-[19px] top-10 bottom-0 w-px bg-border" />
                    )}
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-card">
                      <Icon className="size-4 text-primary" />
                    </span>
                    <div className="pt-1.5">
                      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground">
                        {c.label}
                      </p>
                      <p className="mt-1 text-[13px] text-muted-foreground">{c.note}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
          <div className="flex flex-wrap content-start gap-2">
            {orbit.map((o) => (
              <span
                key={o}
                className="rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-[11px] text-muted-foreground"
              >
                {o}
              </span>
            ))}
            <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
              Everything hangs off the project: people, boards, and every event your repository
              produces.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
