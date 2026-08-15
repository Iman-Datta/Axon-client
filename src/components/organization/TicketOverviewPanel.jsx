import { Layers } from "lucide-react";

const SEGMENT_DEFS = [
  { key: "todo", label: "Todo", color: "#8b949e" },
  { key: "development", label: "In Progress", color: "#58a6ff" },
  { key: "review", label: "Review", color: "#e3b341" },
  { key: "done", label: "Done", color: "#3fb950" },
];

function buildDonut(stats) {
  const segments = SEGMENT_DEFS.map((def) => ({ ...def, value: stats[def.key] || 0 }));
  const total = segments.reduce((sum, s) => sum + s.value, 0);

  if (total === 0) return { gradient: "#21262d", segments, total };

  let cursor = 0;
  const stops = segments
    .filter((s) => s.value > 0)
    .map((s) => {
      const start = (cursor / total) * 360;
      cursor += s.value;
      const end = (cursor / total) * 360;
      return `${s.color} ${start}deg ${end}deg`;
    });

  return { gradient: `conic-gradient(${stops.join(", ")})`, segments, total };
}

function TicketOverviewPanel({ stats }) {
  const { gradient, segments, total } = buildDonut(stats);

  return (
    <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-4">
      <h3 className="flex items-center gap-2 border-b border-[#21262d] pb-3 text-[13px] font-semibold text-[#f0f6fc]">
        <Layers size={14} className="text-[#58a6ff]" /> Ticket Overview
      </h3>

      {total === 0 ? (
        <div className="py-8 text-center text-xs text-[#8b949e]">No tickets created yet.</div>
      ) : (
        <div className="mt-4 flex items-center gap-5">
          <div className="relative h-24 w-24 shrink-0 rounded-full" style={{ background: gradient }}>
            <div className="absolute inset-[7px] flex flex-col items-center justify-center rounded-full bg-[#161b22]">
              <span className="text-base font-semibold text-[#f0f6fc]">{total}</span>
              <span className="text-[9px] uppercase tracking-wide text-[#8b949e]">Total</span>
            </div>
          </div>

          <div className="flex-1 space-y-2">
            {segments.map((segment) => (
              <div key={segment.key} className="flex items-center gap-2 text-[11px]">
                <span
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ backgroundColor: segment.color }}
                />
                <span className="text-[#8b949e]">{segment.label}</span>
                <span className="ml-auto font-medium text-[#c9d1d9]">{segment.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TicketOverviewPanel;
