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
    <div className="grid w-full grid-cols-4 gap-5">
      {COLUMN_ORDER.map((column) => (
        <KanbanColumn key={column} column={column} tickets={columns[column]} />
      ))}
    </div>
  );
};

export default KanbanBoard;
