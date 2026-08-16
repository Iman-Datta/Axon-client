import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { Avatar, ColumnHeader, SectionHeading } from "./primitives";

const feed = [
  { who: "Ankita", text: "moved #108 → Review", time: "just now" },
  { who: "Rahul", text: "assigned #108 to Iman", time: "1m" },
  { who: "Iman", text: "is viewing #108", time: "now", live: true },
  { who: "Devika", text: "commented on #112", time: "4m" },
];

const board = [
  { id: 112, title: "Rate limiting middleware", status: "todo" },
  { id: 115, title: "Ticket detail drawer", status: "todo" },
  { id: 109, title: "Webhook receiver", status: "dev" },
  { id: 108, title: "Dashboard improvements", status: "review" },
  { id: 104, title: "Implement API authentication", status: "done" },
];

const cols = ["todo", "dev", "review", "done"];

export function CollaborationSection() {
  const [visible, setVisible] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setVisible((v) => (v % feed.length) + 1), 1800);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <SectionHeading
          label="Real-time collaboration"
          title="Everyone sees the same project state."
        />
        <div className="mt-10 panel shadow-panel overflow-hidden">
          <div className="flex flex-wrap items-center gap-4 border-b border-border bg-surface-raised px-4 py-3">
            <div>
              <p className="text-sm font-medium">Project Alpha</p>
              <p className="font-mono text-[11px] text-muted-foreground">
                12 Tickets · 4 Developers · 2 Pull Requests
              </p>
            </div>
            <div className="ml-auto flex -space-x-1.5">
              {["Ankita Rao", "Rahul Menon", "Iman Sheikh", "Devika N"].map((n, i) => (
                <Avatar key={n} name={n} index={i} size={24} ring />
              ))}
            </div>
          </div>
          <div className="grid lg:grid-cols-[minmax(0,1fr)_280px]">
            <div className="grid grid-cols-2 gap-3 p-4 sm:grid-cols-4">
              {cols.map((c) => {
                const items = board.filter((b) => b.status === c);
                return (
                  <div key={c} className="rounded-md bg-card/50 p-2">
                    <ColumnHeader status={c} count={items.length} />
                    <div className="space-y-2">
                      {items.map((t) => (
                        <div
                          key={t.id}
                          className={cn(
                            "rounded-md border border-border bg-card p-2",
                            t.id === 108 && "border-review/50",
                          )}
                        >
                          <span className="font-mono text-[10px] text-muted-foreground">
                            #{t.id}
                          </span>
                          <p className="mt-1 text-[11px] leading-snug">{t.title}</p>
                          {t.id === 108 && (
                            <p className="mt-1.5 flex items-center gap-1 font-mono text-[9px] text-primary">
                              <span className="size-1 rounded-full bg-primary animate-pulse-dot" />
                              Iman viewing
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-border p-4 lg:border-l lg:border-t-0">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Activity
              </p>
              <ul className="mt-3 space-y-3">
                {feed.slice(0, visible).map((f, i) => (
                  <li key={f.who} className="animate-rise flex items-start gap-2">
                    <Avatar name={f.who} index={i} size={20} />
                    <p className="text-[12px] leading-snug text-muted-foreground">
                      <span className="text-foreground">{f.who}</span> {f.text}
                      <span className="ml-1.5 font-mono text-[10px] text-muted-foreground/70">
                        {f.time}
                      </span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
