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

// Priority: one small icon + accent color. No filled text badge.
const priorityConfig = {
  LOW: { icon: Minus, color: "#8b949e", label: "Low priority" },
  MEDIUM: { icon: Signal, color: "#d29922", label: "Medium priority" },
  HIGH: { icon: ArrowUp, color: "#f0883e", label: "High priority" },
  URGENT: { icon: ChevronsUp, color: "#f85149", label: "Urgent priority" },
};

// Type: icon only, same treatment as priority.
const typeConfig = {
  TASK: { icon: CheckSquare, color: "#8b949e", label: "Task" },
  BUG: { icon: Bug, color: "#f85149", label: "Bug" },
  STORY: { icon: BookOpen, color: "#58a6ff", label: "Story" },
  FEATURE: { icon: Sparkles, color: "#a855f7", label: "Feature" },
};

// Tailwind's build-time scanner needs literal class strings — it can't
// resolve `group-hover/${groupId}` at runtime. So each supported group
// gets its own fully-literal class set here instead of being interpolated.
const TOOLTIP_GROUP_CLASSES = {
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

/**
 * Small icon with a custom-styled tooltip that appears above it on hover.
 * groupId must be one of the keys in TOOLTIP_GROUP_CLASSES.
 */
const IconTooltip = ({ Icon, color, label, groupId }) => {
  const g = TOOLTIP_GROUP_CLASSES[groupId];
  return (
    <div className={`relative flex items-center ${g.wrapper}`}>
      <Icon
        className={`h-3.5 w-3.5 transition-transform duration-150 ${g.icon}`}
        style={{ color }}
        strokeWidth={2.25}
      />
      <span
        className={`pointer-events-none absolute -top-8 left-1/2 z-20 -translate-x-1/2 scale-90 whitespace-nowrap rounded-md border border-[#30363d] bg-[#161b22] px-2 py-1 text-[10px] font-medium text-[#e6edf3] opacity-0 shadow-lg transition-all duration-150 ${g.tooltip}`}
      >
        {label}
        <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-[#161b22]" />
      </span>
    </div>
  );
};

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

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => {
        if (isDragging) return;
        navigate(`/${slug}/${project_slug}/tickets/${ticket.id}`);
      }}
      className={`group rounded-xl border p-4 transition-all duration-200 ${
        isDragging
          ? "cursor-grabbing border-dashed border-[#58a6ff]/50 bg-[#0d1117]/40 opacity-40"
          : "cursor-pointer border-[#30363d] bg-[#0d1117] hover:border-[#388bfd]/40 hover:bg-[#111827]"
      }`}
    >
      {/* Top row: ticket number on the left, type + priority icons on the right */}
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[11px] font-medium tracking-wide text-[#6e7681]">
          {ticket.ticket_number}
        </span>

        <div className="flex items-center gap-2.5">
          <IconTooltip
            Icon={type.icon}
            color={type.color}
            label={type.label}
            groupId="type"
          />
          <IconTooltip
            Icon={priority.icon}
            color={priority.color}
            label={priority.label}
            groupId="priority"
          />
        </div>
      </div>

      {/* Title */}
      <h3 className="mb-3 line-clamp-2 text-[14px] font-medium leading-snug text-[#e6edf3] transition-colors group-hover:text-[#58a6ff]">
        {ticket.title}
      </h3>

      {/* Epic — small dot + label, no solid color block */}
      {ticket.epic && (
        <div className="mb-3 inline-flex max-w-full items-center gap-1.5 truncate">
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ backgroundColor: ticket.epic.color }}
          />
          <span className="truncate text-[11px] font-medium text-[#8b949e]">
            {ticket.epic.name}
          </span>
          {ticket.story_points && (
            <span className="shrink-0 text-[11px] font-medium text-[#6e7681]">
              · {ticket.story_points} pt
            </span>
          )}
        </div>
      )}

      {/* Footer: due date left, assignee right */}
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
            title={`Assigned to ${ticket.assignee.username}`}
            className="h-6 w-6 rounded-full border border-[#30363d] object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default TicketCardPreview;
