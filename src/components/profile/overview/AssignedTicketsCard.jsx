import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { ExternalLink, CheckCircle2, ListChecks } from "lucide-react";
import SectionCard from "./SectionCard";
import EmptyState from "./EmptyState";
import TicketRow from "./TicketRow";

const VISIBLE_LIMIT = 4;

function AssignedTicketsCard({ tickets = [], username: propUsername }) {
  const navigate = useNavigate();
  const { slug: routeSlug } = useParams();

  // Pull slug or username from Redux, route params, or props as fallback
  const reduxUsername = useSelector(
    (state) => state.auth?.user?.username || state.auth?.user?.slug,
  );
  const slug = routeSlug || reduxUsername || propUsername || "";

  const openTickets = tickets.filter((ticket) => ticket.status === "OPEN");
  const visibleTickets = openTickets.slice(0, VISIBLE_LIMIT);

  const handleAllAssignedClick = () => {
    navigate(`/${slug}/my-work`);
  };

  return (
    <SectionCard
      icon={ListChecks}
      title="Assigned to You"
      count={openTickets.length}
      action={
        <button
          type="button"
          onClick={handleAllAssignedClick}
          className="group flex cursor-pointer items-center gap-1.5 text-xs font-semibold text-[#58a6ff] transition-colors hover:text-white hover:underline"
        >
          All assigned tickets
          <ExternalLink
            size={13}
            className="cursor-pointer transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </button>
      }
    >
      {openTickets.length === 0 ? (
        <EmptyState
          icon={CheckCircle2}
          iconClassName="text-[#3fb950]"
          title="You're all caught up across projects!"
          description="No open issues are currently assigned to your profile."
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
