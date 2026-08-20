import { useState, useMemo } from "react";
import { useParams } from "react-router-dom";

import useTickets from "../../hooks/useTickets";
import KanbanBoard from "../../components/kanban/KanbanBoard";
import KanbanHeader from "../../components/kanban/KanbanHeader";

const Dashboard = () => {
  const { slug, project_slug } = useParams();
  const [searchTerm, setSearchTerm] = useState("");

  const { tickets, setTickets, loading, error } = useTickets(
    slug,
    project_slug,
    {
      status: "OPEN",
    },
  );

  const filteredTickets = useMemo(() => {
    if (!searchTerm.trim()) return tickets;
    const query = searchTerm.toLowerCase();
    return tickets.filter(
      (ticket) =>
        ticket.title?.toLowerCase().includes(query) ||
        ticket.ticket_number?.toLowerCase().includes(query),
    );
  }, [tickets, searchTerm]);

  if (error) {
    return <div className="mt-18 p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="mt-14 flex h-[calc(100dvh-56px)] w-full max-w-full flex-col overflow-hidden p-2">
      <div className="flex-shrink-0 pt-3">
        <KanbanHeader searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>

      <div className="min-h-0 flex-1">
        <KanbanBoard
          tickets={filteredTickets}
          setTickets={setTickets}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default Dashboard;
