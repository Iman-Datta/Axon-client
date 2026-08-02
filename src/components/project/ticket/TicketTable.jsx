import TicketRow from "./TicketRow";

const COLUMNS = [
  "Ticket",
  "Title",
  "Type",
  "Status",
  "Priority",
  "Epic",
  "Story Points",
  "Updated",
  "",
];

function TicketTable({ tickets, onEdit, onDelete, onSelect }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#30363d] bg-[#0d1117] shadow-[0_10px_30px_rgba(0,0,0,0.25)]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] border-separate border-spacing-0">
          <thead className="sticky top-0 z-10 bg-[#161b22]">
            <tr>
              {COLUMNS.map((col) => (
                <th
                  key={col}
                  className="border-b border-[#30363d] bg-[#161b22] px-6 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8b949e] first:rounded-tl-2xl last:rounded-tr-2xl"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#21262d]">
            {tickets.map((ticket) => (
              <TicketRow
                key={ticket.id}
                ticket={ticket}
                onEdit={onEdit}
                onDelete={onDelete}
                onSelect={onSelect}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TicketTable;
