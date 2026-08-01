import { useParams } from "react-router-dom";

import useTickets from "../../hooks/useTickets";
import KanbanBoard from "../../components/kanban/KanbanBoard";
import KanbanHeader from "../../components/kanban/KanbanHeader";

const Dashboard = () => {
  const { slug, project_slug } = useParams();

  const { tickets, setTickets, loading, error } = useTickets(
    slug,
    project_slug,
    {
      status: "OPEN",
    },
  );

  if (loading) {
    return <div className="mt-18 p-6">Loading...</div>;
  }

  if (error) {
    return <div className="mt-18 p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="mt-14 flex h-[calc(100dvh-56px)] w-full max-w-full flex-col overflow-hidden p-6">
      <div className="flex-shrink-0">
        <KanbanHeader />
      </div>

      <div className="min-h-0 flex-1">
        <KanbanBoard tickets={tickets} setTickets={setTickets} />
      </div>
    </div>
  );
};

export default Dashboard;
