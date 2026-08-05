import {
  CalendarDays,
  Clock,
  Globe,
  Lock,
  Archive,
  Building2,
  ArrowUpRight,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

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
          ? "border-[#3fb950]/30 bg-[#238636]/10 text-[#3fb950]"
          : "border-[#8b949e]/30 bg-[#8b949e]/10 text-[#8b949e]"
      }`}
    >
      <Icon size={12} />
      {isPublic ? "Public" : "Private"}
    </span>
  );
}

function Header({ description, outletContext }) {
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

  const githubUrl = created_by?.github_username
    ? `https://github.com/${created_by.github_username}`
    : null;

  const displayName = created_by?.first_name
    ? `${created_by.first_name} ${created_by.last_name ?? ""}`.trim()
    : created_by?.username;

  return (
    <div className="border-b border-[#21262d] bg-[#0d1117] px-6 py-7">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        {/* Left: identity */}
        <div className="min-w-0 flex-1">
          {/* workspace / slug breadcrumb */}
          <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-[#6e7681]">
            {workspace_type && (
              <span className="flex items-center gap-1.5">
                <Building2 size={12} />
                {workspace_type}
              </span>
            )}
            <span className="text-[#30363d]">/</span>
            <code className="text-[#79c0ff]">{slug}</code>
          </div>

          {/* title + badges */}
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h1 className="truncate text-3xl font-bold text-[#f0f6fc]">
              {name}
            </h1>
            {visibility && <VisibilityBadge visibility={visibility} />}
            {is_archived && (
              <span className="inline-flex items-center gap-1 rounded-full border border-[#d29922]/40 bg-[#d29922]/10 px-2.5 py-1 text-xs font-medium text-[#e3b341]">
                <Archive size={12} />
                Archived
              </span>
            )}
          </div>

          {description && (
            <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-[#8b949e]">
              {description}
            </p>
          )}

          {/* meta row */}
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#8b949e]">
            <span className="flex items-center gap-1.5">
              <CalendarDays size={14} />
              Created&nbsp;
              <span className="text-[#c9d1d9]">{formatDate(created_at)}</span>
            </span>

            <span className="text-[#30363d]">•</span>

            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              Updated&nbsp;
              <span className="text-[#c9d1d9]">{timeAgo(updated_at)}</span>
            </span>

            {website && (
              <>
                <span className="text-[#30363d]">•</span>
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#58a6ff] hover:underline"
                >
                  <Globe size={14} />
                  {website.replace(/^https?:\/\//, "")}
                </a>
              </>
            )}
          </div>
        </div>

        {created_by && (
          <a
            href={githubUrl || undefined}
            target="_blank"
            rel="noopener noreferrer"
            className={`group inline-flex items-center gap-3 transition-colors ${
              githubUrl ? "hover:text-[#58a6ff]" : "cursor-default"
            }`}
          >
            {created_by.avatar ? (
              <img
                src={created_by.avatar}
                alt={created_by.username}
                className="h-10 w-10 rounded-full border border-[#30363d]"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1f6feb]/15 font-semibold text-[#58a6ff]">
                {created_by.username?.charAt(0).toUpperCase()}
              </div>
            )}

            <div className="leading-tight">
              <div className="flex items-center gap-2">
                <span className="font-medium text-[#f0f6fc]">
                  {displayName}
                </span>

                {githubUrl && (
                  <ArrowUpRight
                    size={13}
                    className="opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  />
                )}
              </div>

              <div className="flex items-center gap-1 text-sm text-[#8b949e]">
                <span>Owner</span>

                {githubUrl && (
                  <>
                    <span>•</span>
                    <FaGithub size={12} />
                    <span>{created_by.github_username}</span>
                  </>
                )}
              </div>
            </div>
          </a>
        )}
      </div>
    </div>
  );
}

export default Header;
