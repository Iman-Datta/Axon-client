import { useEffect, useState } from "react";
import {
  X,
  Pencil,
  Trash2,
  Rocket,
  Check,
  Copy,
  Clock,
  CalendarDays,
  ListTodo,
  Zap,
  Eye,
  CheckCircle2,
  CircleDot,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getStatusStyle,
  getTypeTextStyle,
  getTypeIcon,
  getPriorityTextStyle,
  getPriorityIcon,
  formatLabel,
} from "./ticketBadgeConfig";
import MoveToBoardModal from "./Movetoboardmodal";
import StatusActionDropdown from "./Statusactiondropdown";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;

const KANBAN_ICONS = {
  TODO: ListTodo,
  IN_PROGRESS: Zap,
  REVIEW: Eye,
  DONE: CheckCircle2,
  DEFAULT: CircleDot,
};

function TicketDrawer({
  ticket,
  loading,
  error,
  open,
  onClose,
  onEdit,
  onDelete,
  epics = [],
  members = [],
  onTicketUpdated,
}) {
  const { slug, project_slug } = useParams();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [currentTicket, setCurrentTicket] = useState(ticket);
  useEffect(() => {
    setCurrentTicket(ticket);
  }, [ticket]);

  const [showMoveToBoard, setShowMoveToBoard] = useState(false);
  const [moveLoading, setMoveLoading] = useState(false);
  const [moveError, setMoveError] = useState(null);

  const [statusLoading, setStatusLoading] = useState(false);
  const [statusError, setStatusError] = useState(null);

  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  const updateTicketFields = async (payload) => {
    const res = await fetchWithAuth(
      `${API}/tickets/${slug}/${project_slug}/${currentTicket.id}/update/`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
      dispatch,
      accessToken,
    );

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      throw new Error(body?.message || "Failed to update ticket");
    }

    const data = await res.json();
    return data?.ticket || data;
  };

  const assignTicket = async (assigneeId) => {
    const res = await fetchWithAuth(
      `${API}/tickets/${slug}/${project_slug}/${currentTicket.id}/assign/`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignee: assigneeId }),
      },
      dispatch,
      accessToken,
    );

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      throw new Error(body?.message || "Failed to assign ticket");
    }

    const data = await res.json();
    return data?.ticket || data;
  };

  const applyUpdate = (updated) => {
    setCurrentTicket(updated);
    onTicketUpdated?.(updated);
  };

  const handleMoveToBoardConfirm = async (formPayload) => {
    setMoveLoading(true);
    setMoveError(null);
    try {
      const { assignee, ...fields } = formPayload;

      let updated = await updateTicketFields({ ...fields, status: "OPEN" });

      if (assignee) {
        updated = await assignTicket(assignee);
      }

      setShowMoveToBoard(false);
      applyUpdate(updated);
    } catch (err) {
      setMoveError(err.message || "Something went wrong");
    } finally {
      setMoveLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    setStatusLoading(true);
    setStatusError(null);
    try {
      const updated = await updateTicketFields({ status: newStatus });
      applyUpdate(updated);
    } catch (err) {
      setStatusError(err.message || "Something went wrong");
    } finally {
      setStatusLoading(false);
    }
  };

  const TypeIcon = currentTicket ? getTypeIcon(currentTicket.type) : null;
  const PriorityIcon = currentTicket
    ? getPriorityIcon(currentTicket.priority)
    : null;

  const columnKey = currentTicket?.kanban_column || "TODO";
  const KanbanIcon = KANBAN_ICONS[columnKey] || KANBAN_ICONS.DEFAULT;

  const iconButtonClass =
    "flex h-8 w-8 items-center justify-center rounded-lg text-[#8b949e] transition-colors hover:bg-[#161b22] hover:text-[#e6edf3]";

  const [copied, setCopied] = useState(false);
  const handleCopyTicketNumber = async () => {
    try {
      await navigator.clipboard.writeText(currentTicket.ticket_number);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.log(err);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity duration-300 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-2xl flex-col border-l border-[#21262d] bg-gradient-to-b from-[#0d1117] to-[#0a0d12] shadow-[-30px_0_80px_rgba(0,0,0,0.55)] transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {loading && (
          <div className="flex flex-1 items-center justify-center">
            <p className="text-sm text-[#8b949e]">Loading ticket...</p>
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-1 flex-col items-center justify-center gap-3">
            <p className="text-sm text-red-400">{error}</p>
            <button
              onClick={onClose}
              className="rounded-xl border border-[#30363d] px-4 py-2 text-sm text-[#c9d1d9] hover:bg-[#161b22]"
            >
              Close
            </button>
          </div>
        )}

        {!loading && !error && currentTicket && (
          <>
            <div className="border-b border-[#21262d] bg-[#0d1117] pt-6 sticky top-0 z-10">
              <div className="flex items-start justify-between gap-4 px-7">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="rounded-md bg-[#161b22] px-2 py-1 font-mono text-[11px] font-medium tracking-wide text-[#6e7681] ring-1 ring-[#30363d]">
                      {currentTicket.ticket_number}
                    </span>
                    <button
                      onClick={handleCopyTicketNumber}
                      className="relative flex h-6 w-6 items-center justify-center rounded-md text-[#6e7681] transition hover:bg-[#161b22] hover:text-[#c9d1d9]"
                      title="Copy ticket number"
                    >
                      {copied ? (
                        <Check className="h-3 w-3 text-[#3fb950]" />
                      ) : (
                        <Copy className="h-3 w-3" />
                      )}
                    </button>
                  </div>
                  <h1 className="mt-3 text-[22px] font-semibold leading-snug tracking-tight text-[#f0f6fc]">
                    {currentTicket.title}
                  </h1>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <button
                    onClick={() => onEdit(currentTicket)}
                    className={iconButtonClass}
                    title="Edit ticket"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(currentTicket)}
                    className={`${iconButtonClass} hover:!text-red-400 hover:!bg-red-500/10`}
                    title="Delete ticket"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <div className="mx-1.5 h-4 w-px bg-[#30363d]" />
                  <button
                    onClick={onClose}
                    className={iconButtonClass}
                    title="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3 px-7 pb-5">
                <div>
                  {currentTicket.status === "DRAFT" && (
                    <button
                      onClick={() => setShowMoveToBoard(true)}
                      className="group flex items-center gap-2 rounded-full bg-gradient-to-b from-[#2f81f7] to-[#1f6feb] px-4 py-1.5 text-[13px] font-medium text-white shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,0_4px_12px_rgba(31,111,235,0.35)] transition-all hover:shadow-[0_1px_0_rgba(255,255,255,0.2)_inset,0_6px_16px_rgba(31,111,235,0.5)] hover:brightness-110 active:scale-[0.98]"
                    >
                      <Rocket className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
                      Add to Sprint
                    </button>
                  )}

                  {currentTicket.status !== "DRAFT" && (
                    <StatusActionDropdown
                      status={currentTicket.status}
                      onSelect={handleStatusChange}
                      loading={statusLoading}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-7 overflow-y-auto px-7 py-7 custom-scrollbar">
              {statusError && (
                <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {statusError}
                </div>
              )}

              <div className="flex flex-wrap gap-6">
                <div>
                  <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#6e7681]">
                    Status
                  </p>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ${getStatusStyle(
                        currentTicket.status,
                      )}`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {formatLabel(currentTicket.status)}
                    </span>

                    {currentTicket.status === "OPEN" && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#161b22] px-2.5 py-0.5 text-[11px] font-medium text-[#c9d1d9] ring-1 ring-[#30363d]">
                        <KanbanIcon className="h-3.5 w-3.5 text-[#8b949e]" />
                        {formatLabel(columnKey)}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#6e7681]">
                    Type
                  </p>
                  <span
                    className={`inline-flex items-center gap-1.5 text-[13px] font-medium ${getTypeTextStyle(
                      currentTicket.type,
                    )}`}
                  >
                    <TypeIcon className="h-3.5 w-3.5" />
                    {formatLabel(currentTicket.type)}
                  </span>
                </div>

                <div>
                  <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#6e7681]">
                    Priority
                  </p>
                  <span
                    className={`inline-flex items-center gap-1.5 text-[13px] font-medium ${getPriorityTextStyle(
                      currentTicket.priority,
                    )}`}
                  >
                    <PriorityIcon className="h-3.5 w-3.5" />
                    {formatLabel(currentTicket.priority)}
                  </span>
                </div>

                {currentTicket.epic && (
                  <div>
                    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#6e7681]">
                      Epic
                    </p>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#161b22] px-2.5 py-0.5 text-[11px] font-medium text-[#c9d1d9] ring-1 ring-[#30363d]">
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: currentTicket.epic.color }}
                      />
                      {currentTicket.epic.name}
                    </span>
                  </div>
                )}

                {currentTicket.story_points != null && (
                  <div>
                    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#6e7681]">
                      Story Points
                    </p>
                    <span className="text-sm text-[#c9d1d9]">
                      {currentTicket.story_points}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[#6e7681]">
                  Description
                </p>
                <p className="text-sm leading-relaxed text-[#c9d1d9]">
                  {currentTicket.description || (
                    <span className="text-[#6e7681]">
                      No description provided.
                    </span>
                  )}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 border-t border-[#21262d] pt-6">
                <div>
                  <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#6e7681]">
                    Creator
                  </p>
                  {currentTicket.creator ? (
                    <div className="flex items-center gap-2">
                      <img
                        src={currentTicket.creator.avatar}
                        alt={currentTicket.creator.username}
                        className="h-6 w-6 rounded-full ring-1 ring-[#30363d]"
                      />
                      <span className="text-sm text-[#c9d1d9]">
                        {currentTicket.creator.first_name}{" "}
                        {currentTicket.creator.last_name}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-[#6e7681]">-</span>
                  )}
                </div>

                <div>
                  <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#6e7681]">
                    Assignee
                  </p>
                  {currentTicket.assignee ? (
                    <div className="flex items-center gap-2">
                      <img
                        src={currentTicket.assignee.avatar}
                        alt={currentTicket.assignee.username}
                        className="h-6 w-6 rounded-full ring-1 ring-[#30363d]"
                      />
                      <span className="text-sm text-[#c9d1d9]">
                        {currentTicket.assignee.first_name}{" "}
                        {currentTicket.assignee.last_name}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-[#6e7681]">Unassigned</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 px-1 pt-2 text-[11px] font-medium text-[#6e7681]">
                <div className="flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5 opacity-70" />
                  <span>Created {formatDate(currentTicket.created_at)}</span>
                </div>

                <span className="text-[#30363d]">•</span>

                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 opacity-70" />
                  <span>Updated {formatDate(currentTicket.updated_at)}</span>
                </div>
              </div>

              <div className="border-t border-[#21262d] pt-6">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-[#6e7681]">
                  Activities
                </p>
                <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-[#30363d] bg-[#0d1117]/40 py-8 text-center">
                  <span className="text-sm font-medium text-[#8b949e]">
                    Coming soon in next update
                  </span>
                  <span className="text-[12px] text-[#6e7681]">
                    Activity history and comments will appear here.
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {showMoveToBoard && currentTicket && (
        <div className="fixed inset-0 z-60 flex items-center justify-center">
          <MoveToBoardModal
            ticket={currentTicket}
            epics={epics}
            members={members}
            onClose={() => {
              setShowMoveToBoard(false);
              setMoveError(null);
            }}
            onConfirm={handleMoveToBoardConfirm}
            loading={moveLoading}
            error={moveError}
          />
        </div>
      )}
    </>
  );
}

export default TicketDrawer;