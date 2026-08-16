import { Building2, Users, FolderGit2 } from "lucide-react";

function OrganizationHeader({ organization }) {
  if (!organization) return null;

  return (
    <div className="border-b border-[#30363d] pb-5 mt-4">
      <div className="flex items-start gap-4">
        {/* Organization Avatar / Logo - Increased size to w-24 h-24 */}
        <div className="w-24 h-24 rounded-xl bg-[#21262d] border border-[#30363d] flex items-center justify-center shrink-0 overflow-hidden shadow-md">
          {organization.avatar ? (
            <img
              src={organization.avatar}
              alt={organization.name}
              className="h-full w-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <Building2 size={42} className="text-[#8b949e]" />
          )}
        </div>

        {/* Organization Info */}
        <div className="flex-1 pt-1">
          <h1 className="text-2xl font-bold text-white leading-tight">
            {organization.name}
          </h1>

          <p className="text-[#8b949e] text-base mt-1">@{organization.slug}</p>

          {organization.description && (
            <p className="mt-2 max-w-3xl text-[#c9d1d9] text-sm">
              {organization.description}
            </p>
          )}

          <div className="flex flex-wrap gap-6 mt-4 text-[#c9d1d9] text-sm">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-[#8b949e]" />
              <span>{organization.members_count || 0} Members</span>
            </div>

            <div className="flex items-center gap-2">
              <FolderGit2 size={16} className="text-[#8b949e]" />
              <span>{organization.projects_count || 0} Projects</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganizationHeader;
