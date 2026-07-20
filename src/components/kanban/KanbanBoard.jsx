import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { DndContext, closestCorners, DragOverlay } from "@dnd-kit/core";

import KanbanColumn from "./KanbanColumn";
import TicketCardPreview from "./TicketCardPreview";
import { updateKanbanBoard } from "../../services/ticketService";

const COLUMN_ORDER = ["TODO", "IN_PROGRESS", "REVIEW", "DONE"];

const KanbanBoard = ({ tickets, setTickets }) => {
  const [activeTicket, setActiveTicket] = useState(null);
  const [placeholder, setPlaceholder] = useState(null);

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

  const moveTicket = (tickets, activeId, overId) => {
    const updated = tickets.map((ticket) => ({ ...ticket }));

    const activeIndex = updated.findIndex(
      (ticket) => String(ticket.id) === String(activeId),
    );

    if (activeIndex === -1) return updated;

    const [draggedTicket] = updated.splice(activeIndex, 1);

    const overTicket = updated.find(
      (ticket) => String(ticket.id) === String(overId),
    );

    if (overTicket) {
      draggedTicket.kanban_column = overTicket.kanban_column;

      const insertIndex = updated.findIndex(
        (ticket) => String(ticket.id) === String(overId),
      );

      updated.splice(insertIndex, 0, draggedTicket);
    } else {
      draggedTicket.kanban_column = overId;
      updated.push(draggedTicket);
    }

    COLUMN_ORDER.forEach((column) => {
      let order = 1;

      updated
        .filter((ticket) => ticket.kanban_column === column)
        .forEach((ticket) => {
          ticket.order = order++;
        });
    });

    return updated;
  };

  const handleDragStart = (event) => {
    const ticket = tickets.find(
      (ticket) => String(ticket.id) === String(event.active.id),
    );

    setActiveTicket(ticket);
  };

  const handleDragOver = ({ over }) => {
    if (!over) {
      setPlaceholder(null);
      return;
    }

    const ticket = tickets.find((t) => String(t.id) === String(over.id));

    if (!ticket) return;

    setPlaceholder({
      column: ticket.kanban_column,
      beforeTicketId: ticket.id,
      beforeOrder: ticket.order,
    });
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) {
      setActiveTicket(null);
      setPlaceholder(null);
      return;
    }

    if (active.id === over.id) {
      setActiveTicket(null);
      setPlaceholder(null);
      return;
    }

    const draggedTicket = tickets.find(
      (ticket) => String(ticket.id) === String(active.id),
    );

    if (!draggedTicket) {
      setActiveTicket(null);
      setPlaceholder(null);
      return;
    }

    const previousTickets = tickets.map((ticket) => ({ ...ticket }));

    const updatedTickets = moveTicket(tickets, active.id, over.id);

    setTickets(updatedTickets);
    setActiveTicket(null);
    setPlaceholder(null);

    try {
      await updateKanbanBoard(
        slug,
        project_slug,
        updatedTickets.map((ticket) => ({
          id: ticket.id,
          kanban_column: ticket.kanban_column,
          order: ticket.order,
        })),
        dispatch,
        accessToken,
      );
    } catch (error) {
      console.error(error);

      setTickets(previousTickets);
      setActiveTicket(null);
      setPlaceholder(null);
    }
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
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
              placeholder={placeholder}
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
