import { STATUS_ORDER, getStatusConfig } from "./statusConfig";

function StatusBreakdownBar({ tickets }) {
  const total = tickets.length;
  if (total === 0) return null;

  const counts = tickets.reduce((acc, ticket) => {
    const key = ticket.kanban_column || ticket.status || "DEFAULT";
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const segments = STATUS_ORDER.filter((key) => counts[key]).map((key) => ({
    key,
    count: counts[key],
    config: getStatusConfig(key),
  }));

  return (
    <div className="space-y-2.5">
      <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-[#21262d]">
        {segments.map((segment) => (
          <div
            key={segment.key}
            style={{
              width: `${(segment.count / total) * 100}%`,
              backgroundColor: segment.config.ring,
            }}
            className="h-full first:rounded-l-full last:rounded-r-full"
          />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
        {segments.map((segment) => (
          <div
            key={segment.key}
            className="flex items-center gap-1.5 text-[10.5px] text-[#8b949e]"
          >
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: segment.config.ring }}
            />
            <span className="truncate">{segment.config.label}</span>
            <span className="ml-auto font-medium text-[#c9d1d9]">
              {segment.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatusBreakdownBar;
