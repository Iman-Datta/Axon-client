import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import {
  ArrowUp,
  BookOpen,
  Bug,
  CalendarDays,
  CheckSquare,
  ChevronsUp,
  Minus,
  Signal,
  Sparkles,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const priorityConfig = {
  LOW: { icon: Minus, color: "#8b949e", label: "Low priority" },
  MEDIUM: { icon: Signal, color: "#d29922", label: "Medium priority" },
  HIGH: { icon: ArrowUp, color: "#f0883e", label: "High priority" },
  URGENT: { icon: ChevronsUp, color: "#f85149", label: "Urgent priority" },
};

const typeConfig = {
  TASK: { icon: CheckSquare, color: "#8b949e", label: "Task" },
  BUG: { icon: Bug, color: "#f85149", label: "Bug" },
  STORY: { icon: BookOpen, color: "#58a6ff", label: "Story" },
  FEATURE: { icon: Sparkles, color: "#a855f7", label: "Feature" },
};

const TOOLTIP_CLASSES = {
  type: {
    wrapper: "group/type",
    icon: "group-hover/type:scale-110",
    tooltip: "group-hover/type:opacity-100 group-hover/type:scale-100",
  },
  priority: {
    wrapper: "group/priority",
    icon: "group-hover/priority:scale-110",
    tooltip: "group-hover/priority:opacity-100 group-hover/priority:scale-100",
  },
};

const IconTooltip = ({ Icon, color, label, group }) => {
  const cls = TOOLTIP_CLASSES[group];

  return (
    <div className={`relative flex items-center ${cls.wrapper}`}>
      <Icon
        className={`h-3.5 w-3.5 transition-transform duration-150 ${cls.icon}`}
        style={{ color }}
        strokeWidth={2.25}
      />

      <div
        className={`pointer-events-none absolute -top-8 left-1/2 z-50 -translate-x-1/2 scale-95 whitespace-nowrap rounded-md border border-[#30363d] bg-[#161b22] px-2 py-1 text-[10px] font-medium text-[#e6edf3] opacity-0 shadow-xl transition-all duration-150 ${cls.tooltip}`}
      >
        {label}

        <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-[#161b22]" />
      </div>
    </div>
  );
};

const CARD_HEIGHT = "h-[104px]";

const TicketCardPreview = ({ ticket }) => {
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

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`${CARD_HEIGHT} rounded-lg border-2 border-dashed border-[#388bfd]/50 bg-[#0d1117]/40`}
      />
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => navigate(`/${slug}/${project_slug}/tickets/${ticket.id}`)}
      className={`group flex ${CARD_HEIGHT} cursor-pointer flex-col justify-between rounded-lg border border-[#30363d] bg-[#0d1117] p-3 shadow-sm transition-all duration-200 hover:border-[#388bfd]/40 hover:bg-[#111827] hover:shadow-lg hover:shadow-[#388bfd]/5`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-[10.5px] font-semibold tracking-wide text-[#6e7681]">
            {ticket.ticket_number}
          </span>

          <span className="text-[#30363d]">·</span>

          <IconTooltip
            Icon={type.icon}
            color={type.color}
            label={type.label}
            group="type"
          />

          <IconTooltip
            Icon={priority.icon}
            color={priority.color}
            label={priority.label}
            group="priority"
          />
        </div>

        {ticket.assignee && (
          <img
            src={ticket.assignee.avatar}
            alt=""
            title={ticket.assignee.username}
            className="h-6 w-6 rounded-full border border-[#30363d] object-cover transition-transform duration-200 group-hover:scale-105"
          />
        )}
      </div>

      {/* Title */}
      <h3 className="line-clamp-2 text-[13px] font-medium leading-snug text-[#e6edf3] transition-colors group-hover:text-[#58a6ff]">
        {ticket.title}
      </h3>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          {ticket.epic && (
            <span className="inline-flex max-w-[110px] min-w-0 items-center gap-1 truncate text-[10.5px] font-medium text-[#8b949e]">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{
                  backgroundColor: ticket.epic.color,
                }}
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

export default TicketCardPreview;
