import { useEffect, useState } from "react";
import { X, Pencil, Trash2, Rocket } from "lucide-react";
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
import MoveToBoardModal from "./MoveToBoardModal";
import StatusActionDropdown from "./StatusActionDropdown";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;

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

  // Esc to close
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

  const iconButtonClass =
    "flex h-9 w-9 items-center justify-center rounded-xl border border-[#30363d] text-[#c9d1d9] transition hover:bg-[#161b22] hover:text-white";

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] transition-opacity duration-300 ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-2xl flex-col border-l border-[#30363d] bg-[#0d1117] shadow-[-20px_0_60px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-out ${
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
            {/* Header */}
            <div className="border-b border-[#21262d]">
              <div className="flex items-start justify-between gap-4 px-6 pt-5">
                <div className="min-w-0">
                  <span className="rounded-md bg-[#161b22] px-2 py-1 font-mono text-[11px] font-medium text-[#6e7681] ring-1 ring-[#30363d]">
                    {currentTicket.ticket_number}
                  </span>
                  <h1 className="mt-3 text-xl font-semibold text-[#e6edf3]">
                    {currentTicket.title}
                  </h1>
                </div>

                <button
                  onClick={onClose}
                  className="shrink-0 rounded-xl p-2 text-[#8b949e] transition hover:bg-[#161b22] hover:text-white"
                  title="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Action bar */}
              <div className="mt-4 flex items-center justify-between gap-3 px-6 pb-4">
                <div>
                  {currentTicket.status === "DRAFT" && (
                    <button
                      onClick={() => setShowMoveToBoard(true)}
                      className="flex items-center gap-2 rounded-xl bg-[#238636] px-3.5 py-2 text-sm font-medium text-white transition hover:bg-[#2ea043] hover:shadow-[0_0_16px_rgba(46,160,67,0.3)]"
                    >
                      <Rocket className="h-3.5 w-3.5" />
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

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onEdit(currentTicket)}
                    className={iconButtonClass}
                    title="Edit ticket"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(currentTicket)}
                    className={`${iconButtonClass} hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400`}
                    title="Delete ticket"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
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
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#238636]/10 px-2.5 py-0.5 text-[11px] font-medium text-[#3fb950] ring-1 ring-[#238636]/40">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#3fb950]" />
                        Live
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
                        className="h-6 w-6 rounded-full"
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
                        className="h-6 w-6 rounded-full"
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
            </div>
          </>
        )}
      </div>

      {showMoveToBoard && currentTicket && (
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
      )}
    </>
  );
}

export default TicketDrawer;
