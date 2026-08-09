import { Link } from "react-router-dom";
import { Building2, Plus } from "lucide-react";

function OrganizationListHeader({ count }) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-[#21262d] pb-6">
      <div className="flex items-center gap-3.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#161b22] ring-1 ring-[#30363d]">
          <Building2 size={18} className="text-[#58a6ff]" strokeWidth={1.75} />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight text-[#e6edf3]">
              Organizations
            </h1>
            <span className="rounded-full bg-[#161b22] px-2 py-0.5 text-xs font-medium text-[#8b949e] ring-1 ring-[#30363d]">
              {count}
            </span>
          </div>

          <p className="mt-0.5 text-sm text-[#8b949e]">
            Manage your organizations and teams
          </p>
        </div>
      </div>

      <Link
        to="/organizations/create"
        className="flex shrink-0 items-center gap-1.5 rounded-lg bg-[#238636] px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#2ea043]"
      >
        <Plus size={16} strokeWidth={2.25} />
        New organization
      </Link>
    </div>
  );
}

export default OrganizationListHeader;
