// components/project/ticket/TicketRow.jsx
import { Hash } from "lucide-react";
import {
  getTypeStyle,
  getStatusStyle,
  getPriorityStyle,
  formatLabel,
  formatRelativeTime,
} from "./ticketBadgeConfig";

function TicketRow({ ticket }) {
  return (
    <tr className="border-b border-[#21262d] transition-colors last:border-0 hover:bg-[#1c2128]">
      {/* Ticket number */}
      <td className="whitespace-nowrap px-5 py-3.5">
        <span className="font-mono text-xs text-[#6e7681]">
          {ticket.ticket_number}
        </span>
      </td>

      {/* Title */}
      <td className="px-5 py-3.5">
        <div>
          <h3 className="text-sm font-medium text-[#e6edf3]">{ticket.title}</h3>
          {ticket.description && (
            <p className="mt-0.5 line-clamp-1 text-xs text-[#8b949e]">
              {ticket.description}
            </p>
          )}
        </div>
      </td>

      {/* Type */}
      <td className="whitespace-nowrap px-5 py-3.5">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ${getTypeStyle(
            ticket.type,
          )}`}
        >
          {formatLabel(ticket.type)}
        </span>
      </td>

      {/* Status */}
      <td className="whitespace-nowrap px-5 py-3.5">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ${getStatusStyle(
            ticket.status,
          )}`}
        >
          {formatLabel(ticket.status)}
        </span>
      </td>

      {/* Priority */}
      <td className="whitespace-nowrap px-5 py-3.5">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium ring-1 ${getPriorityStyle(
            ticket.priority,
          )}`}
        >
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
    </tr>
  );
}

export default TicketRow;
