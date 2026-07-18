import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DndContext, closestCorners } from "@dnd-kit/core";

import KanbanColumn from "./KanbanColumn";
import { updateTicket } from "../../services/ticketService";

const COLUMN_ORDER = ["TODO", "IN_PROGRESS", "REVIEW", "DONE"];

const KanbanBoard = ({ tickets, setTickets }) => {
  const { slug, project_slug } = useParams();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const columns = {
    TODO: [],
    IN_PROGRESS: [],
    REVIEW: [],
    DONE: [],
  };

  tickets.forEach((ticket) => {
    if (columns[ticket.kanban_column]) {
      columns[ticket.kanban_column].push(ticket);
    }
  });

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) return;

    // Ignore if dropped on itself
    if (active.id === over.id) return;

    // Find the dragged ticket
    const activeTicket = tickets.find(
      (ticket) => String(ticket.id) === String(active.id),
    );

    if (!activeTicket) return;

    // Determine the destination column
    const newColumn =
      over.id === "TODO" ||
      over.id === "IN_PROGRESS" ||
      over.id === "REVIEW" ||
      over.id === "DONE"
        ? over.id
        : tickets.find((ticket) => ticket.id === over.id)?.kanban_column;

    if (!newColumn || newColumn === activeTicket.kanban_column) return;

    // Save previous state for rollback
    const previousTickets = tickets.map((ticket) => ({ ...ticket }));

    // Optimistic UI update
    const updatedTickets = tickets.map((ticket) =>
      String(ticket.id) === String(active.id)
        ? { ...ticket, kanban_column: newColumn }
        : ticket,
    );

    setTickets(updatedTickets);

    try {
      await updateTicket(
        slug,
        project_slug,
        active.id,
        {
          kanban_column: newColumn,
        },
        dispatch,
        accessToken,
      );
    } catch (error) {
      // Rollback on failure
      setTickets(previousTickets);
      alert(error.message);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
      <div
        className="w-full overflow-x-auto overflow-y-hidden pb-4
      [scrollbar-width:thin] [scrollbar-color:#30363d_transparent]
      [&::-webkit-scrollbar]:h-2
      [&::-webkit-scrollbar-track]:bg-transparent
      [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-thumb]:bg-[#30363d]
      hover:[&::-webkit-scrollbar-thumb]:bg-[#484f58]"
      >
        <div className="flex items-start gap-6 pt-6">
          {COLUMN_ORDER.map((column) => (
            <KanbanColumn
              key={column}
              column={column}
              tickets={columns[column]}
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
