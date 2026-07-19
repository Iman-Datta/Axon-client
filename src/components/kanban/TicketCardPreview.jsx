import { CalendarDays } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const priorityColors = {
  LOW: "text-[#8b949e] bg-[#8b949e]/10",
  MEDIUM: "text-[#d29922] bg-[#d29922]/10",
  HIGH: "text-[#f85149] bg-[#f85149]/10",
  URGENT: "text-[#f85149] bg-[#f85149]/15",
};

const TicketCardPreview = ({ ticket }) => {
  const navigate = useNavigate();
  const { slug, project_slug } = useParams();

  const priorityClass =
    priorityColors[ticket.priority?.toUpperCase()] ||
    "text-[#8b949e] bg-[#8b949e]/10";

  return (
    <div
      onClick={() => navigate(`/${slug}/${project_slug}/tickets/${ticket.id}`)}
      className="group w-[320px] rotate-2 scale-105 cursor-pointer rounded-xl border border-[#30363d] bg-[#0d1117] p-4 opacity-95 shadow-2xl"
    >
      <div className="mb-2 text-[11px] font-medium tracking-wide text-[#6e7681]">
        {ticket.ticket_number}
      </div>

      <h3 className="mb-3 line-clamp-2 text-[14px] font-medium leading-snug text-[#e6edf3]">
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

export default TicketCardPreview;
