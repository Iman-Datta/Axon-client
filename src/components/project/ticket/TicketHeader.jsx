import { Plus } from "lucide-react";

function TicketHeader({ onCreateTicket }) {
  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-4xl font-bold text-[#e6edf3]">Tickets</h1>

        <p className="mt-2 text-[#8b949e]">
          Track and manage all work items in this project.
        </p>
      </div>

      <button
        onClick={onCreateTicket}
        className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#238636] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#2ea043]"
      >
        <Plus size={16} />
        New Ticket
      </button>
    </div>
  );
}

export default TicketHeader;
