import { useNavigate, useParams } from "react-router-dom";
import TicketProgressCard from "./TicketProgressCard";
import TeamMembersCard from "./TeamMembersCard";

function ProjectStatsCard({
  metrics = {},
  ticketOverview = {},
  members = [],
  onViewAllMembers,
  onViewAllTickets,
}) {
  console.log("Hi")
  console.log(metrics);
  console.log(ticketOverview);
  console.log(members);

  const navigate = useNavigate();
  const { slug, project_slug } = useParams();

  const handleViewAllMembers = () =>
    onViewAllMembers
      ? onViewAllMembers()
      : navigate(`/${slug}/${project_slug}/members`);

  const handleViewAllTickets = () =>
    onViewAllTickets
      ? onViewAllTickets()
      : navigate(`/${slug}/${project_slug}/tickets`);

  return (
    <div className="flex flex-col gap-5">
      {/* Pass metrics and ticketOverview down here! */}
      <TicketProgressCard
        metrics={metrics}
        ticketOverview={ticketOverview}
        onViewAllTickets={handleViewAllTickets}
      />
      <TeamMembersCard
        members={members}
        onViewAllMembers={handleViewAllMembers}
      />
    </div>
  );
}

export default ProjectStatsCard;
