import { Search, UserPlus, Users } from "lucide-react";

function MembersHeader({ count, search, setSearch, onAddMember }) {
  return (
    <div className="mb-2.5 border-b border-[#21262d] pb-3">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#161b22] ring-1 ring-[#30363d]">
            <Users className="h-5 w-5 text-[#8b949e]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold text-[#e6edf3]">
                Project Members
              </h1>

              {typeof count === "number" && (
                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-zinc-200">
                  {count}
                </span>
              )}
            </div>

            <p className="mt-0.5 text-xs text-[#8b949e]">
              Manage your project members and permissions.
            </p>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b949e]" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search members..."
              className="w-full rounded-lg border border-[#30363d] bg-[#0d1117] py-2.5 pl-10 pr-4 text-sm text-[#e6edf3] placeholder:text-[#8b949e] focus:border-[#58a6ff] focus:outline-none"
            />
          </div>

          <button
            onClick={onAddMember}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#238636] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#2ea043]"
          >
            <UserPlus className="h-4 w-4" />
            Add Member
          </button>
        </div>
      </div>
    </div>
  );
}

export default MembersHeader;
