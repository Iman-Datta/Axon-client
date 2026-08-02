import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { CalendarDays } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { priorityConfig, typeConfig } from "../../components/kanban/ticketmeta";

const CARD_HEIGHT = "h-[104px]";

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

  const priority =
    priorityConfig[ticket.priority?.toUpperCase()] || priorityConfig.LOW;
  const type = typeConfig[ticket.type?.toUpperCase()] || typeConfig.TASK;
  const PriorityIcon = priority.icon;
  const TypeIcon = type.icon;

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
      className={`group flex ${CARD_HEIGHT} cursor-pointer flex-col justify-between rounded-lg border border-[#30363d] bg-[#0d1117] p-3 transition-all duration-200 hover:border-[#388bfd]/40 hover:bg-[#111827]`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className="text-[10.5px] font-semibold tracking-wide text-[#6e7681]">
            {ticket.ticket_number}
          </span>
          <span className="text-[#30363d]">·</span>
          <div className="flex items-center gap-1" title={type.label}>
            <TypeIcon
              className="h-3 w-3"
              style={{ color: type.color }}
              strokeWidth={2.25}
            />
          </div>
          <div className="flex items-center" title={priority.label}>
            <PriorityIcon
              className="h-3 w-3"
              style={{ color: priority.color }}
              strokeWidth={2.5}
            />
          </div>
        </div>

        {ticket.assignee && (
          <img
            src={ticket.assignee.avatar}
            alt=""
            title={`Assigned to ${ticket.assignee.username}`}
            className="h-5 w-5 shrink-0 rounded-full border border-[#30363d] object-cover"
          />
        )}
      </div>

      {/* Title */}
      <h3 className="line-clamp-2 text-[13px] font-medium leading-snug text-[#e6edf3] transition-colors group-hover:text-[#58a6ff]">
        {ticket.title}
      </h3>

      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          {ticket.epic && (
            <span className="inline-flex min-w-0 max-w-[110px] items-center gap-1 truncate text-[10.5px] font-medium text-[#8b949e]">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ backgroundColor: ticket.epic.color }}
              />
              <span className="truncate">{ticket.epic.name}</span>
            </span>
          )}

          {ticket.story_points && (
            <span className="shrink-0 text-[10.5px] font-medium text-[#6e7681]">
              · {ticket.story_points} SP
            </span>
          )}
        </div>

        {ticket.due_date && (
          <div className="flex shrink-0 items-center gap-1 text-[10px] text-[#6e7681]">
            <CalendarDays className="h-3 w-3" />
            {new Date(ticket.due_date).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketCard;
