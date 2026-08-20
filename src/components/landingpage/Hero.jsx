import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { Avatar, ColumnHeader, Priority } from "./primitives";
import {
  GitBranch,
  GitCommitHorizontal,
  GitPullRequest,
  GitMerge,
} from "lucide-react";

const baseTickets = [
  {
    id: 101,
    title: "Authentication UI",
    status: "todo",
    priority: "medium",
    assignee: "Ankita Rao",
    points: 3,
  },
  {
    id: 104,
    title: "Implement API authentication",
    status: "todo",
    priority: "high",
    assignee: "Rahul Menon",
    points: 5,
  },
  {
    id: 108,
    title: "Dashboard improvements",
    status: "review",
    priority: "low",
    assignee: "Iman Sheikh",
    points: 2,
  },
  {
    id: 96,
    title: "Database setup",
    status: "done",
    priority: "medium",
    assignee: "Devika N",
    points: 8,
  },
];

const steps = [
  {
    status: "todo",
    event: "Ticket created",
    detail: "#104 · backlog",
    icon: GitCommitHorizontal,
    tone: "text-muted-foreground",
  },
  {
    status: "dev",
    event: "Branch created",
    detail: "feature/ticket-104",
    icon: GitBranch,
    tone: "text-dev",
  },
  {
    status: "dev",
    event: "Commit pushed",
    detail: '"Implement JWT authentication"',
    icon: GitCommitHorizontal,
    tone: "text-dev",
  },
  {
    status: "review",
    event: "Pull request opened",
    detail: "#42 · axon/api",
    icon: GitPullRequest,
    tone: "text-review",
  },
  {
    status: "done",
    event: "Pull request merged",
    detail: "#42 merged into main",
    icon: GitMerge,
    tone: "text-done",
  },
];

const columns = ["todo", "dev", "review", "done"];

const COLUMN_BODY_HEIGHT = 200;

export function Hero() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setStep((s) => (s + 1) % (steps.length + 1)),
      2100,
    );
    return () => clearInterval(t);
  }, []);

  const active = Math.min(step, steps.length - 1);
  const liveStatus = steps[active]?.status ?? "todo";
  const tickets = baseTickets.map((t) =>
    t.id === 104 ? { ...t, status: liveStatus } : t,
  );

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-70" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:py-20">
        <div>
          <div className="mb-5 flex items-center gap-2.5">
            <img
              src="/Logo.png"
              alt="Axon"
              className="h-9 w-9 rounded-md object-contain"
            />
            <span className="font-mono text-base font-semibold tracking-tight text-foreground">
              Axon
            </span>
          </div>

          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-primary animate-pulse-dot" />
            Git-aware project management
          </span>
          <h1 className="mt-5 text-[34px] font-semibold leading-[1.1] tracking-tight sm:text-[42px]">
            Your code changes.
            <br />
            <span className="text-muted-foreground">Your work should too.</span>
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Axon connects your projects, tickets, teams, and Git activity into
            one workflow.
          </p>

          {/* Increased margin-top from mt-8 to mt-16 */}
          <div className="mt-25 flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
            <span className="size-1.5 rounded-full bg-done animate-pulse-dot" />
            Watch Axon work
            <span className="h-px flex-1 bg-border" />
          </div>
        </div>

        <div className="panel shadow-panel overflow-hidden">
          <div className="flex items-center gap-2 border-b border-border bg-surface-raised px-3 py-2">
            <span className="size-2 rounded-full bg-border-strong" />
            <span className="size-2 rounded-full bg-border-strong" />
            <span className="size-2 rounded-full bg-border-strong" />
            <span className="ml-2 font-mono text-[11px] text-muted-foreground">
              Axon Project
            </span>
            <span className="ml-auto flex -space-x-1.5">
              {["Ankita Rao", "Rahul Menon", "Iman Sheikh"].map((n, i) => (
                <Avatar key={n} name={n} index={i} size={18} ring />
              ))}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 p-3 sm:grid-cols-4">
            {columns.map((col) => {
              const items = tickets.filter((t) => t.status === col);
              return (
                <div key={col} className="rounded-md bg-card/50 p-2">
                  <ColumnHeader status={col} count={items.length} />
                  <div
                    className="space-y-2 overflow-y-auto pr-0.5"
                    style={{ height: COLUMN_BODY_HEIGHT }}
                  >
                    {items.map((t) => (
                      <div
                        key={t.id}
                        className={cn(
                          "animate-rise rounded-md border border-border bg-card p-2 transition-colors",
                          t.id === 104 &&
                            "border-primary/60 ring-1 ring-primary/25",
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] text-muted-foreground">
                            #{t.id}
                          </span>
                          <Priority level={t.priority} />
                        </div>
                        <p className="mt-1 text-[11px] leading-snug text-foreground">
                          {t.title}
                        </p>
                        <div className="mt-2 flex items-center gap-1.5">
                          <Avatar name={t.assignee} index={t.id} size={16} />
                          <span className="ml-auto font-mono text-[9px] text-muted-foreground">
                            {t.points} pts
                          </span>
                        </div>
                      </div>
                    ))}
                    {items.length === 0 && (
                      <div className="h-14 rounded-md border border-dashed border-border/70" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="border-t border-border bg-card/40 px-3 py-3">
            <div className="mb-2 flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Git activity
              </span>
              <span className="h-px flex-1 bg-border" />
              <span className="font-mono text-[10px] text-muted-foreground">
                axon/api
              </span>
            </div>
            <ul className="space-y-1.5">
              {steps.map((s, i) => {
                const Icon = s.icon;
                const reached = i <= active;
                return (
                  <li
                    key={s.event}
                    className={cn(
                      "flex items-center gap-2 rounded-md px-2 py-1.5 transition-all duration-500",
                      reached ? "opacity-100" : "opacity-30",
                      i === active && "bg-surface-raised",
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-3.5",
                        reached ? s.tone : "text-muted-foreground",
                      )}
                    />
                    <span className="text-[11px] text-foreground">
                      {s.event}
                    </span>
                    <span className="truncate font-mono text-[10px] text-muted-foreground">
                      {s.detail}
                    </span>
                    {i === active && (
                      <span className="ml-auto font-mono text-[9px] uppercase tracking-wider text-primary">
                        → {s.status === "dev" ? "development" : s.status}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
