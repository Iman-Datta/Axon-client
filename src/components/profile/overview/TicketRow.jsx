import { ArrowUpRight, Layers } from "lucide-react";
import StatusBadge from "./StatusBadge";

function TicketRow({ ticket, onOpen }) {
  console.log(ticket);
  return (
    <div className="group flex flex-col gap-3 rounded-xl border border-[#21262d] bg-[#0d1117]/50 p-4 transition-all duration-200 hover:border-[#388bfd]/50 hover:bg-[#0d1117] sm:flex-row sm:items-center sm:justify-between">
      <div className="flex min-w-0 items-start gap-3">
        <span className="mt-0.5 shrink-0 font-mono text-xs font-bold text-[#58a6ff]">
          {ticket.ticket_number}
        </span>

        <div className="min-w-0 space-y-1">
          <p className="truncate text-sm font-medium text-[#c9d1d9] transition-colors group-hover:text-[#f0f6fc]">
            {ticket.title}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            <StatusBadge column={ticket.kanban_column} status={ticket.status} />
            <span className="inline-flex items-center gap-1 rounded-md border border-[#30363d] bg-[#21262d] px-2 py-0.5 text-[10px] font-semibold text-[#8b949e]">
              {ticket.project_name}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-[#21262d] pt-2 sm:justify-end sm:border-0 sm:pt-0">
        {ticket.story_points && (
          <span className="inline-flex items-center gap-1 text-[11px] text-[#8b949e]">
            <Layers size={11} /> {ticket.story_points} SP
          </span>
        )}

        <button
          type="button"
          onClick={onOpen}
          aria-label="Open project"
          title="Open project"
          className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-[#30363d] bg-[#21262d] p-1.5 text-[#8b949e] transition-all hover:border-[#388bfd] hover:bg-[#388bfd] hover:text-white"
        >
          <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
}

export default TicketRow;
