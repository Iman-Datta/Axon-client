import { useEffect, useState, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Search, ArrowUpDown, X, User } from "lucide-react";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const currentUser = useSelector((state) => state.auth.user);

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

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortByStoryPoints, setSortByStoryPoints] = useState("NONE");

  const [assignedToMe, setAssignedToMe] = useState(
    searchParams.get("filter") === "assigned",
  );

  const { tickets, count, can_edit, loading, error, refetch } = useTickets(
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

  useEffect(() => {
    if (tickets) {
      setLocalTickets(tickets);
      setHasFetchedOnce(true);
    }
  }, [tickets]);

  const handleRowSelect = (ticket) => {
    setActiveTicketId(ticket?.id);
    setDrawerOpen(true);
  };

  useEffect(() => {
    const ticketIdToOpen = searchParams.get("openTicket");
    if (ticketIdToOpen && localTickets.length > 0) {
      const targetTicket = localTickets.find(
        (t) => t.id.toString() === ticketIdToOpen.toString(),
      );
      if (targetTicket) {
        handleRowSelect(targetTicket);
        searchParams.delete("openTicket");
        setSearchParams(searchParams);
      }
    }
  }, [localTickets, searchParams, setSearchParams]);

  const filteredAndSortedTickets = useMemo(() => {
    let result = [...localTickets];

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title?.toLowerCase().includes(q) ||
          t.ticket_number?.toLowerCase().includes(q),
      );
    }

    if (statusFilter !== "ALL") {
      result = result.filter((t) => t.status === statusFilter);
    }

    if (assignedToMe && currentUser) {
      result = result.filter(
        (t) =>
          t.assignee?.id === currentUser.id || t.assignee_id === currentUser.id,
      );
    }

    if (sortByStoryPoints === "ASC") {
      result.sort((a, b) => (a.story_points || 0) - (b.story_points || 0));
    } else if (sortByStoryPoints === "DESC") {
      result.sort((a, b) => (b.story_points || 0) - (a.story_points || 0));
    }

    return result;
  }, [
    localTickets,
    searchQuery,
    statusFilter,
    assignedToMe,
    sortByStoryPoints,
    currentUser,
  ]);

  const handleTicketUpdatedLocally = (updatedTicket) => {
    setLocalTickets((prev) =>
      prev.map((t) => (t.id === updatedTicket?.id ? updatedTicket : t)),
    );
    refetch();
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

  if (loading && !hasFetchedOnce) {
    return <h1 className="mt-18 px-4 text-[#8b949e]">Loading tickets...</h1>;
  }

  if (error) {
    return <h1 className="mt-18 px-4 text-red-500">{error}</h1>;
  }

  return (
    <div className="mt-18 px-2">
      <TicketHeader
        onCreateTicket={openCreateModal}
        count={count}
        can_edit={can_edit}
      />

      <div className="mb-5 mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#30363d] bg-[#161b22] p-3 shadow-sm">
        {/* Left Side: Search Bar */}
        <div className="relative min-w-[240px] flex-1">
          <Search
            size={16}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8b949e]"
          />
          <input
            type="text"
            placeholder="Search tickets by title or ID (e.g. AXON-1)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-[#30363d] bg-[#0d1117] py-2 pl-10 pr-9 text-xs text-[#f0f6fc] placeholder-[#8b949e] outline-none transition-colors focus:border-[#58a6ff]"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b949e] hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Assigned to Me Toggle */}
          <button
            type="button"
            onClick={() => setAssignedToMe(!assignedToMe)}
            aria-pressed={assignedToMe}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition-all ${
              assignedToMe
                ? "border-[#58a6ff] bg-[#1f6feb]/15 text-[#58a6ff]"
                : "border-[#30363d] bg-[#0d1117] text-[#8b949e] hover:border-[#8b949e] hover:text-[#f0f6fc]"
            }`}
          >
            <User size={13} />
            Assigned to me
          </button>

          {/* Status Filter */}
          <label className="flex items-center gap-1.5 rounded-lg border border-[#30363d] bg-[#0d1117] px-3 py-1.5">
            <span className="text-[11px] font-medium text-[#8b949e]">
              Status
            </span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="cursor-pointer bg-transparent text-xs font-semibold text-[#f0f6fc] outline-none"
            >
              <option value="ALL" className="bg-[#161b22]">
                All Statuses
              </option>
              <option value="OPEN" className="bg-[#161b22]">
                Open
              </option>
              <option value="DONE" className="bg-[#161b22]">
                Done
              </option>
              <option value="BLOCKED" className="bg-[#161b22]">
                Blocked
              </option>
              <option value="CANCELLED" className="bg-[#161b22]">
                Cancelled
              </option>
            </select>
          </label>

          {/* Story Points Sort */}
          <label className="flex items-center gap-1.5 rounded-lg border border-[#30363d] bg-[#0d1117] px-3 py-1.5">
            <ArrowUpDown size={13} className="text-[#8b949e]" />
            <span className="text-[11px] font-medium text-[#8b949e]">
              Story Points
            </span>
            <select
              value={sortByStoryPoints}
              onChange={(e) => setSortByStoryPoints(e.target.value)}
              className="cursor-pointer bg-transparent text-xs font-semibold text-[#f0f6fc] outline-none"
            >
              <option value="NONE" className="bg-[#161b22]">
                Default
              </option>
              <option value="ASC" className="bg-[#161b22]">
                Low to High
              </option>
              <option value="DESC" className="bg-[#161b22]">
                High to Low
              </option>
            </select>
          </label>
        </div>
      </div>

      {filteredAndSortedTickets.length === 0 ? (
        <div className="rounded-2xl border border-[#30363d] bg-[#161b22] p-10 text-center">
          <h2 className="text-lg font-semibold text-[#e6edf3]">
            No matching tickets found
          </h2>
          <p className="mt-2 text-[#8b949e]">
            Try adjusting your search query or filter settings.
          </p>
        </div>
      ) : (
        <TicketTable
          tickets={filteredAndSortedTickets}
          can_edit={can_edit}
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
