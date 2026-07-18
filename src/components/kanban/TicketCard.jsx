import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { CalendarDays } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const priorityColors = {
  LOW: "text-[#8b949e] bg-[#8b949e]/10",
  MEDIUM: "text-[#d29922] bg-[#d29922]/10",
  HIGH: "text-[#f85149] bg-[#f85149]/10",
  URGENT: "text-[#f85149] bg-[#f85149]/15",
};

const TicketCard = ({ ticket }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: ticket.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const navigate = useNavigate();
  const { slug, project_slug } = useParams();

  const priorityClass =
    priorityColors[ticket.priority?.toUpperCase()] ||
    "text-[#8b949e] bg-[#8b949e]/10";

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => navigate(`/${slug}/${project_slug}/tickets/${ticket.id}`)}
      className="group cursor-pointer rounded-xl border border-[#30363d] bg-[#0d1117] p-4 transition-all duration-200 hover:border-[#388bfd]/40 hover:bg-[#111827]"
    >
      <div className="mb-2 text-[11px] font-medium tracking-wide text-[#6e7681]">
        {ticket.ticket_number}
      </div>

      <h3 className="mb-3 line-clamp-2 text-[14px] font-medium leading-snug text-[#e6edf3] transition-colors group-hover:text-[#58a6ff]">
        {ticket.title}
      </h3>

      <div className="mb-3 flex flex-wrap gap-1.5">
        <span
          className={`rounded-md px-2 py-0.5 text-[10.5px] font-medium ${priorityClass}`}
        >
          {ticket.priority}
        </span>

        <span className="rounded-md bg-[#388bfd]/10 px-2 py-0.5 text-[10.5px] font-medium text-[#58a6ff]">
          {ticket.type}
        </span>
      </div>

      {ticket.epic && (
        <div
          className="mb-3 inline-flex items-center rounded-md px-2 py-0.5 text-[10.5px] font-medium text-white"
          style={{ backgroundColor: ticket.epic.color }}
        >
          {ticket.epic.name}
        </div>
      )}

      <div className="mt-3 flex items-center justify-between border-t border-[#21262d] pt-3">
        {ticket.due_date ? (
          <div className="flex items-center gap-1.5 text-[11px] text-[#6e7681]">
            <CalendarDays className="h-3.5 w-3.5" />
            {new Date(ticket.due_date).toLocaleDateString()}
          </div>
        ) : (
          <div />
        )}

        {ticket.assignee && (
          <img
            src={ticket.assignee.avatar}
            alt=""
            className="h-6 w-6 rounded-full border border-[#30363d] object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default TicketCard;
