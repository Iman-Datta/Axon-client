import { CheckCircle2, ArrowRight, Layers, CalendarClock } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const STATUS_CONFIG = {
  DONE: {
    label: "Done",
    dot: "bg-[#3fb950]",
    text: "text-[#3fb950]",
    border: "border-[#3fb950]/30",
    bg: "bg-[#238636]/10",
  },
  IN_PROGRESS: {
    label: "In Progress",
    dot: "bg-[#58a6ff]",
    text: "text-[#58a6ff]",
    border: "border-[#58a6ff]/30",
    bg: "bg-[#1f6feb]/10",
  },
  REVIEW: {
    label: "Review",
    dot: "bg-[#e3b341]",
    text: "text-[#e3b341]",
    border: "border-[#d29922]/30",
    bg: "bg-[#d29922]/10",
  },
  DEFAULT: {
    dot: "bg-[#8b949e]",
    text: "text-[#8b949e]",
    border: "border-[#8b949e]/30",
    bg: "bg-[#8b949e]/10",
  },
};

const PRIORITY_STYLES = {
  URGENT: "text-[#f85149] font-semibold",
  HIGH: "text-[#db6d28]",
  MEDIUM: "text-[#d29922]",
  DEFAULT: "text-[#8b949e]",
};

function StatusBadge({ column, status }) {
  const key = column || status || "OPEN";
  const config = STATUS_CONFIG[key] ?? STATUS_CONFIG.DEFAULT;
  const label = config.label ?? key.replace("_", " ");

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${config.border} ${config.bg} px-2.5 py-0.5 text-xs font-medium ${config.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} /> {label}
    </span>
  );
}

function formatDueDate(dueDate) {
  if (!dueDate) return null;
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(new Date(dueDate));
}

function DueDateBadge({ dueDate, isDone }) {
  if (!dueDate) return null;
  const isOverdue = !isDone && new Date(dueDate) < new Date();

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium ${
        isOverdue
          ? "border border-[#f85149]/30 bg-[#f85149]/10 text-[#f85149]"
          : "border border-[#30363d] bg-[#21262d] text-[#8b949e]"
      }`}
    >
      <CalendarClock size={11} /> {formatDueDate(dueDate)}
    </span>
  );
}

function ProjectOverviewFeed({ assignedTickets = [], onTicketClick }) {
  const navigate = useNavigate();
  const { slug, project_slug } = useParams();

  const handleTicketActivate = (ticket) => {
    if (onTicketClick) {
      onTicketClick(ticket);
    } else {
      navigate(`/${slug}/${project_slug}/tickets`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#30363d] bg-[#161b22] p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-[#21262d] pb-4">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#c9d1d9]">
              Assigned to You
            </h3>
            <p className="mt-0.5 text-xs text-[#8b949e]">
              Active tasks and deliverables currently assigned to your profile
            </p>
          </div>

          <span className="inline-flex items-center rounded-full bg-[#21262d] px-3 py-1 text-xs font-semibold text-[#f0f6fc] ring-1 ring-[#30363d]">
            {assignedTickets.length}{" "}
            {assignedTickets.length === 1 ? "task" : "tasks"}
          </span>
        </div>

        {assignedTickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#30363d] bg-[#21262d] text-[#3fb950] shadow-inner">
              <CheckCircle2 size={24} />
            </div>
            <h4 className="mt-4 text-sm font-semibold text-[#f0f6fc]">
              You're completely caught up!
            </h4>
            <p className="mt-1 max-w-sm text-xs leading-relaxed text-[#8b949e]">
              There are no pending tickets assigned to you right now. Head over
              to the Kanban board or tickets view to pick up new work items.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {assignedTickets.map((ticket) => {
              const isDone =
                ticket.status === "DONE" || ticket.kanban_column === "DONE";

              return (
                <div
                  key={ticket.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleTicketActivate(ticket)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleTicketActivate(ticket);
                    }
                  }}
                  className="group flex cursor-pointer flex-col gap-3 rounded-xl border border-[#21262d] bg-[#0d1117]/60 p-4 shadow-sm transition-all duration-200 hover:border-[#388bfd]/40 hover:bg-[#0d1117] focus:outline-none focus:ring-2 focus:ring-[#388bfd]/50 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <span className="mt-0.5 shrink-0 font-mono text-xs font-bold text-[#58a6ff]">
                      {ticket.ticket_number}
                    </span>

                    <div className="min-w-0 space-y-1">
                      <p className="truncate text-sm font-semibold text-[#f0f6fc] transition-colors group-hover:text-[#58a6ff]">
                        {ticket.title}
                      </p>

                      <div className="flex flex-wrap items-center gap-2 pt-0.5">
                        <StatusBadge
                          column={ticket.kanban_column}
                          status={ticket.status}
                        />

                        <span
                          className={`text-xs font-medium uppercase tracking-wide ${PRIORITY_STYLES[ticket.priority] ?? PRIORITY_STYLES.DEFAULT}`}
                        >
                          • {ticket.priority}
                        </span>

                        {ticket.epic && (
                          <span className="inline-flex items-center gap-1 rounded-md border border-[#30363d] bg-[#21262d] px-2 py-0.5 text-[11px] font-medium text-[#c9d1d9]">
                            <span
                              className="h-1.5 w-1.5 rounded-full"
                              style={{
                                backgroundColor: ticket.epic.color || "#8b949e",
                              }}
                            />
                            {ticket.epic.name}
                          </span>
                        )}

                        <DueDateBadge
                          dueDate={ticket.due_date}
                          isDone={isDone}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-3 border-t border-[#21262d] pt-2 sm:justify-end sm:border-0 sm:pt-0">
                    {ticket.story_points && (
                      <span className="inline-flex items-center gap-1 rounded-md border border-[#30363d] bg-[#21262d] px-2 py-1 text-[11px] font-semibold text-[#8b949e]">
                        <Layers size={11} /> {ticket.story_points} SP
                      </span>
                    )}

                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#21262d] text-[#8b949e] transition-colors group-hover:bg-[#388bfd]/15 group-hover:text-[#58a6ff]">
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectOverviewFeed;
