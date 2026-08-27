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
import TicketDrawer from "../project/ticket/TicketDrawer";
import TicketFormModal from "../project/ticket/TicketFormModal";
import ConfirmDeleteTicketModal from "../project/ticket/ConfirmDeleteTicketModal";
import useTicketDetail from "../../hooks/useTicketDetails";
import useEpics from "../../hooks/useEpics";

import {
  updateKanbanBoard,
  updateTicket,
  deleteTicket,
  assignTicket,
} from "../../services/ticketService";
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

// Skeleton Loader component matching GitHub Dark theme
function KanbanBoardSkeleton() {
  return (
    <div className="flex h-full items-stretch gap-2 pt-3">
      {COLUMN_ORDER.map((column) => (
        <div
          key={column}
          className="flex w-80 min-w-[320px] flex-col rounded-xl border border-[#30363d] bg-[#161b22] p-3"
        >
          {/* Column Header Skeleton */}
          <div className="mb-4 flex items-center justify-between border-b border-[#30363d] pb-2">
            <div className="h-4 w-24 animate-pulse rounded bg-[#21262d]" />
            <div className="h-5 w-6 animate-pulse rounded-full bg-[#21262d]" />
          </div>

          {/* Ticket Skeletons */}
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-[#30363d] bg-[#0d1117] p-3.5 space-y-3"
              >
                <div className="h-4 w-3/4 animate-pulse rounded bg-[#21262d]" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-[#21262d]" />
                <div className="flex items-center justify-between pt-2">
                  <div className="h-6 w-6 animate-pulse rounded-full bg-[#21262d]" />
                  <div className="h-3 w-12 animate-pulse rounded bg-[#21262d]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const KanbanBoard = ({ tickets, setTickets, loading }) => {
  const [activeTicket, setActiveTicket] = useState(null);
  const [placeholder, setPlaceholder] = useState(null);

  // Drawer states
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTicketId, setActiveTicketId] = useState(null);

  // Edit Modal States
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Delete Modal States
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const { slug, project_slug } = useParams();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const { epics } = useEpics(slug, project_slug);
  const members = [];

  const {
    ticket: drawerTicket,
    loading: drawerLoading,
    error: drawerError,
    refetch: refetchDrawerTicket,
  } = useTicketDetail(slug, project_slug, activeTicketId);

  const handleTicketClick = (ticket) => {
    setActiveTicketId(ticket.id);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setActiveTicketId(null), 300);
  };

  const handleTicketUpdatedLocally = (updatedTicket) => {
    setTickets((prev) => {
      if (updatedTicket?.status && updatedTicket.status !== "OPEN") {
        return prev.filter((t) => t.id !== updatedTicket.id);
      }
      return prev.map((t) => (t.id === updatedTicket?.id ? updatedTicket : t));
    });

    if (activeTicketId && updatedTicket?.id === activeTicketId) {
      refetchDrawerTicket();
    }
  };

  const openEditModal = (ticket) => {
    setSelectedTicket(ticket);
    setSubmitError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setSubmitError("");
    setSelectedTicket(null);
    setModalOpen(false);
  };

  const handleFormSubmit = async (formData) => {
    try {
      setSubmitError("");
      setSubmitLoading(true);

      const { assignee, ...ticketFields } = formData;
      let savedTicket;

      if (selectedTicket) {
        savedTicket = await updateTicket(
          slug,
          project_slug,
          selectedTicket.id,
          ticketFields,
          dispatch,
          accessToken,
        );
      }

      const targetTicketId =
        savedTicket?.ticket?.id || savedTicket?.id || selectedTicket?.id;

      const originalAssigneeId = selectedTicket?.assignee?.id || null;
      const newAssigneeId = assignee || null;
      const didAssigneeChange = originalAssigneeId !== newAssigneeId;

      if (targetTicketId && didAssigneeChange) {
        await assignTicket(
          slug,
          project_slug,
          targetTicketId,
          newAssigneeId,
          dispatch,
          accessToken,
        );
      }

      closeModal();

      if (savedTicket) {
        handleTicketUpdatedLocally(savedTicket.ticket || savedTicket);
      }
      if (activeTicketId) {
        refetchDrawerTicket();
      }
    } catch (err) {
      setSubmitError(err.message || "Failed to process ticket");
    } finally {
      setSubmitLoading(false);
    }
  };

  const openDeleteConfirm = (ticket) => {
    setDeleteError("");
    setDeleteTarget(ticket);
  };

  const closeDeleteConfirm = () => {
    if (deleteLoading) return;
    setDeleteTarget(null);
    setDeleteError("");
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleteLoading(true);
      setDeleteError("");

      await deleteTicket(
        slug,
        project_slug,
        deleteTarget.id,
        dispatch,
        accessToken,
      );

      if (deleteTarget.id === activeTicketId) {
        closeDrawer();
      }

      setTickets((prev) => prev.filter((t) => t.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      setDeleteError(err.message || "Failed to delete ticket");
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="h-full w-full overflow-x-auto overflow-y-hidden">
        <KanbanBoardSkeleton />
      </div>
    );
  }

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

    const overId = String(over.id);

    if (isEndId(overId)) {
      setPlaceholder({
        column: fromEndId(overId),
        beforeTicketId: null,
      });
      return;
    }

    const overTicket = tickets.find((t) => String(t.id) === overId);

    if (overTicket) {
      setPlaceholder({
        column: overTicket.kanban_column,
        beforeTicketId: overTicket.id,
      });
      return;
    }

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
        className="h-full w-full overflow-x-auto overflow-y-hidden
        [scrollbar-width:thin] [scrollbar-color:#30363d_transparent]
        [&::-webkit-scrollbar]:h-2
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-[#30363d]
        hover:[&::-webkit-scrollbar-thumb]:bg-[#484f58]"
      >
        <div className="flex h-full items-stretch gap-2 pt-3">
          {COLUMN_ORDER.map((column) => (
            <KanbanColumn
              key={column}
              column={column}
              tickets={columns[column]}
              placeholder={placeholder}
              onTicketClick={handleTicketClick}
            />
          ))}
        </div>

        <DragOverlay dropAnimation={dropAnimationConfig}>
          {activeTicket ? <TicketCardPreview ticket={activeTicket} /> : null}
        </DragOverlay>
      </div>

      <TicketDrawer
        open={drawerOpen}
        ticket={drawerTicket}
        loading={drawerLoading}
        error={drawerError}
        onClose={closeDrawer}
        onEdit={openEditModal}
        onDelete={openDeleteConfirm}
        onTicketUpdated={handleTicketUpdatedLocally}
      />

      {modalOpen && (
        <TicketFormModal
          mode="edit"
          ticket={selectedTicket}
          epics={epics}
          members={members}
          onClose={closeModal}
          onSubmit={handleFormSubmit}
          loading={submitLoading}
          error={submitError}
        />
      )}

      {deleteTarget && (
        <ConfirmDeleteTicketModal
          ticket={deleteTarget}
          onCancel={closeDeleteConfirm}
          onConfirm={handleConfirmDelete}
          loading={deleteLoading}
          error={deleteError}
        />
      )}
    </DndContext>
  );
};

export default KanbanBoard;
