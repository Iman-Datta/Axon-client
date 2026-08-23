import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Folder,
  UserPlus,
  UserMinus,
  ShieldCheck,
  Layers,
  Trash2,
  GitBranch,
  Unlink,
  Search,
  Activity as ActivityIcon,
  AlertCircle,
  Users,
  Zap,
} from "lucide-react";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;

const CHIP =
  "bg-[#161b22] text-[#c9d1d9] px-2 py-0.5 rounded text-xs font-mono ring-1 ring-[#30363d]";

const VERB_CONFIG = {
  PROJECT_CREATED: {
    icon: Folder,
    color: "text-emerald-400",
    category: "project",
    render: (m) => (
      <>
        Created project <span className={CHIP}>{m?.project_name}</span>
      </>
    ),
  },
  MEMBER_ADDED: {
    icon: UserPlus,
    color: "text-blue-400",
    category: "members",
    render: (m) => (
      <>
        Added a new member with role <span className={CHIP}>{m?.role}</span>
      </>
    ),
  },
  MEMBER_REMOVED: {
    icon: UserMinus,
    color: "text-rose-400",
    category: "members",
    render: (m) => (
      <>
        Removed a member{" "}
        <span className="text-[#6e7681]">
          (role was <span className={CHIP}>{m?.role}</span>)
        </span>
      </>
    ),
  },
  MEMBER_ROLE_CHANGED: {
    icon: ShieldCheck,
    color: "text-amber-400",
    category: "members",
    render: (m) => (
      <>
        Changed member role from <span className={CHIP}>{m?.old_role}</span> to{" "}
        <span className={CHIP}>{m?.new_role}</span>
      </>
    ),
  },
  EPIC_CREATED: {
    icon: Layers,
    color: "text-purple-400",
    category: "epics",
    render: (m) => (
      <>
        Created epic <span className={CHIP}>{m?.epic_title}</span>
      </>
    ),
  },
  EPIC_DELETED: {
    icon: Trash2,
    color: "text-red-400",
    category: "epics",
    render: (m) => (
      <>
        Deleted epic <span className={CHIP}>{m?.epic_title}</span>
      </>
    ),
  },
  GITHUB_CONNECTED: {
    icon: GitBranch,
    color: "text-indigo-400",
    category: "github",
    render: (m) => (
      <>
        Connected repository <span className={CHIP}>{m?.repo_full_name}</span>
      </>
    ),
  },
  GITHUB_DISCONNECTED: {
    icon: Unlink,
    color: "text-zinc-400",
    category: "github",
    render: (m) => (
      <>
        Disconnected repository <span className={CHIP}>{m?.repo_name}</span>
      </>
    ),
  },
  default: {
    icon: ActivityIcon,
    color: "text-[#8b949e]",
    category: "project",
    render: (_m, verb) => <>Activity update: {verb?.replace(/_/g, " ")}</>,
  },
};

const TABS = [
  { key: "all", label: "All" },
  { key: "members", label: "Members" },
  { key: "epics", label: "Epics" },
  { key: "github", label: "GitHub" },
];

function initials(actor) {
  if (!actor) return "S";
  const a = (actor.first_name?.[0] || "") + (actor.last_name?.[0] || "");
  return (a || actor.username?.[0] || "S").toUpperCase();
}

function Avatar({ actor }) {
  if (actor?.avatar) {
    return (
      <img
        src={actor.avatar}
        alt={actor.first_name || actor.username}
        className="h-7 w-7 shrink-0 rounded-full ring-1 ring-[#30363d]"
      />
    );
  }
  return (
    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#161b22] text-[10px] font-semibold text-[#8b949e] ring-1 ring-[#30363d]">
      {initials(actor)}
    </div>
  );
}

function actorName(actor) {
  if (!actor) return "System";
  return (
    `${actor.first_name || ""} ${actor.last_name || ""}`.trim() ||
    actor.username
  );
}

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

