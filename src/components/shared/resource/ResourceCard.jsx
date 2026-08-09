import { Link } from "react-router-dom";
import { Building2, FolderGit2, Globe2, Lock } from "lucide-react";
import { formatRelativeTime } from "../../../utils/formatTime";

function ResourceCard({ resource, type = "organization" }) {
  const href =
    type === "project"
      ? `/${resource.workspace_slug}/${resource.slug}`
      : `/${resource.slug}`;
  const Icon = type === "project" ? FolderGit2 : Building2;

  const subtitle =
    resource.description ||
    (type === "project" && resource.workspace_type === "personal"
      ? `Shared by ${resource.workspace_name}`
      : null);

  return (
    <Link
      to={href}
      className="group flex items-center justify-between gap-4 px-5 py-4 border-b border-[#21262d] last:border-b-0 transition-colors hover:bg-[#161b22] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#58a6ff]/50 focus-visible:ring-inset"
    >
      <div className="flex items-center gap-4 min-w-0">
        <div className="h-10 w-10 shrink-0 rounded-lg border border-[#30363d] bg-[#0d1117] overflow-hidden flex items-center justify-center">
          {resource.logo || resource.avatar ? (
            <img
              src={resource.logo || resource.avatar}
              alt={resource.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <Icon size={18} className="text-[#8b949e]" strokeWidth={1.75} />
          )}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-medium text-[#e6edf3] group-hover:text-[#58a6ff] transition-colors truncate">
              {resource.name}
            </span>

            {type === "project" && (
              <span className="flex items-center gap-1 shrink-0 rounded-full bg-[#161b22] px-2 py-0.5 text-xs text-[#8b949e] ring-1 ring-[#30363d]">
                {resource.visibility === "public" ? (
                  <Globe2 size={11} />
                ) : (
                  <Lock size={11} />
                )}
                {resource.visibility === "public" ? "Public" : "Private"}
              </span>
            )}
          </div>

          {subtitle && (
            <p className="mt-0.5 text-sm text-[#8b949e] truncate">{subtitle}</p>
          )}
        </div>
      </div>

      <span className="shrink-0 text-xs text-[#6e7681]">
        Updated {formatRelativeTime(resource.updated_at)}
      </span>
    </Link>
  );
}

export default ResourceCard;
