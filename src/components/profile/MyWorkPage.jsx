import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  ArrowUpRight,
  Building2,
  User,
  ListChecks,
  AlertTriangle,
} from "lucide-react";
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import ProfileLayout from "../layout/ProfileLayout";

const API = import.meta.env.VITE_API_URL;

const STATUS_LABELS = {
  DONE: "Done",
  IN_PROGRESS: "In Progress",
  REVIEW: "Review",
  DEFAULT: "To Do",
};

function formatStatus(status) {
  return STATUS_LABELS[status] || STATUS_LABELS.DEFAULT;
}

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

function WorkTicketRow({ ticket, onOpen }) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(e) => e.key === "Enter" && onOpen()}
      className="group flex cursor-pointer items-center justify-between gap-4 rounded-md border border-[#21262d] bg-[#0d1117] px-3.5 py-2.5 transition-colors hover:border-[#30363d] hover:bg-[#161b22]"
    >
      <div className="flex min-w-0 items-center gap-3">
        <span className="shrink-0 font-mono text-xs font-semibold text-sky-400">
          {ticket.ticket_number}
        </span>
        <p className="truncate text-xs font-medium text-slate-200 transition-colors group-hover:text-white">
          {ticket.title}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <span className="rounded border border-[#30363d] bg-[#161b22] px-2 py-0.5 text-[11px] font-medium text-slate-400">
          {formatStatus(ticket.status || ticket.kanban_column)}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpen();
          }}
          aria-label="Open ticket"
          title="Open ticket"
          className="text-slate-500 transition-colors hover:text-sky-400"
        >
          <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
}

function ProjectGroup({ group, onOpenProject, onOpenTicket }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[#30363d] bg-[#161b22]">
      <div className="flex items-center justify-between border-b border-[#21262d] bg-[#0d1117] px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={`inline-flex shrink-0 items-center gap-1 rounded border px-1.5 py-0.5 text-[10px] font-medium ${
              group.is_organization
                ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
                : "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
            }`}
          >
            {group.is_organization ? (
              <Building2 size={10} />
            ) : (
              <User size={10} />
            )}
            {group.workspace_name}
          </span>
          <span className="text-slate-600">/</span>
          <h3 className="truncate text-xs font-semibold text-slate-200">
            {group.project_name}
          </h3>
          <span className="shrink-0 rounded bg-[#21262d] px-1.5 py-0.2 text-[10px] font-medium text-slate-400 border border-[#30363d]">
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

      <div className="space-y-1.5 p-2.5">
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
    <div className="flex flex-col gap-4 border-b border-[#21262d] pb-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2">
        <ListChecks className="text-sky-400" size={18} />
        <h1 className="text-sm font-semibold text-slate-100">My Work</h1>
      </div>

      <div className="flex items-center gap-6 text-xs text-slate-400">
        <div>
          Open: <strong className="font-semibold text-sky-400">{open}</strong>
        </div>
        <div>
          Completed:{" "}
          <strong className="font-semibold text-emerald-400">
            {completed}
          </strong>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-28 overflow-hidden rounded-full bg-[#21262d]">
            <div
              className="h-full rounded-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${rate}%` }}
            />
          </div>
          <span className="text-[11px] font-semibold text-slate-300">
            {rate}%
          </span>
        </div>
      </div>
    </div>
  );
}

function EmptyWorkState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-[#30363d] bg-[#161b22] py-16 text-center">
      <CheckCircle2 size={24} className="text-emerald-400" />
      <h3 className="mt-2 text-xs font-semibold text-slate-200">
        No assigned tasks found
      </h3>
      <p className="mt-1 text-[11px] text-slate-400">
        You have no active or completed tasks assigned across your workspaces.
      </p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#30363d] border-t-sky-400" />
      <p className="text-xs text-slate-400">Loading your work dashboard...</p>
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-rose-500/20 bg-rose-500/5 py-16 text-center">
      <AlertTriangle size={18} className="text-rose-400" />
      <p className="text-xs font-medium text-rose-400">{message}</p>
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
      <div className="space-y-5">
        <SummaryBar
          open={summary.open || 0}
          completed={summary.completed || 0}
        />

        {tickets.length === 0 ? (
          <EmptyWorkState />
        ) : (
          <div className="space-y-4">
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
