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

const CARD_HEIGHT = "h-[88px]";

const TicketCard = ({ ticket }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
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

  // While dragging, the DragOverlay clone is what's visible under the
  // cursor — the original slot goes fully invisible but keeps its space
  // reserved so the list doesn't jump/reflow.
  if (isDragging) {
    return <div ref={setNodeRef} style={style} className={CARD_HEIGHT} />;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => navigate(`/${slug}/${project_slug}/tickets/${ticket.id}`)}
      className="group cursor-pointer rounded-lg border border-[#30363d] bg-[#0d1117] p-2.5 transition-all duration-200 hover:border-[#388bfd]/40 hover:bg-[#111827]"
    >
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="text-[10.5px] font-medium tracking-wide text-[#6e7681]">
          {ticket.ticket_number}
        </span>

        {ticket.assignee && (
          <img
            src={ticket.assignee.avatar}
            alt=""
            className="h-4.5 w-4.5 shrink-0 rounded-full border border-[#30363d] object-cover"
          />
        )}
      </div>

      <h3 className="mb-1.5 line-clamp-2 text-[13px] font-medium leading-snug text-[#e6edf3] transition-colors group-hover:text-[#58a6ff]">
        {ticket.title}
      </h3>

      <div className="flex flex-wrap items-center gap-1">
        <span
          className={`rounded px-1.5 py-0.5 text-[10px] font-medium ${priorityClass}`}
        >
          {ticket.priority}
        </span>

        <span className="rounded bg-[#388bfd]/10 px-1.5 py-0.5 text-[10px] font-medium text-[#58a6ff]">
          {ticket.type}
        </span>

        {ticket.epic && (
          <span
            className="ml-auto inline-flex max-w-[100px] items-center truncate rounded px-1.5 py-0.5 text-[10px] font-medium text-white"
            style={{ backgroundColor: ticket.epic.color }}
          >
            {ticket.epic.name}
          </span>
        )}
      </div>

      {ticket.due_date && (
        <div className="mt-1.5 flex items-center gap-1 text-[10px] text-[#6e7681]">
          <CalendarDays className="h-3 w-3" />
          {new Date(ticket.due_date).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

export default TicketCard;
