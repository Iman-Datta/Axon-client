// components/kanban/KanbanColumn.jsx
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import TicketCard from "./TicketCard";
import DropPlaceholder from "./DropPlaceholder";
import { toEndId } from "./kanbanDnd";

const titles = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  REVIEW: "Review",
  DONE: "Done",
};

function EndDropZone({ column, active }) {
  const { setNodeRef, isOver } = useDroppable({ id: toEndId(column) });

  return (
    <div ref={setNodeRef} className={active ? "" : "h-5"}>
      {active && <DropPlaceholder />}
      {!active && isOver && (
        <div className="h-5 rounded-lg border border-dashed border-[#388bfd]/30" />
      )}
    </div>
  );
}

const KanbanColumn = ({ column, tickets, placeholder }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: column,
  });

  const showPlaceholderHere = placeholder?.column === column;
  const showEmptyPlaceholder = showPlaceholderHere && tickets.length === 0;

  const showEndPlaceholder =
    showPlaceholderHere &&
    tickets.length > 0 &&
    placeholder.beforeTicketId === null;

  return (
    <div
      ref={setNodeRef}
      className={`flex h-full w-[280px]  flex-shrink-0 flex-col overflow-hidden rounded-2xl border bg-[#161b22] shadow-lg shadow-black/20 transition-colors duration-200 ${
        isOver ? "border-[#388bfd]/50" : "border-[#30363d]"
      }`}
    >
      <div className="flex flex-shrink-0 items-center justify-between border-b border-[#30363d] px-3.5 py-2.5">
        <h2 className="text-[12px] font-semibold uppercase tracking-wider text-[#c9d1d9]">
          {titles[column]}
        </h2>

        <span className="rounded-full bg-[#0d1117] px-2 py-0.5 text-[11px] font-medium text-[#8b949e] ring-1 ring-inset ring-[#30363d]">
          {tickets.length}
        </span>
      </div>

      <SortableContext
        items={tickets.map((ticket) => ticket.id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          className="min-h-0 flex-1 space-y-2 overflow-y-auto px-2.5 py-2.5
          [scrollbar-width:thin] [scrollbar-color:#30363d_transparent]
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-[#30363d]
          hover:[&::-webkit-scrollbar-thumb]:bg-[#484f58]"
        >
          {tickets.length === 0 ? (
            showEmptyPlaceholder ? (
              <DropPlaceholder variant="empty" />
            ) : (
              <div className="rounded-xl border border-dashed border-[#30363d] py-8 text-center text-xs text-[#6e7681]">
                No tickets
              </div>
            )
          ) : (
            <>
              {tickets.map((ticket) => (
                <div key={ticket.id}>
                  {showPlaceholderHere &&
                    placeholder.beforeTicketId === ticket.id && (
                      <DropPlaceholder />
                    )}

                  <TicketCard ticket={ticket} />
                </div>
              ))}

              <EndDropZone column={column} active={showEndPlaceholder} />
            </>
          )}
        </div>
      </SortableContext>
    </div>
  );
};

export default KanbanColumn;
