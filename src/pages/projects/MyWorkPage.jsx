import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  ArrowUpRight,
  Building2,
  User,
  Layers,
  ListChecks,
  Flag,
  Bug,
  Sparkles,
  Wrench,
  CalendarClock,
  AlertTriangle,
} from "lucide-react";
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import ProfileLayout from "../../components/shared/ProfileLayout";

const API = import.meta.env.VITE_API_URL;

/* 
  Refined to use softer, desaturated tone palettes (GitHub Dark / Linear style) 
  to eliminate eye strain while maintaining clear visual hierarchy.
*/
const STATUS_CONFIG = {
  DONE: {
    label: "Done",
    dot: "bg-emerald-400",
    text: "text-emerald-400",
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/10",
  },
  IN_PROGRESS: {
    label: "In Progress",
    dot: "bg-sky-400",
    text: "text-sky-400",
    border: "border-sky-500/20",
    bg: "bg-sky-500/10",
  },
  REVIEW: {
    label: "Review",
    dot: "bg-amber-400",
    text: "text-amber-400",
    border: "border-amber-500/20",
    bg: "bg-amber-500/10",
  },
  DEFAULT: {
    label: "To Do",
    dot: "bg-slate-400",
    text: "text-slate-400",
    border: "border-slate-500/20",
    bg: "bg-slate-500/10",
  },
};
const getStatusConfig = (key) => STATUS_CONFIG[key] ?? STATUS_CONFIG.DEFAULT;

const PRIORITY_CONFIG = {
  HIGH: { label: "High", color: "#f87171" }, // Softened red
  MEDIUM: { label: "Medium", color: "#fbbf24" }, // Softened amber
  LOW: { label: "Low", color: "#94a3b8" }, // Muted slate
};
const getPriorityConfig = (key) => PRIORITY_CONFIG[key] ?? PRIORITY_CONFIG.LOW;

const TYPE_CONFIG = {
  BUG: { label: "Bug", icon: Bug, color: "#f87171" },
  FEATURE: { label: "Feature", icon: Sparkles, color: "#60a5fa" },
  DEFAULT: { label: "Task", icon: Wrench, color: "#94a3b8" },
};
const getTypeConfig = (key) => TYPE_CONFIG[key] ?? TYPE_CONFIG.DEFAULT;

const formatDueDate = (dateString) =>
  new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

function groupTicketsByProject(tickets) {
  const groups = tickets.reduce((acc, ticket) => {
    const key = ticket.project_slug;
    if (!acc[key]) {
      acc[key] = {
        project_name: ticket.project_name,
        project_slug: ticket.project_slug,
        workspace_slug: ticket.workspace_slug,
        workspace_name: ticket.workspace_name,
        is_organization: ticket.is_organization,
        items: [],
      };
    }
    acc[key].items.push(ticket);
    return acc;
  }, {});
  return Object.values(groups);
}

