import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import TicketHeader from "../../components/project/ticket/TicketHeader";
import TicketTable from "../../components/project/ticket/TicketTable";
import CreateTicketModal from "../../components/project/ticket/CreateTicketModal";

import useTickets from "../../hooks/useTickets";
import useEpics from "../../hooks/useEpics";

import { createTicket } from "../../services/ticketService";

function TicketsPage() {
  const { slug, project_slug } = useParams();

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [openModal, setOpenModal] = useState(false);

  const { tickets, count, loading, error, refetch } = useTickets(
    slug,
    project_slug,
  );

  const { epics } = useEpics(slug, project_slug);

  // Temporary until project members API is built TODO
  const members = [];

  const handleCreateTicket = async (formData) => {
    try {
      await createTicket(slug, project_slug, formData, dispatch, accessToken);

      setOpenModal(false);

      await refetch();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <h1 className="mt-18">Loading...</h1>;
  }

  if (error) {
    return <h1 className="mt-18 text-red-500">{error}</h1>;
  }

  return (
    <div className="mt-18 space-y-8">
      <TicketHeader onCreateTicket={() => setOpenModal(true)} />

      <h1 className="text-sm text-[#8b949e]">Total Tickets: {count}</h1>

      {tickets.length === 0 ? (
        <div className="rounded-2xl border border-[#30363d] bg-[#161b22] p-10 text-center">
          <h2 className="text-lg font-semibold text-[#e6edf3]">
            No tickets yet
          </h2>

          <p className="mt-2 text-[#8b949e]">
            Create your first ticket to get started.
          </p>
        </div>
      ) : (
        <TicketTable tickets={tickets} />
      )}

      {openModal && (
        <CreateTicketModal
          epics={epics}
          members={members}
          onClose={() => setOpenModal(false)}
          onSubmit={handleCreateTicket}
        />
      )}
    </div>
  );
}

export default TicketsPage;
