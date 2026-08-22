import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FaCodeCommit,
  FaGitAlt,
  FaCodePullRequest,
  FaGithub,
  FaClock,
  FaCirclePlus,
  FaUserPlus,
  FaUserMinus,
  FaArrowRight,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";
import { LuActivity, LuLoader, LuCircleAlert } from "react-icons/lu";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;

// Icon badges keep a distinct color per event type — that's the "at a glance"
// signal. Body text stays neutral gray/white; links are plain chips that only
// pick up color on hover. Color is a signal, not a background fill.
const VERB_ICON_COLOR = {
  TICKET_CREATED: "text-emerald-400",
  TICKET_STATUS_CHANGED: "text-amber-400",
  TICKET_COLUMN_CHANGED: "text-blue-400",
  TICKET_ASSIGNED: "text-sky-400",
  TICKET_UNASSIGNED: "text-[#8b949e]",
  TICKET_GITHUB_PUSH: "text-purple-400",
  TICKET_GITHUB_PR_OPENED: "text-emerald-400",
  TICKET_GITHUB_PR_MERGED: "text-purple-400",
  default: "text-[#8b949e]",
};

const STATUS_COLORS = {
  DONE: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/25",
  IN_PROGRESS: "bg-blue-500/10 text-blue-400 ring-blue-500/25",
  BLOCKED: "bg-red-500/10 text-red-400 ring-red-500/25",
  REVIEW: "bg-purple-500/10 text-purple-300 ring-purple-500/25",
  OPEN: "bg-[#161b22] text-[#8b949e] ring-[#30363d]",
  TODO: "bg-[#161b22] text-[#8b949e] ring-[#30363d]",
  CANCELLED: "bg-[#161b22] text-[#6e7681] ring-[#30363d]",
};

function StatusPill({ value }) {
  const cls = STATUS_COLORS[value] || STATUS_COLORS.OPEN;
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide ring-1 ${cls}`}
    >
      {value?.replace(/_/g, " ")}
    </span>
  );
}

function Avatar({ actor, githubUsername, size = "h-6 w-6" }) {
  if (actor?.avatar) {
    return (
      <img
        src={actor.avatar}
        alt={actor.first_name || actor.username}
        className={`${size} shrink-0 rounded-full ring-1 ring-[#30363d]`}
      />
    );
  }

  if (githubUsername) {
    return (
      <img
        src={`https://github.com/${githubUsername}.png?size=64`}
        alt={githubUsername}
        onError={(e) => {
          e.currentTarget.style.display = "none";
          if (e.currentTarget.nextSibling) {
            e.currentTarget.nextSibling.style.display = "flex";
          }
        }}
        className={`${size} shrink-0 rounded-full ring-1 ring-[#30363d]`}
      />
    );
  }

  return (
    <div
      className={`${size} flex shrink-0 items-center justify-center rounded-full bg-[#161b22] text-[9px] font-semibold text-[#8b949e] ring-1 ring-[#30363d]`}
    >
      {(actor?.first_name?.[0] || actor?.username?.[0] || "S").toUpperCase()}
    </div>
  );
}

