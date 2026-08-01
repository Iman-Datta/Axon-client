import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Hash, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import {
  getStatusStyle,
  getTypeTextStyle,
  getTypeIcon,
  getPriorityTextStyle,
  getPriorityIcon,
  formatLabel,
  formatRelativeTime,
} from "./ticketBadgeConfig";

// Approx
const MENU_WIDTH = 192;
const MENU_HEIGHT = 166;
const GAP = 6;
const PADDING = 8;

function TicketRow({ ticket, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const openMenu = () => {
    const rect = buttonRef.current.getBoundingClientRect();

    // Horizontal position
    const left = Math.max(
      PADDING,
      Math.min(
        rect.right - MENU_WIDTH,
        window.innerWidth - MENU_WIDTH - PADDING,
      ),
    );

    // Space available
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    let top;

    if (spaceBelow >= MENU_HEIGHT + GAP) {
      // Open downward
      top = rect.bottom + GAP;
    } else if (spaceAbove >= MENU_HEIGHT + GAP) {
      // Open upward
      top = rect.top - MENU_HEIGHT - GAP;
    } else {
      // Not enough room either side -> keep inside viewport
      top = Math.max(
        PADDING,
        Math.min(rect.bottom + GAP, window.innerHeight - MENU_HEIGHT - PADDING),
      );
    }

    setMenuPos({ top, left });
    setOpen(true);
  };

  // click outside — check both the button and the portaled menu
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        buttonRef.current?.contains(e.target) ||
        menuRef.current?.contains(e.target)
      ) {
        return;
      }
      setOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Esc to close
  useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open]);

  // close on scroll (fixed-position menu would drift from the button)
  useEffect(() => {
    if (!open) return;
    function handleScroll() {
      setOpen(false);
    }
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [open]);

  const TypeIcon = getTypeIcon(ticket.type);
  const PriorityIcon = getPriorityIcon(ticket.priority);

  return (
    <tr className="group border-b border-[#21262d] transition-colors last:border-0 hover:bg-[#1c2128]">
      {/* Ticket number */}
      <td className="whitespace-nowrap px-5 py-3.5">
        <span className="rounded-md bg-[#0d1117] px-2 py-1 font-mono text-[11px] font-medium text-[#6e7681] ring-1 ring-[#30363d]">
          {ticket.ticket_number}
        </span>
      </td>

      {/* Title */}
      <td className="max-w-[260px] px-5 py-3.5">
        <h3 className="truncate text-sm font-medium text-[#e6edf3]">
          {ticket.title}
        </h3>
        {ticket.description && (
          <p className="mt-0.5 truncate text-xs text-[#8b949e]">
            {ticket.description}
          </p>
        )}
      </td>

      {/* Type — plain text + icon, no pill */}
      <td className="whitespace-nowrap px-5 py-3.5">
        <span
          className={`inline-flex items-center gap-1.5 text-[13px] font-medium ${getTypeTextStyle(
            ticket.type,
          )}`}
        >
          <TypeIcon className="h-3.5 w-3.5" strokeWidth={2} />
          {formatLabel(ticket.type)}
        </span>
      </td>

      {/* Status — pill retained, it's a state */}
      <td className="whitespace-nowrap px-5 py-3.5">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ${getStatusStyle(
            ticket.status,
          )}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-current" />
          {formatLabel(ticket.status)}
        </span>
      </td>

      {/* Priority — plain text + signal icon, no pill */}
      <td className="whitespace-nowrap px-5 py-3.5">
        <span
          className={`inline-flex items-center gap-1.5 text-[13px] font-medium ${getPriorityTextStyle(
            ticket.priority,
          )}`}
        >
          <PriorityIcon className="h-3.5 w-3.5" strokeWidth={2} />
          {formatLabel(ticket.priority)}
        </span>
      </td>

      {/* Epic */}
      <td className="whitespace-nowrap px-5 py-3.5">
        {ticket.epic ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#0d1117] px-2.5 py-0.5 text-[11px] font-medium text-[#c9d1d9] ring-1 ring-[#30363d]">
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: ticket.epic.color }}
            />
            {ticket.epic.name}
          </span>
        ) : (
          <span className="text-xs text-[#6e7681]">-</span>
        )}
      </td>

      {/* Story points */}
      <td className="whitespace-nowrap px-5 py-3.5">
        {ticket.story_points != null ? (
          <span className="inline-flex items-center gap-1 rounded-md bg-[#0d1117] px-2 py-0.5 text-xs font-medium text-[#c9d1d9] ring-1 ring-[#30363d]">
            <Hash className="h-3 w-3 text-[#6e7681]" />
            {ticket.story_points}
          </span>
        ) : (
          <span className="text-xs text-[#6e7681]">-</span>
        )}
      </td>

      {/* Updated */}
      <td className="whitespace-nowrap px-5 py-3.5">
        <span
          className="text-xs text-[#8b949e]"
          title={new Date(ticket.updated_at).toLocaleString()}
        >
          {formatRelativeTime(ticket.updated_at)}
        </span>
      </td>

      {/* Actions */}
      <td className="whitespace-nowrap px-5 py-3.5 text-right">
        <button
          ref={buttonRef}
          onClick={(e) => {
            e.stopPropagation();
            open ? setOpen(false) : openMenu();
          }}
          className={`rounded-md p-1.5 text-[#8b949e] transition-all duration-150 hover:bg-[#21262d] hover:text-[#e6edf3] ${
            open
              ? "bg-[#21262d] text-[#e6edf3]"
              : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>

        {open &&
          createPortal(
            <div
              ref={menuRef}
              style={{
                top: menuPos.top,
                left: menuPos.left,
                width: MENU_WIDTH,
              }}
              className="animate-in fade-in zoom-in-95 fixed z-[100] origin-top-right overflow-hidden rounded-xl border border-[#30363d] bg-[#161b22] py-1 shadow-2xl"
            >
              <button
                className="flex w-full items-center gap-3 px-3.5 py-2.5 text-left text-sm text-[#c9d1d9] transition hover:bg-[#21262d]"
                onClick={() => {
                  setOpen(false);
                  onEdit?.(ticket);
                }}
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#388bfd]/10 text-[#58a6ff]">
                  <Pencil className="h-3.5 w-3.5" />
                </span>
                Edit ticket
              </button>

              <div className="mx-2 my-1 border-t border-[#30363d]" />

              <button
                className="flex w-full items-center gap-3 px-3.5 py-2.5 text-left text-sm text-red-400 transition hover:bg-red-500/10"
                onClick={() => {
                  setOpen(false);
                  onDelete?.(ticket);
                }}
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-red-500/10 text-red-400">
                  <Trash2 className="h-3.5 w-3.5" />
                </span>
                Delete ticket
              </button>
            </div>,
            document.body,
          )}
      </td>
    </tr>
  );
}

export default TicketRow;
