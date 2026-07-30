import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  X,
  Calendar,
  ListChecks,
  Loader2,
  AlertCircle,
  User,
  ArrowUpRight,
} from "lucide-react";

import { fetchWithAuth } from "../../../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;

const COLUMN_STYLES = {
  TODO: { label: "To Do", text: "text-[#8b949e]", dot: "bg-[#8b949e]" },
  IN_PROGRESS: {
    label: "In Progress",
    text: "text-blue-400",
    dot: "bg-blue-400",
  },
  REVIEW: { label: "Review", text: "text-yellow-400", dot: "bg-yellow-400" },
  DONE: { label: "Done", text: "text-green-400", dot: "bg-green-400" },
};

const PRIORITY_STYLES = {
  LOW: "bg-gray-500/10 text-gray-400 ring-gray-500/20",
  MEDIUM: "bg-blue-500/10 text-blue-400 ring-blue-500/20",
  HIGH: "bg-orange-500/10 text-orange-400 ring-orange-500/20",
  URGENT: "bg-red-500/10 text-red-400 ring-red-500/20",
};

function EpicDetailModal({ epic: epicSummary, onClose }) {
  const [epic, setEpic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const { slug, project_slug } = useParams();

  useEffect(() => {
    let cancelled = false;

    async function fetchEpic() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetchWithAuth(
          `${API}/tickets/${slug}/${project_slug}/epic/${epicSummary.id}`,
          {},
          dispatch,
          accessToken,
        );

        if (!res.ok) throw new Error(`Failed to load epic (${res.status})`);

        const data = await res.json();
        if (!cancelled) setEpic(data.epic);
      } catch (err) {
        if (!cancelled) setError(err.message || "Something went wrong");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchEpic();
    return () => {
      cancelled = true;
    };
  }, [slug, project_slug, epicSummary.id]);

  // Use fetched detail once available, fall back to the summary card data
  const data = epic || epicSummary;
  const createdDate = new Date(data.created_at).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const creator = data.created_by;

  const tickets = epic?.tickets || [];
  const grouped = tickets.reduce((acc, t) => {
    (acc[t.kanban_column] = acc[t.kanban_column] || []).push(t);
    return acc;
  }, {});
  const columnOrder = ["TODO", "IN_PROGRESS", "REVIEW", "DONE"];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-[#30363d] bg-[#161b22] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="relative shrink-0 border-b border-[#21262d] px-6 py-5"
          style={{
            background: `linear-gradient(135deg, ${data.color}14, transparent)`,
          }}
        >
          <div
            className="absolute inset-y-0 left-0 w-[3px]"
            style={{ backgroundColor: data.color }}
          />

          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-md p-1.5 text-[#8b949e] transition hover:bg-[#21262d] hover:text-[#e6edf3]"
          >
            <X size={16} />
          </button>

          <div className="pr-8">
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: data.color }}
              />
              <h2 className="text-lg font-semibold text-[#e6edf3]">
                {data.name}
              </h2>
            </div>
            <p className="mt-1.5 text-sm text-[#8b949e]">
              {data.description || "No description provided."}
            </p>
          </div>

          {/* Meta row */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#8b949e]">
            <Link
              to={`/${creator.username}`}
              className="flex items-center gap-1.5 hover:text-[#e6edf3]"
            >
              <img
                src={creator.avatar}
                alt={creator.username}
                className="h-5 w-5 rounded-full object-cover ring-1 ring-[#30363d]"
              />
              {creator.first_name} {creator.last_name}
            </Link>
            <div className="h-3 w-px bg-[#30363d]" />
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              Created {createdDate}
            </div>
          </div>

          {/* Progress */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-[#8b949e]">
                <ListChecks className="h-3.5 w-3.5" />
                {data.completed_count}/{data.ticket_count} tickets done
              </div>
              <span className="font-semibold text-[#e6edf3]">
                {data.progress}%
              </span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#21262d]">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${data.progress}%`,
                  backgroundColor:
                    data.progress === 100 ? "#22C55E" : data.color,
                }}
              />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {loading && (
            <div className="flex items-center justify-center gap-2 py-10 text-sm text-[#8b949e]">
              <Loader2 className="h-4 w-4 animate-spin" />
              Loading tickets...
            </div>
          )}

          {!loading && error && (
            <div className="flex items-start gap-2 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2.5 text-xs text-red-400">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {error}
            </div>
          )}

          {!loading && !error && tickets.length === 0 && (
            <div className="py-10 text-center text-sm text-[#8b949e]">
              No tickets in this epic yet.
            </div>
          )}

          {!loading && !error && tickets.length > 0 && (
            <div className="space-y-5">
              {columnOrder
                .filter((col) => grouped[col]?.length)
                .map((col) => {
                  const style = COLUMN_STYLES[col] || COLUMN_STYLES.TODO;
                  return (
                    <div key={col}>
                      <div className="mb-2 flex items-center gap-2">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${style.dot}`}
                        />
                        <h4
                          className={`text-xs font-semibold uppercase tracking-wide ${style.text}`}
                        >
                          {style.label}
                        </h4>
                        <span className="text-xs text-[#6e7681]">
                          {grouped[col].length}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        {grouped[col].map((ticket) => (
                          <div
                            key={ticket.id}
                            className="group flex items-center gap-3 rounded-md border border-[#21262d] bg-[#0d1117] px-3 py-2.5 transition hover:border-[#30363d]"
                          >
                            <span className="shrink-0 font-mono text-[11px] text-[#6e7681]">
                              {ticket.ticket_number}
                            </span>

                            <span className="min-w-0 flex-1 truncate text-sm text-[#e6edf3]">
                              {ticket.title}
                            </span>

                            <span
                              className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ${
                                PRIORITY_STYLES[ticket.priority] ||
                                PRIORITY_STYLES.MEDIUM
                              }`}
                            >
                              {ticket.priority}
                            </span>

                            {ticket.assignee ? (
                              <img
                                src={ticket.assignee.avatar}
                                alt={ticket.assignee.username}
                                title={ticket.assignee.username}
                                className="h-5 w-5 shrink-0 rounded-full object-cover ring-1 ring-[#30363d]"
                              />
                            ) : (
                              <div
                                title="Unassigned"
                                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#21262d] text-[#6e7681]"
                              >
                                <User className="h-3 w-3" />
                              </div>
                            )}

                            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[#6e7681] opacity-0 transition group-hover:opacity-100" />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EpicDetailModal;
