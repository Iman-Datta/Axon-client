import { Building2, Users, FolderGit2, Heart } from "lucide-react";

function OrganizationHeader({ organization }) {
  return (
    <div className="border-b border-[#30363d] pb-10">
      <div className="flex items-start gap-6">
        <div className="w-28 h-28 rounded-2xl bg-[#21262d] flex items-center justify-center">
          <Building2 size={48} className="text-[#8b949e]" />
        </div>

        <div className="flex-1">
          <h1 className="text-4xl font-bold text-white">{organization.name}</h1>

          <p className="text-[#8b949e] mt-2">@{organization.slug}</p>

          <p className="mt-4 max-w-3xl text-[#c9d1d9]">
            {organization.description}
          </p>

          <div className="flex gap-8 mt-6 flex-wrap">
            <div className="flex items-center gap-2">
              <Users size={20} />
              <span>{organization.members_count} Members</span>
            </div>

            <div className="flex items-center gap-2">
              <FolderGit2 size={20} />
              <span>{organization.projects_count} Projects</span>
            </div>

            <div className="flex items-center gap-2">
              <Heart size={20} />
              <span>{organization.followers_count} Followers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrganizationHeader;