function StatusBadge({ column, status }) {
  const config = getStatusConfig(column || status);
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${config.border} ${config.bg} px-2 py-0.5 text-[10.5px] font-medium ${config.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}

function TypeIcon({ type }) {
  const config = getTypeConfig(type);
  const Icon = config.icon;
  return (
    <span
      className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-[#30363d] bg-[#161b22]"
      title={config.label}
    >
      <Icon size={12} style={{ color: config.color }} />
    </span>
  );
}

function PriorityFlag({ priority }) {
  const config = getPriorityConfig(priority);
  return (
    <span
      className="inline-flex items-center gap-1 text-[10.5px] font-medium"
      style={{ color: config.color }}
      title={`${config.label} priority`}
    >
      <Flag size={11} fill={config.color} stroke="none" />
      {config.label}
    </span>
  );
}

function EpicTag({ name, color }) {
  if (!name) return null;
  return (
    <span
      className="inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-medium"
      style={{
        borderColor: `${color}30`,
        backgroundColor: `${color}10`,
        color,
      }}
    >
      {name}
    </span>
  );
}

function DueDateChip({ dueDate, isDone }) {
  if (!dueDate) return null;
  const due = new Date(dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isOverdue = !isDone && due < today;

  return (
    <span
      className={`inline-flex items-center gap-1 text-[10.5px] font-medium ${isOverdue ? "text-rose-400" : "text-slate-400"}`}
    >
      <CalendarClock size={11} />
      {isOverdue ? "Overdue" : formatDueDate(dueDate)}
    </span>
  );
}

function WorkTicketRow({ ticket, onOpen }) {
  const isDone = ticket.status === "DONE";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => e.key === "Enter" && onOpen()}
      className="group flex cursor-pointer flex-col gap-2.5 rounded-lg border border-[#21262d] bg-[#0d1117]/60 p-3 transition-all hover:border-sky-500/30 hover:bg-[#161b22]/80 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex min-w-0 items-start gap-2.5">
        <TypeIcon type={ticket.type} />
        <div className="min-w-0 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="shrink-0 font-mono text-[11px] font-semibold text-sky-400">
              {ticket.ticket_number}
            </span>
            <p className="truncate text-[13px] font-medium text-slate-200 transition-colors group-hover:text-white">
              {ticket.title}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge column={ticket.kanban_column} status={ticket.status} />
            <PriorityFlag priority={ticket.priority} />
            <EpicTag name={ticket.epic_name} color={ticket.epic_color} />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-[#21262d] pt-2 sm:justify-end sm:border-0 sm:pt-0">
        <div className="flex items-center gap-3">
          {ticket.story_points && (
            <span className="inline-flex items-center gap-1 text-[10.5px] text-slate-400">
              <Layers size={11} /> {ticket.story_points} SP
            </span>
          )}
          <DueDateChip dueDate={ticket.due_date} isDone={isDone} />
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          aria-label="Open ticket"
          title="Open ticket"
          className="inline-flex items-center justify-center rounded-md border border-[#30363d] bg-[#161b22] p-1.5 text-slate-400 transition-all hover:border-sky-500 hover:bg-sky-500/10 hover:text-sky-300"
        >
          <ArrowUpRight size={13} />
        </button>
      </div>
    </div>
  );
}

function ProjectGroup({ group, onOpenProject, onOpenTicket }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#30363d] bg-[#161b22]/90 shadow-sm">
      <div className="flex items-center justify-between border-b border-[#21262d] bg-[#0d1117]/80 px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span
            className={`inline-flex shrink-0 items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] font-semibold ${
              group.is_organization
                ? "border-amber-500/20 bg-amber-500/10 text-amber-300/90"
                : "border-emerald-500/20 bg-emerald-500/10 text-emerald-300/90"
            }`}
          >
            {group.is_organization ? (
              <Building2 size={10} />
            ) : (
              <User size={10} />
            )}
            {group.workspace_name}
          </span>
          <h3 className="truncate text-[13px] font-semibold text-slate-100">
            {group.project_name}
          </h3>
          <span className="shrink-0 rounded-full bg-[#21262d] px-2 py-0.2 text-[10px] font-medium text-slate-400 border border-[#30363d]">
            {group.items.length}
          </span>
        </div>

        <button
          type="button"
          onClick={onOpenProject}
          className="inline-flex shrink-0 items-center gap-1 text-[11px] font-medium text-sky-400 transition-colors hover:text-sky-300"
        >
          Project board
          <ArrowUpRight size={12} />
        </button>
      </div>

      <div className="space-y-1.5 p-3">
        {group.items.map((ticket) => (
          <WorkTicketRow
            key={ticket.id}
            ticket={ticket}
            onOpen={() => onOpenTicket(ticket)}
          />
        ))}
      </div>
    </div>
  );
}

function SummaryBar({ open, completed }) {
  const total = open + completed;
  const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="flex flex-col gap-4 border-b border-[#21262d] pb-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <ListChecks className="text-sky-400" size={18} />
          <h1 className="text-base font-semibold text-slate-100">
            My Work Hub
          </h1>
        </div>
        <p className="mt-0.5 text-[11.5px] text-slate-400">
          Every issue assigned to you, across personal and organization
          projects.
        </p>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-4 text-[11.5px]">
          <span className="text-slate-400">
            Open{" "}
            <strong className="ml-1 font-semibold text-slate-200">
              {open}
            </strong>
          </span>
          <span className="text-slate-400">
            Completed{" "}
            <strong className="ml-1 font-semibold text-emerald-400">
              {completed}
            </strong>
          </span>
        </div>

        <div className="flex w-32 flex-col gap-1">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#21262d]">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${rate}%` }}
            />
          </div>
          <span className="text-right text-[10px] font-medium text-slate-400">
            {rate}% complete
          </span>
        </div>
      </div>
    </div>
  );
}

function EmptyWorkState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-[#30363d] bg-[#161b22] py-16 text-center">
      <CheckCircle2 size={28} className="text-emerald-400" />
      <h3 className="mt-3 text-sm font-semibold text-slate-100">
        No assigned tasks found
      </h3>
      <p className="mt-1 text-xs text-slate-400">
        You have no active or completed tasks assigned across your workspaces.
      </p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#30363d] border-t-sky-400" />
      <p className="text-sm text-slate-400">Loading your work dashboard...</p>
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/5 py-20 text-center">
      <AlertTriangle size={20} className="text-rose-400" />
      <p className="text-sm font-medium text-rose-400">{message}</p>
    </div>
  );
}

function MyWorkPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const currentUser = useSelector((state) => state.auth.user);

  const [workData, setWorkData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchMyWork = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetchWithAuth(
          `${API}/auth/my/work/`,
          {},
          dispatch,
          accessToken,
        );
        if (!res.ok) throw new Error("Failed to fetch my work tickets");
        const data = await res.json();
        if (isMounted) setWorkData(data);
      } catch (err) {
        if (isMounted) setError(err.message || "Something went wrong");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMyWork();
    return () => {
      isMounted = false;
    };
  }, [dispatch, accessToken]);

  if (loading) {
    return (
      <ProfileLayout user={currentUser}>
        <LoadingState />
      </ProfileLayout>
    );
  }

  if (error) {
    return (
      <ProfileLayout user={currentUser}>
        <ErrorState message={error} />
      </ProfileLayout>
    );
  }

  const { tickets = [], summary = {} } = workData || {};
  const groups = groupTicketsByProject(tickets);

  return (
    <ProfileLayout user={currentUser}>
      <div className="space-y-6">
        <SummaryBar
          open={summary.open || 0}
          completed={summary.completed || 0}
        />

        {tickets.length === 0 ? (
          <EmptyWorkState />
        ) : (
          <div className="space-y-5">
            {groups.map((group) => (
              <ProjectGroup
                key={group.project_slug}
                group={group}
                onOpenProject={() =>
                  navigate(
                    `/${group.workspace_slug}/${group.project_slug}/tickets`,
                  )
                }
                onOpenTicket={(ticket) =>
                  navigate(
                    `/${group.workspace_slug}/${group.project_slug}/tickets?openTicket=${ticket.id}`,
                  )
                }
              />
            ))}
          </div>
        )}
      </div>
    </ProfileLayout>
  );
}

export default MyWorkPage;
