import { Layers, ArrowRight } from "lucide-react";

const SEGMENT_DEFS = [
  { key: "todo", label: "Todo", color: "#6e7681" }, // Muted slate gray for backlog/todo
  { key: "development", label: "In Progress", color: "#2f81f7" }, // Vibrant professional blue for active work
  { key: "review", label: "Review", color: "#d29922" }, // Refined amber/gold for code review
  { key: "done", label: "Done", color: "#2ea043" }, // Crisp success green for completed items
];

const SIZE = 112;
const STROKE_WIDTH = 14;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function TicketProgressCard({
  metrics = {},
  ticketOverview = {},
  onViewAllTickets,
}) {
  const totalTickets = metrics.total_tickets ?? 0;
  const completedTickets = metrics.completed_tickets ?? 0;
  const openTickets =
    metrics.open_tickets ?? Math.max(totalTickets - completedTickets, 0);
  const completionRate =
    totalTickets > 0 ? Math.round((completedTickets / totalTickets) * 100) : 0;

  // Build the donut chart directly from ticket_overview (todo / development / review / done)
  const segments = SEGMENT_DEFS.map((def) => ({
    ...def,
    value: ticketOverview[def.key] || 0,
  }));
  const chartTotal = segments.reduce((sum, s) => sum + s.value, 0);

  let cumulative = 0;

  return (
    <div className="rounded-2xl border border-[#30363d] bg-[#161b22] p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#21262d] text-[#58a6ff] ring-1 ring-[#30363d]">
            <Layers size={14} />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#c9d1d9]">
            Ticket Progress
          </span>
        </div>

        <button
          type="button"
          onClick={onViewAllTickets}
          className="flex items-center gap-1 text-xs font-medium text-[#58a6ff] hover:text-white cursor-pointer"
        >
          View all ({totalTickets})
          <ArrowRight size={12} />
        </button>
      </div>

      {chartTotal === 0 ? (
        <p className="mt-6 py-6 text-center text-xs text-[#8b949e]">
          No tickets created yet.
        </p>
      ) : (
        <>
          <div className="mt-5 flex items-center gap-6">
            {/* SVG donut chart — one arc per pipeline stage */}
            <div
              className="relative shrink-0"
              style={{ width: SIZE, height: SIZE }}
            >
              <svg
                width={SIZE}
                height={SIZE}
                viewBox={`0 0 ${SIZE} ${SIZE}`}
                className="-rotate-90"
              >
                <circle
                  cx={SIZE / 2}
                  cy={SIZE / 2}
                  r={RADIUS}
                  fill="none"
                  stroke="#21262d"
                  strokeWidth={STROKE_WIDTH}
                />
                {segments
                  .filter((s) => s.value > 0)
                  .map((segment) => {
                    const fraction = segment.value / chartTotal;
                    const dash = fraction * CIRCUMFERENCE;
                    const gap = CIRCUMFERENCE - dash;
                    const offset = -((cumulative / chartTotal) * CIRCUMFERENCE);
                    cumulative += segment.value;

                    return (
                      <circle
                        key={segment.key}
                        cx={SIZE / 2}
                        cy={SIZE / 2}
                        r={RADIUS}
                        fill="none"
                        stroke={segment.color}
                        strokeWidth={STROKE_WIDTH}
                        strokeDasharray={`${dash} ${gap}`}
                        strokeDashoffset={offset}
                      >
                        <title>
                          {segment.label}: {segment.value} (
                          {Math.round(fraction * 100)}%)
                        </title>
                      </circle>
                    );
                  })}
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg font-bold text-[#f0f6fc]">
                  {completionRate}%
                </span>
                <span className="text-[9px] uppercase tracking-wide text-[#8b949e]">
                  Complete
                </span>
              </div>
            </div>

            {/* Legend with per-stage count and share */}
            <div className="flex-1 space-y-2.5">
              {segments.map((segment) => {
                const percent =
                  chartTotal > 0
                    ? Math.round((segment.value / chartTotal) * 100)
                    : 0;
                return (
                  <div
                    key={segment.key}
                    className="flex items-center gap-2 text-[11px]"
                  >
                    <span
                      className="h-2 w-2 shrink-0 rounded-sm"
                      style={{ backgroundColor: segment.color }}
                    />
                    <span className="text-[#8b949e]">{segment.label}</span>
                    <span className="ml-auto font-medium text-[#c9d1d9]">
                      {segment.value}
                      <span className="ml-1 text-[#6e7681]">({percent}%)</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2 border-t border-[#21262d] pt-3 text-center">
            <div>
              <p className="text-[10px] font-semibold uppercase text-[#8b949e]">
                Completed
              </p>
              <p className="mt-0.5 text-base font-bold text-[#3fb950]">
                {completedTickets}
              </p>
            </div>
            <div className="border-l border-[#21262d]">
              <p className="text-[10px] font-semibold uppercase text-[#8b949e]">
                Open
              </p>
              <p className="mt-0.5 text-base font-bold text-[#e3b341]">
                {openTickets}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TicketProgressCard;