export default function ActivityTicket({ ticketId }) {
  const { slug, project_slug } = useParams();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ticketId || !slug || !project_slug) return;

    const fetchActivities = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchWithAuth(
          `${API}/activities/${slug}/${project_slug}/ticket/${ticketId}`,
          { method: "GET" },
          dispatch,
          accessToken,
        );

        if (!res.ok) throw new Error("Failed to load activity logs");

        const data = await res.json();

        let items = [];
        if (data?.results?.results && Array.isArray(data.results.results)) {
          items = data.results.results;
        } else if (Array.isArray(data?.results)) {
          items = data.results;
        } else if (Array.isArray(data)) {
          items = data;
        }

        setActivities(items);
      } catch (err) {
        setError(err.message || "Could not load activities");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [ticketId, slug, project_slug, accessToken, dispatch]);

  const getGithubUsername = (metadata) =>
    metadata?.pusher_username ||
    metadata?.sender_username ||
    metadata?.merged_by ||
    null;

  const renderActivityDetails = (item) => {
    const { verb, metadata, actor } = item;
    const githubUsername = getGithubUsername(metadata);
    const actorName = actor
      ? `${actor.first_name} ${actor.last_name}`.trim() || actor.username
      : githubUsername || "System";
    const iconColor = VERB_ICON_COLOR[verb] || VERB_ICON_COLOR.default;

    switch (verb) {
      case "TICKET_CREATED":
        return {
          icon: <FaCirclePlus className={`h-3 w-3 ${iconColor}`} />,
          avatar: <Avatar actor={actor} />,
          text: (
            <span>
              <strong className="font-medium text-[#e6edf3]">
                {actorName}
              </strong>{" "}
              <span className="text-[#8b949e]">created this ticket</span>
            </span>
          ),
        };

      case "TICKET_STATUS_CHANGED":
        return {
          icon: <FaClock className={`h-3 w-3 ${iconColor}`} />,
          avatar: <Avatar actor={actor} />,
          text: (
            <span>
              <strong className="font-medium text-[#e6edf3]">
                {actorName}
              </strong>{" "}
              <span className="text-[#8b949e]">changed status</span>{" "}
              <span className="inline-flex items-center gap-1.5 align-middle">
                <StatusPill value={metadata?.old_status} />
                <FaArrowRight className="h-2.5 w-2.5 text-[#484f58]" />
                <StatusPill value={metadata?.new_status} />
              </span>
            </span>
          ),
        };

      case "TICKET_COLUMN_CHANGED":
        return {
          icon: <FaArrowRight className={`h-3 w-3 ${iconColor}`} />,
          avatar: <Avatar actor={actor} githubUsername={githubUsername} />,
          text: (
            <span>
              <strong className="font-medium text-[#e6edf3]">
                {actorName}
              </strong>{" "}
              <span className="text-[#8b949e]">moved ticket</span>{" "}
              <span className="inline-flex items-center gap-1.5 align-middle font-mono text-[11px]">
                <span className="text-[#8b949e]">{metadata?.old_column}</span>
                <FaArrowRight className="h-2.5 w-2.5 text-[#484f58]" />
                <span className="text-[#c9d1d9]">{metadata?.new_column}</span>
              </span>
              {metadata?.trigger === "github_branch_created" && (
                <span className="ml-1.5 inline-flex items-center gap-1 text-[11px] text-[#6e7681]">
                  <FaGithub className="h-3 w-3" />
                  branch{" "}
                  <span className="font-mono text-[#8b949e]">
                    {metadata?.branch_name}
                  </span>{" "}
                  created
                </span>
              )}
            </span>
          ),
        };

      case "TICKET_ASSIGNED":
        return {
          icon: <FaUserPlus className={`h-3 w-3 ${iconColor}`} />,
          avatar: <Avatar actor={actor} />,
          text: (
            <span>
              <strong className="font-medium text-[#e6edf3]">
                {actorName}
              </strong>{" "}
              <span className="text-[#8b949e]">assigned this ticket to</span>{" "}
              <strong className="font-medium text-[#c9d1d9]">
                {metadata?.assignee_name || "a user"}
              </strong>
            </span>
          ),
        };

      case "TICKET_UNASSIGNED":
        return {
          icon: <FaUserMinus className={`h-3 w-3 ${iconColor}`} />,
          avatar: <Avatar actor={actor} />,
          text: (
            <span>
              <strong className="font-medium text-[#e6edf3]">
                {actorName}
              </strong>{" "}
              <span className="text-[#8b949e]">unassigned this ticket</span>
            </span>
          ),
        };

      case "TICKET_GITHUB_PUSH": {
        const extra =
          metadata?.commit_count > 1
            ? ` +${metadata.commit_count - 1} more`
            : "";
        return {
          icon: <FaCodeCommit className={`h-3 w-3 ${iconColor}`} />,
          avatar: <Avatar githubUsername={githubUsername} />,
          text: (
            <span>
              <strong className="font-medium text-[#e6edf3]">
                {actorName}
              </strong>{" "}
              <span className="text-[#8b949e]">pushed</span>{" "}
              <a
                href={metadata?.head_commit_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex max-w-[240px] items-center gap-1 truncate rounded bg-[#161b22] px-1.5 py-0.5 font-mono text-[11px] text-[#c9d1d9] ring-1 ring-[#30363d] transition-colors hover:text-[#58a6ff] hover:ring-[#388bfd]/50"
              >
                <span className="truncate">
                  {metadata?.head_commit_message}
                </span>
              </a>
              {extra && (
                <span className="ml-1 text-[10px] text-[#6e7681]">{extra}</span>
              )}{" "}
              <span className="text-[#8b949e]">to</span>{" "}
              <span className="rounded bg-[#161b22] px-1.5 py-0.5 font-mono text-[11px] text-[#8b949e] ring-1 ring-[#30363d]">
                {metadata?.branch_name}
              </span>
            </span>
          ),
        };
      }

      case "TICKET_GITHUB_PR_OPENED":
        return {
          icon: <FaCodePullRequest className={`h-3 w-3 ${iconColor}`} />,
          avatar: <Avatar githubUsername={githubUsername} />,
          text: (
            <span>
              <strong className="font-medium text-[#e6edf3]">
                {actorName}
              </strong>{" "}
              <span className="text-[#8b949e]">opened</span>{" "}
              <a
                href={metadata?.pr_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded bg-[#161b22] px-1.5 py-0.5 text-[#c9d1d9] ring-1 ring-[#30363d] transition-colors hover:text-[#58a6ff] hover:ring-[#388bfd]/50"
              >
                <span className="font-mono text-[11px] text-[#8b949e]">
                  #{metadata?.pr_number}
                </span>
                <span className="text-[11px]">{metadata?.pr_title}</span>
                <FaArrowUpRightFromSquare className="h-2.5 w-2.5 opacity-70" />
              </a>
              {metadata?.old_column && metadata?.new_column && (
                <span className="ml-1.5 inline-flex items-center gap-1 align-middle font-mono text-[10px] text-[#6e7681]">
                  ({metadata.old_column}
                  <FaArrowRight className="h-2 w-2" />
                  {metadata.new_column})
                </span>
              )}
            </span>
          ),
        };

      case "TICKET_GITHUB_PR_MERGED":
        return {
          icon: <FaGitAlt className={`h-3 w-3 ${iconColor}`} />,
          avatar: (
            <Avatar githubUsername={metadata?.merged_by || githubUsername} />
          ),
          text: (
            <span>
              <strong className="font-medium text-[#e6edf3]">
                {metadata?.merged_by || actorName}
              </strong>{" "}
              <span className="text-[#8b949e]">merged</span>{" "}
              <a
                href={metadata?.pr_url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded bg-[#161b22] px-1.5 py-0.5 text-[#c9d1d9] ring-1 ring-[#30363d] transition-colors hover:text-[#58a6ff] hover:ring-[#388bfd]/50"
              >
                <span className="font-mono text-[11px] text-[#8b949e]">
                  #{metadata?.pr_number}
                </span>
                <span className="text-[11px]">{metadata?.pr_title}</span>
                <FaArrowUpRightFromSquare className="h-2.5 w-2.5 opacity-70" />
              </a>
              {metadata?.old_column && metadata?.new_column && (
                <span className="ml-1.5 inline-flex items-center gap-1 align-middle font-mono text-[10px] text-[#6e7681]">
                  ({metadata.old_column}
                  <FaArrowRight className="h-2 w-2" />
                  {metadata.new_column})
                </span>
              )}
            </span>
          ),
        };

      default:
        return {
          icon: <LuActivity className={`h-3 w-3 ${iconColor}`} />,
          avatar: <Avatar actor={actor} githubUsername={githubUsername} />,
          text: (
            <span>
              <span className="text-[#8b949e]">Activity update:</span>{" "}
              <strong className="font-medium text-[#c9d1d9]">
                {verb?.replace(/_/g, " ")}
              </strong>
            </span>
          ),
        };
    }
  };

  const formatTimeAgo = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatFullDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleString("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="border-t border-[#21262d] pt-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#6e7681]">
          Activity History
        </p>
        {!loading && !error && activities.length > 0 && (
          <span className="rounded-full bg-[#161b22] px-2 py-0.5 text-[10px] font-medium text-[#6e7681] ring-1 ring-[#30363d]">
            {activities.length}
          </span>
        )}
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-2 py-8 text-xs text-[#8b949e]">
          <LuLoader className="h-3.5 w-3.5 animate-spin" />
          Loading activity log...
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 py-4 text-center text-xs text-red-400">
          <LuCircleAlert className="h-3.5 w-3.5" />
          {error}
        </div>
      )}

      {!loading && !error && activities.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-[#30363d] bg-[#0d1117]/40 py-10 text-center">
          <LuActivity className="h-5 w-5 text-[#30363d]" />
          <span className="text-xs font-medium text-[#8b949e]">
            No activity logged yet
          </span>
        </div>
      )}

      {!loading && !error && activities.length > 0 && (
        <div className="relative space-y-1 before:absolute before:left-[15px] before:top-3 before:bottom-3 before:w-px before:bg-gradient-to-b before:from-[#30363d] before:via-[#30363d] before:to-transparent">
          {activities.map((item, index) => {
            const details = renderActivityDetails(item);
            const uniqueKey = item.id ? `${item.id}-${index}` : index;

            return (
              <div
                key={uniqueKey}
                className="group relative flex items-start gap-3 rounded-lg px-1 py-2.5 text-xs transition-colors hover:bg-[#161b22]/60"
              >
                <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#161b22] ring-2 ring-[#0d1117]">
                  {details.avatar}
                  <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#0d1117] ring-1 ring-[#30363d]">
                    {details.icon}
                  </span>
                </div>
                <div className="flex-1 pt-1 leading-relaxed">
                  <div>{details.text}</div>
                  <span
                    className="mt-0.5 block text-[10px] text-[#6e7681]"
                    title={formatFullDate(item.created_at)}
                  >
                    {formatTimeAgo(item.created_at)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
