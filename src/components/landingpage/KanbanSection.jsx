import { Avatar, ColumnHeader, Priority, SectionHeading } from "./primitives";

const tickets = [
  { id: 121, title: "Split ticket activity into its own service", status: "todo", priority: "medium", assignee: "Devika N", points: 5 },
  { id: 118, title: "Board drag-and-drop keyboard support", status: "todo", priority: "low", assignee: "Ankita Rao", points: 3 },
  { id: 127, title: "Cache repository webhooks payloads", status: "todo", priority: "high", assignee: "Rahul Menon", points: 8 },
  { id: 109, title: "Webhook receiver for push events", status: "dev", priority: "high", assignee: "Rahul Menon", points: 8, meta: "feature/ticket-109" },
  { id: 113, title: "Ticket detail drawer", status: "dev", priority: "medium", assignee: "Iman Sheikh", points: 5, meta: "feature/ticket-113" },
  { id: 108, title: "Dashboard improvements", status: "review", priority: "low", assignee: "Iman Sheikh", points: 2, meta: "PR #44 · 2 reviewers" },
  { id: 105, title: "Org role permissions matrix", status: "review", priority: "high", assignee: "Devika N", points: 5, meta: "PR #43 · 1 approval" },
  { id: 104, title: "Implement API authentication", status: "done", priority: "high", assignee: "Rahul Menon", points: 5, meta: "PR #42 merged" },
  { id: 96, title: "Database setup", status: "done", priority: "medium", assignee: "Ankita Rao", points: 8, meta: "PR #31 merged" },
];

const cols = ["todo", "dev", "review", "done"];

export function KanbanSection() {
  return (
    <section id="features" className="border-b border-border bg-card/30">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <SectionHeading
          label="Kanban project view"
          title="The board your repository keeps in sync."
        />
        <div className="mt-10 panel shadow-panel overflow-hidden">
          <div className="flex flex-wrap items-center gap-3 border-b border-border bg-surface-raised px-4 py-2.5">
            <span className="font-mono text-[11px] text-muted-foreground">axon / board</span>
            <span className="rounded-sm border border-border px-1.5 py-px font-mono text-[10px] text-muted-foreground">
              sprint 12
            </span>
            <span className="ml-auto font-mono text-[10px] text-muted-foreground">
              49 story points
            </span>
          </div>
          <div className="grid gap-4 overflow-x-auto p-4 sm:grid-cols-2 lg:grid-cols-4">
            {cols.map((c) => {
              const items = tickets.filter((t) => t.status === c);
              return (
                <div key={c} className="rounded-md bg-card/60 p-2.5">
                  <ColumnHeader status={c} count={items.length} />
                  <div className="space-y-2.5">
                    {items.map((t) => (
                      <article
                        key={t.id}
                        className="rounded-md border border-border bg-card p-3 transition-colors hover:border-border-strong"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] text-muted-foreground">
                            #{t.id}
                          </span>
                          <Priority level={t.priority} />
                        </div>
                        <h3 className="mt-1.5 text-[12.5px] leading-snug">{t.title}</h3>
                        {t.meta && (
                          <p className="mt-2 truncate font-mono text-[10px] text-muted-foreground">
                            {t.meta}
                          </p>
                        )}
                        <div className="mt-3 flex items-center gap-2 border-t border-border pt-2">
                          <Avatar name={t.assignee} index={t.id} size={18} />
                          <span className="text-[11px] text-muted-foreground">
                            {t.assignee.split(" ")[0]}
                          </span>
                          <span className="ml-auto rounded-sm bg-secondary px-1.5 py-px font-mono text-[10px] text-muted-foreground">
                            {t.points}
                          </span>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
