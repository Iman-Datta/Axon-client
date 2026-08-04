import { useState } from "react";
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
} from "../../services/ticketService";

function TicketsTablePage() {
  const { slug, project_slug } = useParams();

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  // create / edit modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // delete confirm state
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  // drawer state
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

  // Temporary until project members API is built TODO
  const members = [];

  const handleRowSelect = (ticket) => {
    console.log("[TicketsTablePage] row clicked ->", ticket);
    setActiveTicketId(ticket.id);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    console.log("[TicketsTablePage] closing drawer");
    setDrawerOpen(false);
    // small delay so the close animation isn't cut off by clearing data mid-slide
    setTimeout(() => setActiveTicketId(null), 300);
  };

  const openCreateModal = () => {
    setModalMode("create");
    setSelectedTicket(null);
    setSubmitError("");
    setModalOpen(true);
  };

  const openEditModal = (ticket) => {
    console.log("[TicketsTablePage] edit ->", ticket);
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
      console.log("[TicketsTablePage] submitting form ->", modalMode, formData);

      if (modalMode === "edit" && selectedTicket) {
        await updateTicket(
          slug,
          project_slug,
          selectedTicket.id,
          formData,
          dispatch,
          accessToken,
        );
      } else {
        await createTicket(slug, project_slug, formData, dispatch, accessToken);
      }

      closeModal();
      await refetch();

      // if the ticket being edited is currently open in the drawer, refresh it too
      if (activeTicketId && selectedTicket?.id === activeTicketId) {
        await refetchDrawerTicket();
      }
    } catch (err) {
      console.log("[TicketsTablePage] submit error ->", err.message);
      setSubmitError(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  const openDeleteConfirm = (ticket) => {
    console.log("[TicketsTablePage] delete requested ->", ticket);
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
      console.log("[TicketsTablePage] confirming delete ->", deleteTarget.id);

      await deleteTicket(
        slug,
        project_slug,
        deleteTarget.id,
        dispatch,
        accessToken,
      );

      // if the deleted ticket is open in the drawer, close it
      if (deleteTarget.id === activeTicketId) {
        closeDrawer();
      }

      setDeleteTarget(null);
      await refetch();
    } catch (err) {
      console.log("[TicketsTablePage] delete error ->", err.message);
      setDeleteError(err.message);
    } finally {
      setDeleteLoading(false);
    }
  };

  if (loading) {
    return <h1 className="mt-18">Loading...</h1>;
  }

  if (error) {
    return <h1 className="mt-18 text-red-500">{error}</h1>;
  }

  return (
    <div className="mt-18 px-2">
      <TicketHeader onCreateTicket={openCreateModal} count={count} />
      {tickets.length === 0 ? (
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
          tickets={tickets}
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
