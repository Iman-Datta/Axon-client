import { Search, UserPlus } from "lucide-react";

function MemberToolbar({ search, setSearch, onAddMember }) {
  return (
    <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b949e]" />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search members..."
          className="w-full rounded-lg border border-[#30363d] bg-[#0d1117] py-2.5 pl-10 pr-4 text-sm text-[#e6edf3] placeholder:text-[#8b949e] transition focus:border-[#58a6ff] focus:outline-none"
        />
      </div>

      {/* Add Member */}
      <button
        onClick={onAddMember}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#238636] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#2ea043]"
      >
        <UserPlus className="h-4 w-4" />
        Add Member
      </button>
    </div>
  );
}

export default MemberToolbar;
