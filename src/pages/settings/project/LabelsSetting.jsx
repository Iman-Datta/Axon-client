import { Sparkles, Bug, ListTodo, TrendingUp } from "lucide-react";

const TYPES = [
  {
    key: "feature",
    name: "Feature",
    icon: Sparkles,
    accent: "#a371f7",
    accentBg: "rgba(163,113,247,0.12)",
    desc: "A new capability added to the project.",
  },
  {
    key: "bug",
    name: "Bug",
    icon: Bug,
    accent: "#f85149",
    accentBg: "rgba(248,81,73,0.12)",
    desc: "A defect or unexpected behavior to fix.",
  },
  {
    key: "task",
    name: "Task",
    icon: ListTodo,
    accent: "#8b949e",
    accentBg: "rgba(139,148,158,0.12)",
    desc: "Refactoring, maintenance, or docs work.",
  },
  {
    key: "improvement",
    name: "Improvement",
    icon: TrendingUp,
    accent: "#3fb950",
    accentBg: "rgba(63,185,80,0.12)",
    desc: "An enhancement to something that exists.",
  },
];

const PRIORITIES = [
  {
    key: "critical",
    name: "Critical",
    bars: 4,
    accent: "#f85149",
    accentBg: "rgba(248,81,73,0.12)",
    desc: "Blocks important work or affects production.",
  },
  {
    key: "high",
    name: "High",
    bars: 3,
    accent: "#d29922",
    accentBg: "rgba(210,153,34,0.12)",
    desc: "Important — should be done as soon as possible.",
  },
  {
    key: "medium",
    name: "Medium",
    bars: 2,
    accent: "#e3b341",
    accentBg: "rgba(227,179,65,0.12)",
    desc: "Normal, day-to-day work.",
  },
  {
    key: "low",
    name: "Low",
    bars: 1,
    accent: "#8b949e",
    accentBg: "rgba(139,148,158,0.12)",
    desc: "Nice to have, whenever time allows.",
  },
];

function PriorityBars({ level, color, size = 3 }) {
  return (
    <span className="flex items-end gap-[2px]" style={{ height: size * 4 }}>
      {[1, 2, 3, 4].map((bar) => (
        <span
          key={bar}
          className="w-[3px] rounded-sm"
          style={{
            height: bar * size,
            backgroundColor: bar <= level ? color : "#30363d",
          }}
        />
      ))}
    </span>
  );
}

function TypeChip({ type }) {
  const Icon = type.icon;
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium"
      style={{ backgroundColor: type.accentBg, color: type.accent }}
    >
      <Icon size={12} />
      {type.name}
    </span>
  );
}

function PriorityChip({ priority }) {
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium"
      style={{ backgroundColor: priority.accentBg, color: priority.accent }}
    >
      <PriorityBars level={priority.bars} color={priority.accent} />
      {priority.name}
    </span>
  );
}

export default function LabelsSetting() {
  return (
    <div className="space-y-8 text-[#f0f6fc]">
      {/* Introduction */}
      <div>
        <h2 className="text-lg font-semibold">Ticket labels</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#8b949e]">
          Labels organize and classify tickets across your project. Axon
          currently ships a built-in set of ticket types and priorities to keep
          every project consistent.
        </p>
      </div>

      {/* Ticket Types */}
      <section className="rounded-lg border border-[#30363d] bg-[#161b22] p-5">
        <h3 className="text-base font-semibold">Ticket types</h3>
        <p className="mt-2 text-sm leading-6 text-[#8b949e]">
          What kind of work a ticket represents, visible at a glance without
          reading its description.
        </p>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {TYPES.map((type) => (
            <div
              key={type.key}
              className="flex items-start gap-3 rounded-md border border-[#30363d] bg-[#0d1117] p-3"
            >
              <TypeChip type={type} />
              <p className="text-xs leading-5 text-[#8b949e]">{type.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Priorities */}
      <section className="rounded-lg border border-[#30363d] bg-[#161b22] p-5">
        <h3 className="text-base font-semibold">Ticket priorities</h3>
        <p className="mt-2 text-sm leading-6 text-[#8b949e]">
          How urgently a ticket should be addressed, so teams can decide what to
          work on first.
        </p>

        <div className="mt-4 space-y-2">
          {PRIORITIES.map((priority) => (
            <div
              key={priority.key}
              className="flex items-center gap-3 rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2.5"
            >
              <PriorityChip priority={priority} />
              <p className="text-xs leading-5 text-[#8b949e]">
                {priority.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Usage preview */}
      <section className="rounded-lg border border-[#30363d] bg-[#161b22] p-5">
        <h3 className="text-base font-semibold">How labels are used</h3>
        <p className="mt-2 text-sm leading-6 text-[#8b949e]">
          Labels appear across Axon — the Kanban board, ticket details, search
          results, and filters — as a quick visual read on a ticket's purpose
          and urgency.
        </p>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2.5">
            <span className="font-mono text-xs text-[#8b949e]">AXN-142</span>
            <TypeChip type={TYPES[1]} />
            <PriorityChip priority={PRIORITIES[0]} />
            <span className="truncate text-sm text-[#f0f6fc]">
              Fix login redirect loop on expired session
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2.5">
            <span className="font-mono text-xs text-[#8b949e]">AXN-137</span>
            <TypeChip type={TYPES[0]} />
            <PriorityChip priority={PRIORITIES[2]} />
            <span className="truncate text-sm text-[#f0f6fc]">
              Add bulk export for ticket history
            </span>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <div className="rounded-lg border border-dashed border-[#30363d] bg-[#0d1117] p-4">
        <p className="text-sm font-medium text-[#f0f6fc]">Coming soon</p>
        <p className="mt-1 text-sm leading-6 text-[#8b949e]">
          Custom labels, priorities, colors, icons, and additional ticket types
          aren't available yet. Future updates will let workspace owners create,
          edit, reorder, and manage labels for their team's workflow.
        </p>
      </div>
    </div>
  );
}
