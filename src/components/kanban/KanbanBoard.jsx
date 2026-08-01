import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  DndContext,
  closestCorners,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";

import KanbanColumn from "./KanbanColumn";
import TicketCardPreview from "./TicketCardPreview";
import { updateKanbanBoard } from "../../services/ticketService";
import { isEndId, fromEndId } from "./kanbanDnd";

const COLUMN_ORDER = ["TODO", "IN_PROGRESS", "REVIEW", "DONE"];

const dropAnimationConfig = {
  duration: 280,
  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.4",
      },
    },
  }),
};

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

  // rawOverId may be a ticket id, a column id (empty column), or an
  // "__end" id (explicit end-of-column drop zone) — normalize the last
  // case down to the plain column id before doing any list surgery.
  const moveTicket = (tickets, activeId, rawOverId) => {
    const overId = isEndId(rawOverId) ? fromEndId(rawOverId) : rawOverId;

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
      // Hovering a real card — insert right before it
      draggedTicket.kanban_column = overTicket.kanban_column;

      const insertIndex = updated.findIndex(
        (ticket) => String(ticket.id) === String(overId),
      );

      updated.splice(insertIndex, 0, draggedTicket);
    } else {
      // Empty column OR the explicit end-drop-zone — append to the end
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

    const overId = String(over.id);

    // Explicit end-of-column zone — unambiguous "append to end"
    if (isEndId(overId)) {
      setPlaceholder({
        column: fromEndId(overId),
        beforeTicketId: null,
      });
      return;
    }

    // Hovering over another ticket — placeholder lands right before it
    const overTicket = tickets.find((t) => String(t.id) === overId);

    if (overTicket) {
      setPlaceholder({
        column: overTicket.kanban_column,
        beforeTicketId: overTicket.id,
      });
      return;
    }

    // Hovering an empty column's own droppable region
    if (COLUMN_ORDER.includes(overId)) {
      setPlaceholder({
        column: overId,
        beforeTicketId: null,
      });
      return;
    }

    setPlaceholder(null);
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (!over) {
      setActiveTicket(null);
      setPlaceholder(null);
      return;
    }

    if (String(active.id) === String(over.id)) {
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

    const updatedTickets = moveTicket(tickets, active.id, String(over.id));

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

  const handleDragCancel = () => {
    setActiveTicket(null);
    setPlaceholder(null);
  };

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      collisionDetection={closestCorners}
    >
      <div
        className="h-full w-full overflow-x-auto overflow-y-hidden pb-4
        [scrollbar-width:thin] [scrollbar-color:#30363d_transparent]
        [&::-webkit-scrollbar]:h-2
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-[#30363d]
        hover:[&::-webkit-scrollbar-thumb]:bg-[#484f58]"
      >
        <div className="flex h-full items-stretch gap-6 pt-6">
          {COLUMN_ORDER.map((column) => (
            <KanbanColumn
              key={column}
              column={column}
              tickets={columns[column]}
              placeholder={placeholder}
            />
          ))}
        </div>

        <DragOverlay dropAnimation={dropAnimationConfig}>
          {activeTicket ? <TicketCardPreview ticket={activeTicket} /> : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default KanbanBoard;
