function TicketRow({ ticket }) {
  console.log(ticket);
  return (
    <tr className="border-b border-[#21262d] last:border-0">
      <td className="px-5 py-4">
        <div>
          <h3 className="font-medium text-[#e6edf3]">{ticket.title}</h3>

          <p className="mt-1 text-sm text-[#8b949e]">{ticket.description}</p>
        </div>
      </td>

      <td className="px-5 py-4">{ticket.status}</td>

      <td className="px-5 py-4">{ticket.priority}</td>

      <td className="px-5 py-4">{ticket.epic?.name || "-"}</td>

      <td className="px-5 py-4">
        {ticket.due_date ? new Date(ticket.due_date).toLocaleDateString() : "-"}
      </td>
    </tr>
  );
}

export default TicketRow;
