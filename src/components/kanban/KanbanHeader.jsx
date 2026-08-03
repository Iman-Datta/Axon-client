import { Search, ChevronDown, LayoutDashboard } from "lucide-react";
import TicketLegend from "./TicketLegend";

const KanbanHeader = () => {
  return (
    <header className="pt-2.5  border-b border-[#21262d] pb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#30363d] bg-[#161b22]">
            <LayoutDashboard className="h-5 w-5 text-[#58a6ff]" />
          </div>

          <h1 className="text-2xl font-semibold text-[#e6edf3]">Board</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b949e]" />
            <input
              type="text"
              placeholder="Search tickets..."
              className="w-64 rounded-md border border-[#30363d] bg-[#0d1117] py-2 pl-9 pr-3 text-sm text-[#e6edf3] placeholder:text-[#8b949e] focus:border-[#58a6ff] focus:outline-none"
            />
          </div>

          <button className="flex items-center gap-2 rounded-md border border-[#30363d] bg-[#161b22] px-3 py-2 text-sm text-[#e6edf3] hover:bg-[#1c2128]">
            Epic
            <ChevronDown className="h-4 w-4 text-[#8b949e]" />
          </button>

          <div className="h-6 w-px bg-[#21262d]" />

          <TicketLegend />
        </div>
      </div>
    </header>
  );
};

export default KanbanHeader;
