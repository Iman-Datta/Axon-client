import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import TicketCard from "./TicketCard";

const titles = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  REVIEW: "Review",
  DONE: "Done",
};

const KanbanColumn = ({ column, tickets, placeholder }) => {
  const { setNodeRef } = useDroppable({
    id: column,
  });

  return (
    <div
      ref={setNodeRef}
      className="flex h-fit max-h-[calc(100vh-240px)] min-w-[280px] max-w-[400px] flex-1 flex-shrink-0 flex-col overflow-hidden rounded-2xl border border-[#30363d] bg-[#161b22] shadow-lg shadow-black/20"
    >
      <div className="flex items-center justify-between border-b border-[#30363d] px-4 py-3.5">
        <h2 className="text-[13px] font-semibold uppercase tracking-wider text-[#c9d1d9]">
          {titles[column]}
        </h2>

        <span className="rounded-full bg-[#0d1117] px-2.5 py-0.5 text-xs font-medium text-[#8b949e] ring-1 ring-inset ring-[#30363d]">
          {tickets.length}
        </span>
      </div>
      <SortableContext
        items={tickets.map((ticket) => ticket.id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          className="max-h-[calc(100vh-330px)] flex-1 space-y-3 overflow-y-auto px-3 py-3
          [scrollbar-width:thin] [scrollbar-color:#30363d_transparent]
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-[#30363d]
          hover:[&::-webkit-scrollbar-thumb]:bg-[#484f58]"
        >
          {tickets.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#30363d] py-8 text-center text-xs text-[#6e7681]">
              No tickets
            </div>
          ) : (
            <>
              {tickets.map((ticket) => (
                <div key={ticket.id}>
                  {placeholder?.beforeTicketId === ticket.id &&
                    placeholder.column === column && (
                      <div className="mb-3 h-20 rounded-xl border-2 border-dashed border-[#58a6ff] bg-[#58a6ff]/10" />
                    )}

                  <TicketCard ticket={ticket} />
                </div>
              ))}
            </>
          )}
        </div>
      </SortableContext>
    </div>
  );
};

export default KanbanColumn;
