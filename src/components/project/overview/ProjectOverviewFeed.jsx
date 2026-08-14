import { CheckCircle2, ArrowRight, Layers } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

function ProjectOverviewFeed({ assignedTickets = [], onTicketClick }) {
  const navigate = useNavigate();
  const { slug, project_slug } = useParams();

  // Helper for Kanban Column / Status badges matching your table design
  const getStatusBadge = (column, status) => {
    const val = column || status || "OPEN";
    switch (val) {
      case "DONE":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#3fb950]/30 bg-[#238636]/10 px-2.5 py-0.5 text-xs font-medium text-[#3fb950]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3fb950]" /> Done
          </span>
        );
      case "IN_PROGRESS":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#58a6ff]/30 bg-[#1f6feb]/10 px-2.5 py-0.5 text-xs font-medium text-[#58a6ff]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#58a6ff]" /> In
            Progress
          </span>
        );
      case "REVIEW":
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d29922]/30 bg-[#d29922]/10 px-2.5 py-0.5 text-xs font-medium text-[#e3b341]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#e3b341]" /> Review
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#8b949e]/30 bg-[#8b949e]/10 px-2.5 py-0.5 text-xs font-medium text-[#8b949e]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8b949e]" />{" "}
            {val.replace("_", " ")}
          </span>
        );
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case "URGENT":
        return "text-[#f85149] font-semibold";
      case "HIGH":
        return "text-[#db6d28]";
      case "MEDIUM":
        return "text-[#d29922]";
      default:
        return "text-[#8b949e]";
    }
  };

  return (
    <div className="space-y-6">
      {/* "Assigned to You" Main Developer Feed Box */}
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

        {/* Tickets Stream or Empty State */}
        {assignedTickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#30363d] bg-[#21262d] text-[#3fb950] shadow-inner">
              <CheckCircle2 size={24} />
            </div>
            <h4 className="mt-4 text-sm font-semibold text-[#f0f6fc]">
              You're completely caught up!
            </h4>
            <p className="mt-1 max-w-sm text-xs text-[#8b949e] leading-relaxed">
              There are no pending tickets assigned to you right now. Head over
              to the Kanban board or tickets view to pick up new work items.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {assignedTickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() =>
                  onTicketClick
                    ? onTicketClick(ticket)
                    : navigate(`/${slug}/${project_slug}/tickets`)
                }
                className="group flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-[#21262d] bg-[#0d1117]/60 p-4 transition-all duration-200 hover:border-[#388bfd]/40 hover:bg-[#0d1117] cursor-pointer shadow-sm"
              >
                {/* Left side: Ticket ID, Title & Metadata */}
                <div className="flex items-start gap-3 min-w-0">
                  <span className="mt-0.5 font-mono text-xs font-bold text-[#58a6ff] shrink-0">
                    {ticket.ticket_number}
                  </span>

                  <div className="min-w-0 space-y-1">
                    <p className="truncate text-sm font-semibold text-[#f0f6fc] group-hover:text-[#58a6ff] transition-colors">
                      {ticket.title}
                    </p>

                    <div className="flex flex-wrap items-center gap-2 pt-0.5">
                      {/* Status / Kanban Column Badge */}
                      {getStatusBadge(ticket.kanban_column, ticket.status)}

                      {/* Priority */}
                      <span
                        className={`text-xs font-medium uppercase tracking-wide ${getPriorityStyle(ticket.priority)}`}
                      >
                        • {ticket.priority}
                      </span>

                      {/* Epic Tag if available */}
                      {ticket.epic && (
                        <span className="inline-flex items-center gap-1 rounded-md bg-[#21262d] px-2 py-0.5 text-[11px] font-medium text-[#c9d1d9] border border-[#30363d]">
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{
                              backgroundColor: ticket.epic.color || "#8b949e",
                            }}
                          />
                          {ticket.epic.name}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right side: Story Points & Arrow */}
                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-0 border-[#21262d]">
                  {ticket.story_points && (
                    <span className="inline-flex items-center gap-1 rounded-md bg-[#21262d] px-2 py-1 text-[11px] font-semibold text-[#8b949e] border border-[#30363d]">
                      <Layers size={11} /> {ticket.story_points} SP
                    </span>
                  )}

                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#21262d] text-[#8b949e] transition-colors group-hover:bg-[#388bfd]/15 group-hover:text-[#58a6ff]">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectOverviewFeed;
