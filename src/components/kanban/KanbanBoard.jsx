import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DndContext, closestCorners, DragOverlay } from "@dnd-kit/core";

import KanbanColumn from "./KanbanColumn";
import TicketCardPreview from "./TicketCardPreview";
import { updateTicket } from "../../services/ticketService";

const COLUMN_ORDER = ["TODO", "IN_PROGRESS", "REVIEW", "DONE"];

const KanbanBoard = ({ tickets, setTickets }) => {
  const [activeTicket, setActiveTicket] = useState(null);

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

    if (!over) {
      setActiveTicket(null);
      return;
    }

    // Find the dragged ticket
    const activeTicket = tickets.find(
      (ticket) => String(ticket.id) === String(active.id),
    );

    if (active.id === over.id) {
      setActiveTicket(null);
      return;
    }

    if (!activeTicket) {
      setActiveTicket(null);
      return;
    }

    // Determine the destination column
    const newColumn =
      over.id === "TODO" ||
      over.id === "IN_PROGRESS" ||
      over.id === "REVIEW" ||
      over.id === "DONE"
        ? over.id
        : tickets.find((ticket) => ticket.id === over.id)?.kanban_column;

    if (!newColumn || newColumn === activeTicket.kanban_column) {
      setActiveTicket(null);
      return;
    }

    // Save previous state for rollback
    const previousTickets = tickets.map((ticket) => ({ ...ticket }));

    // Optimistic UI update
    const updatedTickets = tickets.map((ticket) =>
      String(ticket.id) === String(active.id)
        ? { ...ticket, kanban_column: newColumn }
        : ticket,
    );

    setTickets(updatedTickets);
    setActiveTicket(null);

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
      setActiveTicket(null);
    }
  };

  const handleDragStart = (event) => {
    const ticket = tickets.find(
      (ticket) => String(ticket.id) === String(event.active.id),
    );

    setActiveTicket(ticket);
  };
  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
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
        <DragOverlay>
          {activeTicket ? <TicketCardPreview ticket={activeTicket} /> : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
