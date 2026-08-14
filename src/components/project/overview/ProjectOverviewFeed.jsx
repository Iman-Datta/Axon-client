import { CheckCircle2, ArrowRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const STATUS_CONFIG = {
  DONE: {
    label: "Done",
    dot: "bg-[#3fb950]",
    text: "text-[#3fb950]",
    border: "border-[#3fb950]/35",
    bg: "bg-[#238636]/10",
  },
  IN_PROGRESS: {
    label: "In Progress",
    dot: "bg-[#58a6ff]",
    text: "text-[#58a6ff]",
    border: "border-[#58a6ff]/35",
    bg: "bg-[#1f6feb]/10",
  },
  REVIEW: {
    label: "Review",
    dot: "bg-[#e3b341]",
    text: "text-[#e3b341]",
    border: "border-[#d29922]/35",
    bg: "bg-[#d29922]/10",
  },
  DEFAULT: {
    label: "To Do",
    dot: "bg-[#8b949e]",
    text: "text-[#8b949e]",
    border: "border-[#8b949e]/35",
    bg: "bg-[#8b949e]/10",
  },
};

function StatusBadge({ column, status }) {
  const key = column || status || "DEFAULT";
  const config = STATUS_CONFIG[key] ?? STATUS_CONFIG.DEFAULT;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${config.border} ${config.bg} px-2.5 py-0.5 text-xs font-medium ${config.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {config.label}
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

  const handleViewAll = () => {
    navigate(`/${slug}/${project_slug}/tickets?filter=assigned`);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[#30363d] bg-[#161b22] shadow-xl">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-[#21262d] px-6 py-5">
        <div className="flex items-center gap-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#c9d1d9]">
            Assigned to You
          </h3>
          <span className="inline-flex items-center rounded-full bg-[#21262d] px-2.5 py-0.5 text-xs font-semibold text-[#8b949e] border border-[#30363d]">
            {assignedTickets.length}
          </span>
        </div>

        <button
          type="button"
          onClick={handleViewAll}
          className="group flex items-center gap-1.5 text-xs font-semibold text-[#58a6ff] transition-colors hover:text-white"
        >
          View all tickets
          <ArrowRight
            size={13}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </button>
      </div>

      {/* Content Area */}
      <div className="p-5">
        {assignedTickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#30363d] bg-[#21262d] text-[#3fb950] shadow-inner">
              <CheckCircle2 size={22} />
            </div>
            <h4 className="mt-3.5 text-sm font-semibold text-[#f0f6fc]">
              You're completely caught up!
            </h4>
            <p className="mt-1 max-w-xs text-xs leading-relaxed text-[#8b949e]">
              No active issues are assigned to your profile right now. Enjoy the
              downtime or browse the backlog.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {assignedTickets.slice(0, 4).map((ticket) => (
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
                className="group flex cursor-pointer items-center justify-between rounded-xl border border-[#21262d] bg-[#0d1117]/50 px-4 py-3.5 transition-all duration-200 hover:border-[#388bfd]/50 hover:bg-[#0d1117] focus:outline-none focus:ring-2 focus:ring-[#388bfd]/50"
              >
                {/* Left side: Ticket Number & Clean Title */}
                <div className="flex min-w-0 items-center gap-3.5">
                  <span className="shrink-0 font-mono text-xs font-bold text-[#58a6ff]">
                    {ticket.ticket_number}
                  </span>

                  <p className="truncate text-sm font-medium text-[#c9d1d9] transition-colors group-hover:text-[#f0f6fc]">
                    {ticket.title}
                  </p>
                </div>

                {/* Right side: Status Badge & Interactive Arrow */}
                <div className="flex shrink-0 items-center gap-4 pl-3">
                  <StatusBadge
                    column={ticket.kanban_column}
                    status={ticket.status}
                  />

                  <div className="flex h-6 w-6 items-center justify-center rounded-md text-[#8b949e] transition-all group-hover:bg-[#388bfd]/10 group-hover:text-[#58a6ff]">
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
