import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import TicketHeader from "../../components/project/ticket/TicketHeader";
import TicketTable from "../../components/project/ticket/TicketTable";
import TicketDrawer from "../../components/project/ticket/TicketDrawer";
import TicketFormModal from "../../components/project/ticket/TicketFormModal";
import ConfirmDeleteTicketModal from "../../components/project/ticket/ConfirmDeleteTicketModal";

import useTickets from "../../hooks/useTickets";
import useEpics from "../../hooks/useEpics";
import useTicketDetail from "../../hooks/useTicketDetails";

import {
  createTicket,
  updateTicket,
  deleteTicket,
  assignTicket,
} from "../../services/ticketService";

function TicketsTablePage() {
  const { slug, project_slug } = useParams();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTicketId, setActiveTicketId] = useState(null);

  const { tickets, count, loading, error, refetch } = useTickets(
    slug,
    project_slug,
  );
  const { epics } = useEpics(slug, project_slug);
  const {
    ticket: drawerTicket,
    loading: drawerLoading,
    error: drawerError,
    refetch: refetchDrawerTicket,
  } = useTicketDetail(slug, project_slug, activeTicketId);

  const members = [];

  const [localTickets, setLocalTickets] = useState([]);
  const [hasFetchedOnce, setHasFetchedOnce] = useState(false);

  // Sync the hook's tickets into our local UI state
  useEffect(() => {
    if (tickets) {
      setLocalTickets(tickets);
      setHasFetchedOnce(true); // Prevents the screen from blanking out on subsequent refetches
    }
  }, [tickets]);

  const handleTicketUpdatedLocally = (updatedTicket) => {
    setLocalTickets((prev) =>
      prev.map((t) => (t.id === updatedTicket?.id ? updatedTicket : t)),
    );
    // Do a silent refetch in the background to ensure 100% sync, but no glitch will happen!
    refetch();
  };

  const handleRowSelect = (ticket) => {
    setActiveTicketId(ticket?.id);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setTimeout(() => setActiveTicketId(null), 300);
  };

  const openCreateModal = () => {
    setModalMode("create");
    setSelectedTicket(null);
    setSubmitError("");
    setModalOpen(true);
  };

  const openEditModal = (ticket) => {
    setModalMode("edit");
    setSelectedTicket(ticket);
    setSubmitError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setSubmitError("");
    setModalMode("create");
    setSelectedTicket(null);
    setModalOpen(false);
  };

  const handleFormSubmit = async (formData) => {
    try {
      setSubmitError("");
      setSubmitLoading(true);

      const { assignee, ...ticketFields } = formData;
      let savedTicket;

      if (modalMode === "edit" && selectedTicket) {
        savedTicket = await updateTicket(
          slug,
          project_slug,
          selectedTicket.id,
          ticketFields,
          dispatch,
          accessToken,
        );
      } else {
        savedTicket = await createTicket(
          slug,
          project_slug,
          ticketFields,
          dispatch,
          accessToken,
        );
      }

      const targetTicketId =
        savedTicket?.ticket?.id || savedTicket?.id || selectedTicket?.id;

      const originalAssigneeId = selectedTicket?.assignee?.id || null;
      const newAssigneeId = assignee || null; // assignee is already a Number or null from TicketFormModal

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

      // Update UI optimistically without glitching
      await refetch();

      if (activeTicketId && selectedTicket?.id === activeTicketId) {
        await refetchDrawerTicket();
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

      setDeleteTarget(null);
      await refetch();
    } catch (err) {
      setDeleteError(err.message || "Failed to delete ticket");
    } finally {
      setDeleteLoading(false);
    }
  };

  // Only show the hard loading screen if we have NEVER fetched tickets before.
  if (loading && !hasFetchedOnce) {
    return <h1 className="mt-18 px-4 text-[#8b949e]">Loading tickets...</h1>;
  }

  if (error) {
    return <h1 className="mt-18 px-4 text-red-500">{error}</h1>;
  }

  return (
    <div className="mt-18 px-2">
      <TicketHeader onCreateTicket={openCreateModal} count={count} />

      {/* Render from localTickets instead of tickets */}
      {localTickets.length === 0 ? (
        <div className="rounded-2xl border border-[#30363d] bg-[#161b22] p-10 text-center">
          <h2 className="text-lg font-semibold text-[#e6edf3]">
            No tickets yet
          </h2>
          <p className="mt-2 text-[#8b949e]">
            Create your first ticket to get started.
          </p>
        </div>
      ) : (
        <TicketTable
          tickets={localTickets}
          onEdit={openEditModal}
          onDelete={openDeleteConfirm}
          onSelect={handleRowSelect}
        />
      )}

      <TicketDrawer
        open={drawerOpen}
        ticket={drawerTicket}
        loading={drawerLoading}
        error={drawerError}
        onClose={closeDrawer}
        onEdit={openEditModal}
        onDelete={openDeleteConfirm}
        // FIX: Pass the local state update function instead of a raw refetch()
        onTicketUpdated={handleTicketUpdatedLocally}
      />

      {modalOpen && (
        <TicketFormModal
          mode={modalMode}
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
    </div>
  );
}

export default TicketsTablePage;
