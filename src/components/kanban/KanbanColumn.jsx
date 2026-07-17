import { CheckCircle2 } from "lucide-react";
import TicketCard from "./TicketCard";

const titles = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  REVIEW: "Review",
  DONE: "Done",
};

const KanbanColumn = ({ column, tickets }) => {
  return (
    <div className="flex min-w-0 flex-col rounded-2xl border border-[#30363d] bg-[#161b22] shadow-lg shadow-black/20">
      <div className="flex items-center justify-between border-b border-[#30363d] px-4 py-3.5">
        <div className="flex items-center gap-2">
          {column === "DONE" && (
            <CheckCircle2 className="h-4 w-4 text-[#3fb950]" />
          )}

          <h2 className="text-[13px] font-semibold uppercase tracking-wider text-[#c9d1d9]">
            {titles[column]}
          </h2>
        </div>

        <span className="rounded-full bg-[#0d1117] px-2.5 py-0.5 text-xs font-medium text-[#8b949e] ring-1 ring-inset ring-[#30363d]">
          {tickets.length}
        </span>
      </div>

      <div className="flex-1 space-y-3 px-3 py-3">
        {tickets.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#30363d] py-8 text-center text-xs text-[#6e7681]">
            No tickets
          </div>
        ) : (
          tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))
        )}
      </div>
    </div>
  );
};

export default KanbanColumn;
