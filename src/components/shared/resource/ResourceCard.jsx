import { Link } from "react-router-dom";
import { Building2, FolderGit2 } from "lucide-react";

function ResourceCard({
  resource,
  type = "organization",
  workspaceSlug,
  actionText,
  onAction,
}) {
  const href =
    type === "project"
      ? `/${workspaceSlug}/${resource.slug}`
      : `/${resource.slug}`;
  const Icon = type === "project" ? FolderGit2 : Building2;

  return (
    <div className="flex items-center justify-between px-5 py-4 border-b border-[#30363d] last:border-b-0">
      <div className="flex items-center gap-4 min-w-0">
        <div className="h-10 w-10 shrink-0 rounded-md border border-[#30363d] bg-[#161b22] overflow-hidden flex items-center justify-center">
          {resource.logo || resource.avatar ? (
            <img
              src={resource.logo || resource.avatar}
              alt={resource.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <Icon size={20} className="text-[#8b949e]" />
          )}
        </div>

        <div className="min-w-0">
          <Link
            to={href}
            className="text-base font-semibold text-[#58a6ff] hover:underline"
          >
            {resource.name}
          </Link>

          {resource.description && (
            <p className="mt-1 text-sm text-[#8b949e] truncate">
              {resource.description}
            </p>
          )}
        </div>
      </div>

      {actionText && (
        <button
          onClick={() => onAction?.(resource)}
          className="shrink-0 px-3 py-2 rounded-md border border-[#30363d] bg-[#21262d] text-red-400 text-sm font-medium hover:bg-red-500/10 transition-colors"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}

export default ResourceCard;
