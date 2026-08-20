import { useNavigate } from "react-router-dom";
import { ArrowRight, CheckCircle2, ListChecks } from "lucide-react";
import SectionCard from "./SectionCard";
import EmptyState from "./EmptyState";
import TicketRow from "./TicketRow";

const VISIBLE_LIMIT = 3;

function AssignedTicketsCard({ tickets = [], username }) {
  const navigate = useNavigate();
  const visibleTickets = tickets.slice(0, VISIBLE_LIMIT);

  return (
    <SectionCard
      icon={ListChecks}
      title="Assigned to You"
      count={tickets.length}
      action={
        tickets.length > VISIBLE_LIMIT && (
          <button
            type="button"
            onClick={() => navigate(`/${username}/my-work`)}
            className="group flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-[#58a6ff] transition-colors hover:text-white"
          >
            All assigned tickets
            <ArrowRight
              size={13}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </button>
        )
      }
    >
      {tickets.length === 0 ? (
        <EmptyState
          icon={CheckCircle2}
          iconClassName="text-[#3fb950]"
          title="You're all caught up across projects!"
          description="No issues are currently assigned to your profile."
        />
      ) : (
        <div className="space-y-3">
          {visibleTickets.map((ticket) => (
            <TicketRow
              key={ticket.id}
              ticket={ticket}
              onOpen={() =>
                navigate(
                  `/${ticket.workspace_slug}/${ticket.project_slug}/tickets?openTicket=${ticket.id}`,
                )
              }
            />
          ))}
        </div>
      )}
    </SectionCard>
  );
}

export default AssignedTicketsCard;
