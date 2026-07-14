import { useParams } from "react-router-dom";

import TicketHeader from "../../components/ticket/TicketHeader";
import TicketTable from "../../components/ticket/TicketTable";

import useTickets from "../../hooks/useTickets";

function TicketsPage() {
  const { slug, project_slug } = useParams();

  const { tickets, count, loading, error } = useTickets(slug, project_slug);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div className="mt-18 space-y-8">
      <TicketHeader />

      <h1>Total Tickets: {count}</h1>

      <TicketTable tickets={tickets} />
    </div>
  );
}

export default TicketsPage;
