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
    <div ref={setNodeRef} className={active ? "" : "h-6"}>
      {active && <DropPlaceholder />}
      {!active && isOver && (
        <div className="h-6 rounded-lg border border-dashed border-[#30363d]/60" />
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
  const showBeforeTicketPlaceholder =
    showPlaceholderHere && placeholder.beforeTicketId !== null;
  const showEndPlaceholder =
    showPlaceholderHere &&
    tickets.length > 0 &&
    placeholder.beforeTicketId === null;

  return (
    <div
      ref={setNodeRef}
      className={`flex h-full min-w-[280px] max-w-[400px] flex-1 flex-shrink-0 flex-col overflow-hidden rounded-2xl border bg-[#161b22] shadow-lg shadow-black/20 transition-colors duration-200 ${
        isOver ? "border-[#388bfd]/50" : "border-[#30363d]"
      }`}
    >
      <div className="flex flex-shrink-0 items-center justify-between border-b border-[#30363d] px-4 py-3.5">
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
          className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-3
          [scrollbar-width:thin] [scrollbar-color:#30363d_transparent]
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-[#30363d]
          hover:[&::-webkit-scrollbar-thumb]:bg-[#484f58]"
        >
          {tickets.length === 0 ? (
            showEmptyPlaceholder ? (
              <DropPlaceholder />
            ) : (
              <div className="rounded-xl border border-dashed border-[#30363d] py-8 text-center text-xs text-[#6e7681]">
                No tickets
              </div>
            )
          ) : (
            <>
              {tickets.map((ticket) => (
                <div key={ticket.id}>
                  {showBeforeTicketPlaceholder &&
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
