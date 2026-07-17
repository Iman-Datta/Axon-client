import KanbanColumn from "./KanbanColumn";

const COLUMN_ORDER = ["TODO", "IN_PROGRESS", "REVIEW", "DONE"];

const KanbanBoard = ({ tickets }) => {
  const columns = {
    TODO: [],
    IN_PROGRESS: [],
    REVIEW: [],
    DONE: [],
  };

  tickets.forEach((ticket) => {
    if (columns[ticket.kanban_column]) {
      columns[ticket.kanban_column].push(ticket);
    }
  });

  return (
    <div
      className="w-full overflow-x-auto overflow-y-hidden pb-4
      [scrollbar-width:thin] [scrollbar-color:#30363d_transparent]
      [&::-webkit-scrollbar]:h-2
      [&::-webkit-scrollbar-track]:bg-transparent
      [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-thumb]:bg-[#30363d]
      hover:[&::-webkit-scrollbar-thumb]:bg-[#484f58]"
    >
      <div className="flex items-start gap-6 pt-6">
        {COLUMN_ORDER.map((column) => (
          <KanbanColumn
            key={column}
            column={column}
            tickets={columns[column]}
          />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
