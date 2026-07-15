import TicketRow from "./TicketRow";

function TicketTable({ tickets }) {
  console.log(tickets);
  return (
    <div className="overflow-hidden rounded-2xl border border-[#30363d] bg-[#161b22]">
      <table className="w-full">
        <thead className="border-b border-[#30363d] text-left text-sm text-[#8b949e]">
          <tr>
            <th className="px-5 py-4">Title</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4">Priority</th>
            <th className="px-5 py-4">Epic</th>
            <th className="px-5 py-4">Due Date</th>
          </tr>
        </thead>

        <tbody>
          {tickets.map((ticket) => (
            <TicketRow key={ticket.id} ticket={ticket} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TicketTable;
