import {
  Layers,
  CheckCircle2,
  Clock,
  Users,
  ArrowRight,
  CircleDot,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

function ProjectStatsCard({
  tickets = [],
  members = [],
  onViewAllMembers,
  onViewAllTickets,
}) {
  const navigate = useNavigate();
  const { slug, project_slug } = useParams();

  const totalTickets = tickets.length;

  const isDone = (t) => t.status === "DONE" || t.kanban_column === "DONE";
  const isInProgress = (t) =>
    t.status === "IN_PROGRESS" || t.kanban_column === "IN_PROGRESS";

  const doneTickets = tickets.filter(isDone).length;
  const inProgressTickets = tickets.filter(isInProgress).length;
  const openTickets = totalTickets - doneTickets - inProgressTickets;

  const completionPercentage =
    totalTickets > 0 ? Math.round((doneTickets / totalTickets) * 100) : 0;

  const totalMembers = members.length;

  const formattedMembers = members.map((m) => ({
    id: m.id,
    name:
      m.first_name && m.last_name
        ? `${m.first_name} ${m.last_name}`
        : m.username || "Team Member",
    role: m.role || "Developer",
    avatar: m.avatar || null,
    username: m.username,
  }));

  const ticketCountByMember = tickets.reduce((acc, t) => {
    const assigneeId = t.assignee?.id || t.assignee_id;
    if (assigneeId) acc[assigneeId] = (acc[assigneeId] || 0) + 1;
    return acc;
  }, {});

  const rankedMembers = [...formattedMembers]
    .sort((a, b) => {
      const aCount = ticketCountByMember[a.id] ?? 0;
      const bCount = ticketCountByMember[b.id] ?? 0;
      return bCount - aCount;
    })
    .slice(0, 3);

  const handleViewAllMembers = () => {
    if (onViewAllMembers) return onViewAllMembers();
    navigate(`/${slug}/${project_slug}/members`);
  };

  const handleViewAllTickets = () => {
    if (onViewAllTickets) return onViewAllTickets();
    navigate(`/${slug}/${project_slug}/tickets`);
  };

  const getInitials = (name = "") =>
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((n) => n[0]?.toUpperCase())
      .join("");

  return (
    /* Stack the cards vertically */
    <div className="flex flex-col gap-5">
      {/* 1. Ticket Progress Card */}
      <div className="rounded-2xl border border-[#30363d] bg-[#161b22] p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#21262d] text-[#58a6ff] ring-1 ring-[#30363d]">
              <Layers size={14} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#c9d1d9]">
              Ticket Progress
            </span>
          </div>

          <button
            type="button"
            onClick={handleViewAllTickets}
            className="flex items-center gap-1 text-xs font-medium text-[#58a6ff] hover:underline"
          >
            View all ({totalTickets})
            <ArrowRight size={12} />
          </button>
        </div>

        <div className="mt-4 flex items-baseline gap-2.5">
          <span className="text-3xl font-extrabold tracking-tight text-[#f0f6fc]">
            {completionPercentage}%
          </span>
          <span className="text-xs font-medium text-[#3fb950]">completed</span>
        </div>

        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#21262d] p-0.5">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#238636] to-[#3fb950] transition-all duration-700"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-[#21262d] pt-3">
          <div>
            <div className="flex items-center gap-1 text-[#8b949e]">
              <CheckCircle2 size={11} className="text-[#3fb950]" />
              <span className="text-[10px] font-semibold uppercase">Done</span>
            </div>
            <p className="mt-0.5 text-base font-bold text-[#f0f6fc]">
              {doneTickets}
            </p>
          </div>

          <div className="border-x border-[#21262d] px-2">
            <div className="flex items-center gap-1 text-[#8b949e]">
              <Clock size={11} className="text-[#58a6ff]" />
              <span className="text-[10px] font-semibold uppercase">
                Active
              </span>
            </div>
            <p className="mt-0.5 text-base font-bold text-[#f0f6fc]">
              {inProgressTickets}
            </p>
          </div>

          <div className="pl-1">
            <div className="flex items-center gap-1 text-[#8b949e]">
              <CircleDot size={11} className="text-[#d29922]" />
              <span className="text-[10px] font-semibold uppercase">Open</span>
            </div>
            <p className="mt-0.5 text-base font-bold text-[#f0f6fc]">
              {openTickets}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Active Contributors Card */}
      <div className="rounded-2xl border border-[#30363d] bg-[#161b22] p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#21262d] text-[#58a6ff] ring-1 ring-[#30363d]">
              <Users size={14} />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#c9d1d9]">
              Active Contributors
            </span>
          </div>

          <button
            type="button"
            onClick={handleViewAllMembers}
            className="flex items-center gap-1 text-xs font-medium text-[#58a6ff] hover:underline"
          >
            View all ({totalMembers})
            <ArrowRight size={12} />
          </button>
        </div>

        <div className="mt-4 space-y-2.5">
          {rankedMembers.length === 0 && (
            <p className="text-xs text-[#8b949e]">No team members found.</p>
          )}

          {rankedMembers.map((member) => {
            const assignedCount = ticketCountByMember[member.id] || 0;
            return (
              <div
                key={member.id}
                className="flex items-center justify-between rounded-xl border border-[#21262d] bg-[#0d1117]/60 p-2.5"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  {member.avatar ? (
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-[#30363d]"
                    />
                  ) : (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1f6feb]/20 text-xs font-bold text-[#58a6ff] ring-1 ring-[#30363d]">
                      {getInitials(member.name)}
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-[#f0f6fc]">
                      {member.name}
                    </p>
                    <p className="truncate text-[11px] text-[#8b949e]">
                      @{member.username}
                    </p>
                  </div>
                </div>

                <span className="shrink-0 rounded bg-[#21262d] px-2 py-0.5 text-[11px] font-medium text-[#8b949e]">
                  {assignedCount} {assignedCount === 1 ? "ticket" : "tickets"}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProjectStatsCard;
