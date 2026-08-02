import { useEffect } from "react";
import { X, Pencil, Trash2 } from "lucide-react";
import {
  getStatusStyle,
  getTypeTextStyle,
  getTypeIcon,
  getPriorityTextStyle,
  getPriorityIcon,
  formatLabel,
} from "./ticketBadgeConfig";

function TicketDrawer({
  ticket,
  loading,
  error,
  open,
  onClose,
  onEdit,
  onDelete,
}) {
  // Esc to close
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  const TypeIcon = ticket ? getTypeIcon(ticket.type) : null;
  const PriorityIcon = ticket ? getPriorityIcon(ticket.priority) : null;

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

        {!loading && !error && ticket && (
          <>
            {/* Header */}
            <div className="flex items-start justify-between gap-4 border-b border-[#21262d] px-6 py-5">
              <div className="min-w-0">
                <span className="rounded-md bg-[#161b22] px-2 py-1 font-mono text-[11px] font-medium text-[#6e7681] ring-1 ring-[#30363d]">
                  {ticket.ticket_number}
                </span>
                <h1 className="mt-3 text-xl font-semibold text-[#e6edf3]">
                  {ticket.title}
                </h1>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <button
                  onClick={() => onEdit(ticket)}
                  className="flex items-center gap-2 rounded-xl border border-[#30363d] px-3 py-2 text-sm text-[#c9d1d9] transition hover:bg-[#161b22] hover:text-white"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </button>
                <button
                  onClick={() => onDelete(ticket)}
                  className="flex items-center gap-2 rounded-xl border border-[#30363d] px-3 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </button>
                <button
                  onClick={onClose}
                  className="rounded-xl p-2 text-[#8b949e] transition hover:bg-[#161b22] hover:text-white"
                  title="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
              <div className="flex flex-wrap gap-6">
                <div>
                  <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#6e7681]">
                    Status
                  </p>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ${getStatusStyle(
                      ticket.status,
                    )}`}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {formatLabel(ticket.status)}
                  </span>
                </div>

                <div>
                  <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#6e7681]">
                    Type
                  </p>
                  <span
                    className={`inline-flex items-center gap-1.5 text-[13px] font-medium ${getTypeTextStyle(
                      ticket.type,
                    )}`}
                  >
                    <TypeIcon className="h-3.5 w-3.5" />
                    {formatLabel(ticket.type)}
                  </span>
                </div>

                <div>
                  <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#6e7681]">
                    Priority
                  </p>
                  <span
                    className={`inline-flex items-center gap-1.5 text-[13px] font-medium ${getPriorityTextStyle(
                      ticket.priority,
                    )}`}
                  >
                    <PriorityIcon className="h-3.5 w-3.5" />
                    {formatLabel(ticket.priority)}
                  </span>
                </div>

                {ticket.epic && (
                  <div>
                    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#6e7681]">
                      Epic
                    </p>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#161b22] px-2.5 py-0.5 text-[11px] font-medium text-[#c9d1d9] ring-1 ring-[#30363d]">
                      <span
                        className="h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ backgroundColor: ticket.epic.color }}
                      />
                      {ticket.epic.name}
                    </span>
                  </div>
                )}

                {ticket.story_points != null && (
                  <div>
                    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#6e7681]">
                      Story Points
                    </p>
                    <span className="text-sm text-[#c9d1d9]">
                      {ticket.story_points}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-[#6e7681]">
                  Description
                </p>
                <p className="text-sm leading-relaxed text-[#c9d1d9]">
                  {ticket.description || (
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
                  {ticket.creator ? (
                    <div className="flex items-center gap-2">
                      <img
                        src={ticket.creator.avatar}
                        alt={ticket.creator.username}
                        className="h-6 w-6 rounded-full"
                      />
                      <span className="text-sm text-[#c9d1d9]">
                        {ticket.creator.first_name} {ticket.creator.last_name}
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
                  {ticket.assignee ? (
                    <div className="flex items-center gap-2">
                      <img
                        src={ticket.assignee.avatar}
                        alt={ticket.assignee.username}
                        className="h-6 w-6 rounded-full"
                      />
                      <span className="text-sm text-[#c9d1d9]">
                        {ticket.assignee.first_name} {ticket.assignee.last_name}
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
    </>
  );
}

export default TicketDrawer;
