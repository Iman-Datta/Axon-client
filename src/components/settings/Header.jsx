import {
  CalendarDays,
  Clock,
  GitBranch,
  Globe,
  Lock,
  Archive,
  Building2,
} from "lucide-react";

// Formats an ISO date string into "3 days ago" / "just now" / "2 months ago"
function timeAgo(dateString) {
  if (!dateString) return "N/A";

  const then = new Date(dateString).getTime();
  const now = Date.now();
  const diffSeconds = Math.max(0, Math.floor((now - then) / 1000));

  const units = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
  ];

  for (const unit of units) {
    const value = Math.floor(diffSeconds / unit.seconds);
    if (value >= 1) {
      return `${value} ${unit.label}${value > 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
}

function formatDate(dateString) {
  if (!dateString) return "N/A";
  return new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function VisibilityBadge({ visibility }) {
  const isPublic = visibility === "public";
  const Icon = isPublic ? Globe : Lock;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${
        isPublic
          ? "border-[#2ea043]/40 bg-[#238636]/15 text-[#3fb950]"
          : "border-[#8b949e]/40 bg-[#8b949e]/10 text-[#8b949e]"
      }`}
    >
      <Icon size={12} />
      {isPublic ? "Public" : "Private"}
    </span>
  );
}

function Header({ title, description, outletContext }) {
  const project = outletContext || {};
  const {
    name,
    slug,
    visibility,
    is_archived,
    website,
    workspace_type,
    created_by,
    created_at,
    updated_at,
  } = project;

  return (
    <div className="border-b border-[#21262d] px-6 py-6">
      {/* Page title */}
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      {description && (
        <p className="mt-2 text-sm text-gray-400">{description}</p>
      )}

      {/* Project summary card */}
      <div className="mt-6 rounded-xl border border-[#30363d] bg-[#161b22] p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          {/* Left: identity */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-xl font-semibold text-[#f0f6fc]">
                {name || "Untitled project"}
              </h2>
              {is_archived && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d29922]/40 bg-[#d29922]/10 px-2.5 py-1 text-xs font-medium text-[#e3b341]">
                  <Archive size={12} />
                  Archived
                </span>
              )}
              {visibility && <VisibilityBadge visibility={visibility} />}
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-[#8b949e]">
              <span className="inline-flex items-center gap-1.5">
                <GitBranch size={14} />
                <code className="rounded bg-[#0d1117] px-1.5 py-0.5 text-xs text-[#79c0ff]">
                  {slug || "—"}
                </code>
              </span>

              {workspace_type && (
                <span className="inline-flex items-center gap-1.5 capitalize">
                  <Building2 size={14} />
                  {workspace_type}
                </span>
              )}

              {website && (
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#58a6ff] hover:underline"
                >
                  <Globe size={14} />
                  {website.replace(/^https?:\/\//, "")}
                </a>
              )}
            </div>
          </div>

          {/* Right: created by */}
          {created_by && (
            <div className="flex items-center gap-2.5 rounded-lg border border-[#30363d] bg-[#0d1117] px-3 py-2">
              {created_by.avatar && (
                <img
                  src={created_by.avatar}
                  alt={created_by.username}
                  className="h-8 w-8 rounded-full border border-[#30363d]"
                />
              )}
              <div className="leading-tight">
                <p className="text-xs text-[#8b949e]">Created by</p>
                <p className="text-sm font-medium text-[#f0f6fc]">
                  {created_by.first_name
                    ? `${created_by.first_name} ${created_by.last_name || ""}`.trim()
                    : created_by.username}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="my-4 h-px bg-[#21262d]" />

        {/* Timestamps */}
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
          <div className="flex items-center gap-2 text-[#8b949e]">
            <CalendarDays size={15} />
            <span>
              Created{" "}
              <span className="text-[#c9d1d9]">{formatDate(created_at)}</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#8b949e]">
            <Clock size={15} />
            <span>
              Updated{" "}
              <span className="text-[#c9d1d9]">{timeAgo(updated_at)}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