function formatRelativeTime(dateStr) {
  const date = new Date(dateStr);
  const diffSec = Math.round((date - new Date()) / 1000);
  const abs = Math.abs(diffSec);

  if (abs < 60) return "just now";
  if (abs < 3600) return rtf.format(Math.round(diffSec / 60), "minute");
  if (abs < 86400) return rtf.format(Math.round(diffSec / 3600), "hour");
  if (abs < 86400 * 30) return rtf.format(Math.round(diffSec / 86400), "day");
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatFullDate(dateStr) {
  return new Date(dateStr).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function dayBucket(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const startOf = (dt) =>
    new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
  const diffDays = Math.round((startOf(now) - startOf(d)) / 86400000);
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return "Earlier";
}

function SkeletonRow() {
  return (
    <div className="flex items-start gap-3 px-1 py-3">
      <div className="h-8 w-8 shrink-0 animate-pulse rounded-full bg-[#161b22]" />
      <div className="flex-1 space-y-2 pt-1">
        <div className="h-3 w-2/3 animate-pulse rounded bg-[#161b22]" />
        <div className="h-2.5 w-1/4 animate-pulse rounded bg-[#161b22]" />
      </div>
    </div>
  );
}

export default function ProjectActivity() {
  const { slug, project_slug } = useParams();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (!slug || !project_slug) return;

    const fetchActivities = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchWithAuth(
          `${API}/activities/${slug}/${project_slug}/project`,
          { method: "GET" },
          dispatch,
          accessToken,
        );

        if (!res.ok) throw new Error("Failed to load project activity");

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
        setError(err.message || "Could not load activity");
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [slug, project_slug, accessToken, dispatch]);

  const filtered = useMemo(() => {
    return activities.filter((item) => {
      const config = VERB_CONFIG[item.verb] || VERB_CONFIG.default;
      if (tab !== "all" && config.category !== tab) return false;

      if (query.trim()) {
        const q = query.trim().toLowerCase();
        const haystack = [
          actorName(item.actor),
          item.verb,
          item.metadata?.project_name,
          item.metadata?.epic_title,
          item.metadata?.repo_name,
          item.metadata?.repo_full_name,
          item.metadata?.role,
          item.metadata?.old_role,
          item.metadata?.new_role,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });
  }, [activities, tab, query]);

  const groups = useMemo(() => {
    const order = ["Today", "Yesterday", "Earlier"];
    const map = { Today: [], Yesterday: [], Earlier: [] };
    filtered.forEach((item) => {
      map[dayBucket(item.created_at)].push(item);
    });
    return order
      .map((label) => ({ label, items: map[label] }))
      .filter((g) => g.items.length > 0);
  }, [filtered]);

  const metrics = useMemo(() => {
    const contributors = new Set(
      activities.filter((a) => a.actor).map((a) => a.actor.id),
    );
    const githubEvents = activities
      .filter(
        (a) =>
          a.verb === "GITHUB_CONNECTED" || a.verb === "GITHUB_DISCONNECTED",
      )
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    const latestGithub = githubEvents[0];

    return {
      total: activities.length,
      contributors: contributors.size,
      integration: latestGithub
        ? {
            connected: latestGithub.verb === "GITHUB_CONNECTED",
            name:
              latestGithub.metadata?.repo_full_name ||
              latestGithub.metadata?.repo_name,
          }
        : null,
    };
  }, [activities]);

  return (
    <div className="min-h-full bg-[#0d1117] px-6 py-6 text-[#c9d1d9] md:px-10">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-[#e6edf3]">
            Project Activity
          </h1>
          <p className="mt-1 text-sm text-[#8b949e]">
            Audit log of events, team updates, integrations, and epics.
          </p>
        </div>
        <span className="rounded-full bg-[#161b22] px-3 py-1 text-xs font-medium text-[#8b949e] ring-1 ring-[#30363d]">
          {metrics.total} total events
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main column */}
        <div className="lg:col-span-2">
          {/* Toolbar */}
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-1 rounded-lg bg-[#161b22] p-1 ring-1 ring-[#30363d]">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    tab === t.key
                      ? "bg-[#1f6feb]/15 text-[#79c0ff] ring-1 ring-[#1f6feb]/40"
                      : "text-[#8b949e] hover:text-[#c9d1d9]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#6e7681]" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search activity..."
                className="w-full rounded-lg border border-[#30363d] bg-[#161b22] py-1.5 pl-8 pr-3 text-xs text-[#c9d1d9] placeholder-[#6e7681] outline-none transition-colors focus:border-[#1f6feb]/60"
              />
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="rounded-xl border border-[#21262d] bg-[#0d1117]">
              {[...Array(5)].map((_, i) => (
                <SkeletonRow key={i} />
              ))}
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="flex items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 py-6 text-center text-xs text-red-400">
              <AlertCircle className="h-3.5 w-3.5" />
              {error}
            </div>
          )}

          {/* Empty */}
          {!loading && !error && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-[#30363d] bg-[#0d1117]/40 py-12 text-center">
              <ActivityIcon className="h-5 w-5 text-[#30363d]" />
              <span className="text-xs font-medium text-[#8b949e]">
                No matching activity
              </span>
            </div>
          )}

          {/* Timeline */}
          {!loading && !error && groups.length > 0 && (
            <div className="space-y-6">
              {groups.map((group) => (
                <div key={group.label}>
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[#6e7681]">
                    {group.label}
                  </p>
                  <div className="relative space-y-1 pl-0.5 before:absolute before:left-[15px] before:top-3 before:bottom-3 before:w-px before:bg-gradient-to-b before:from-[#30363d] before:via-[#30363d] before:to-transparent">
                    {group.items.map((item, idx) => {
                      const config =
                        VERB_CONFIG[item.verb] || VERB_CONFIG.default;
                      const Icon = config.icon;
                      const key = item.id ?? `${group.label}-${idx}`;
                      return (
                        <div
                          key={key}
                          className="group relative flex items-start gap-3 rounded-lg px-1 py-2.5 text-xs transition-colors hover:bg-[#161b22]/60"
                        >
                          <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#161b22] ring-2 ring-[#0d1117]">
                            <Avatar actor={item.actor} />
                            <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#0d1117] ring-1 ring-[#30363d]">
                              <Icon className={`h-2.5 w-2.5 ${config.color}`} />
                            </span>
                          </div>
                          <div className="flex-1 pt-1 leading-relaxed">
                            <div>
                              <strong className="font-medium text-[#e6edf3]">
                                {actorName(item.actor)}
                              </strong>{" "}
                              <span className="text-[#8b949e]">
                                {config.render(item.metadata, item.verb)}
                              </span>
                            </div>
                            <span
                              className="mt-0.5 block text-[10px] text-[#6e7681]"
                              title={formatFullDate(item.created_at)}
                            >
                              {formatRelativeTime(item.created_at)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="rounded-xl border border-[#21262d] bg-[#161b22]/40 p-4">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-[#6e7681]">
              Summary
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs text-[#8b949e]">
                  <ActivityIcon className="h-3.5 w-3.5 text-[#79c0ff]" />
                  Total events
                </span>
                <span className="text-sm font-semibold text-[#e6edf3]">
                  {metrics.total}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs text-[#8b949e]">
                  <Users className="h-3.5 w-3.5 text-[#79c0ff]" />
                  Active contributors
                </span>
                <span className="text-sm font-semibold text-[#e6edf3]">
                  {metrics.contributors}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-xs text-[#8b949e]">
                  <Zap className="h-3.5 w-3.5 text-[#79c0ff]" />
                  Integration
                </span>
                {metrics.integration ? (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${
                      metrics.integration.connected
                        ? "bg-emerald-500/10 text-emerald-400 ring-emerald-500/25"
                        : "bg-[#161b22] text-[#6e7681] ring-[#30363d]"
                    }`}
                  >
                    {metrics.integration.connected
                      ? "Connected"
                      : "Disconnected"}
                  </span>
                ) : (
                  <span className="text-xs text-[#6e7681]">None</span>
                )}
              </div>

              {metrics.integration && (
                <p className="truncate font-mono text-[10px] text-[#6e7681]">
                  {metrics.integration.name}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
