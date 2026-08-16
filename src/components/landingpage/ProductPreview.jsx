import {
  LayoutGrid,
  Folder,
  Users,
  GitBranch,
  GitCommitHorizontal,
  GitPullRequest,
  GitMerge,
  Search,
  Settings,
} from "lucide-react";
import { Avatar, ColumnHeader, Priority, SectionHeading } from "./primitives";

const nav = [
  { label: "Board", icon: LayoutGrid, active: true },
  { label: "Projects", icon: Folder },
  { label: "Team", icon: Users },
  { label: "Git activity", icon: GitBranch },
  { label: "Settings", icon: Settings },
];

const projects = ["Axon Project", "Website", "Mobile App", "Internal Tools"];

const mini = [
  { id: 127, title: "Cache webhook payloads", status: "todo", p: "high" },
  { id: 118, title: "Keyboard drag support", status: "todo", p: "low" },
  { id: 109, title: "Webhook receiver", status: "dev", p: "high" },
  { id: 108, title: "Dashboard improvements", status: "review", p: "low" },
  { id: 104, title: "Implement API authentication", status: "done", p: "high" },
];

const cols = ["todo", "dev", "review", "done"];

const activity = [
  { icon: GitBranch, text: "feature/ticket-109 created", time: "2h" },
  { icon: GitCommitHorizontal, text: '"Verify signature header"', time: "1h" },
  { icon: GitPullRequest, text: "PR #44 opened", time: "35m" },
  { icon: GitMerge, text: "PR #42 merged into main", time: "12m" },
];

export function ProductPreview() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <SectionHeading label="Product preview" title="A look inside Axon." />
        <div className="mt-10 panel shadow-panel overflow-hidden">
          <div className="flex items-center gap-3 border-b border-border bg-surface-raised px-3 py-2">
            <span className="font-mono text-[11px] text-muted-foreground">axon.app</span>
            <div className="ml-2 hidden items-center gap-2 rounded-md border border-border bg-card px-2 py-1 sm:flex">
              <Search className="size-3 text-muted-foreground" />
              <span className="font-mono text-[10px] text-muted-foreground">
                Search tickets, branches…
              </span>
            </div>
            <div className="ml-auto flex -space-x-1.5">
              {["Ankita Rao", "Rahul Menon", "Iman Sheikh"].map((n, i) => (
                <Avatar key={n} name={n} index={i} size={20} ring />
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-[180px_minmax(0,1fr)_240px]">
            <aside className="hidden border-r border-border bg-card/40 p-3 lg:block">
              <nav className="space-y-1">
                {nav.map((n) => {
                  const Icon = n.icon;
                  return (
                    <div
                      key={n.label}
                      className={
                        "flex items-center gap-2 rounded-md px-2 py-1.5 text-[12.5px] " +
                        (n.active ? "bg-secondary text-foreground" : "text-muted-foreground")
                      }
                    >
                      <Icon className="size-3.5" />
                      {n.label}
                    </div>
                  );
                })}
              </nav>
              <p className="mt-5 px-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Projects
              </p>
              <ul className="mt-2 space-y-1">
                {projects.map((p, i) => (
                  <li
                    key={p}
                    className={
                      "flex items-center gap-2 rounded-md px-2 py-1 text-[12px] " +
                      (i === 0 ? "text-foreground" : "text-muted-foreground")
                    }
                  >
                    <span
                      className={"size-1.5 rounded-full " + (i === 0 ? "bg-primary" : "bg-border-strong")}
                    />
                    {p}
                  </li>
                ))}
              </ul>
            </aside>

            <div className="p-4">
              <div className="mb-3 flex items-center gap-2">
                <h3 className="text-[13px] font-medium">Axon Project</h3>
                <span className="rounded-sm border border-border px-1.5 py-px font-mono text-[10px] text-muted-foreground">
                  sprint 12
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {cols.map((c) => {
                  const items = mini.filter((m) => m.status === c);
                  return (
                    <div key={c} className="rounded-md bg-card/60 p-2">
                      <ColumnHeader status={c} count={items.length} />
                      <div className="space-y-2">
                        {items.map((t) => (
                          <div key={t.id} className="rounded-md border border-border bg-card p-2">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[10px] text-muted-foreground">
                                #{t.id}
                              </span>
                              <Priority level={t.p} />
                            </div>
                            <p className="mt-1 text-[11px] leading-snug">{t.title}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 rounded-md border border-border bg-card p-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-muted-foreground">#109</span>
                  <p className="text-[13px]">Webhook receiver for push events</p>
                  <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-dev">
                    <span className="size-1.5 rounded-full bg-dev" />
                    Development
                  </span>
                </div>
                <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
                  Receive push and pull_request events, verify the signature, and map each payload
                  to the matching ticket.
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-border pt-2">
                  <Avatar name="Rahul Menon" index={1} size={18} />
                  <span className="text-[11px] text-muted-foreground">Rahul Menon</span>
                  <span className="rounded-sm bg-secondary px-1.5 py-px font-mono text-[10px] text-muted-foreground">
                    8 pts
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    feature/ticket-109
                  </span>
                </div>
              </div>
            </div>

            <aside className="border-t border-border p-4 lg:border-l lg:border-t-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Git activity
              </p>
              <ul className="mt-3 space-y-3">
                {activity.map((a) => {
                  const Icon = a.icon;
                  return (
                    <li key={a.text} className="flex items-start gap-2">
                      <Icon className="mt-0.5 size-3.5 text-muted-foreground" />
                      <span className="text-[11.5px] leading-snug text-muted-foreground">
                        {a.text}
                      </span>
                      <span className="ml-auto font-mono text-[10px] text-muted-foreground/70">
                        {a.time}
                      </span>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Team
              </p>
              <ul className="mt-3 space-y-2">
                {["Ankita Rao", "Rahul Menon", "Iman Sheikh", "Devika N"].map((n, i) => (
                  <li key={n} className="flex items-center gap-2">
                    <Avatar name={n} index={i} size={20} />
                    <span className="text-[12px] text-muted-foreground">{n}</span>
                    {i < 2 && (
                      <span className="ml-auto size-1.5 rounded-full bg-done animate-pulse-dot" />
                    )}
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
