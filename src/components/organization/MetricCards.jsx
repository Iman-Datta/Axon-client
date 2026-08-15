import { FolderGit2, Users, CheckSquare, CheckCircle2 } from "lucide-react";

const METRIC_DEFS = [
  { key: "projects", label: "Projects", icon: FolderGit2, accent: "#58a6ff" },
  { key: "members", label: "Members", icon: Users, accent: "#e3b341" },
  { key: "tickets", label: "Tickets", icon: CheckSquare, accent: "#a371f7" },
  { key: "completed", label: "Completed", icon: CheckCircle2, accent: "#3fb950" },
];

function MetricCards({ metrics }) {
  const tickets = metrics.tickets || 0;
  const completed = metrics.completed || 0;
  const rate = tickets > 0 ? Math.round((completed / tickets) * 100) : 0;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {METRIC_DEFS.map(({ key, label, icon: Icon, accent }) => (
          <div key={key} className="rounded-xl border border-[#30363d] bg-[#161b22] p-4">
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#8b949e]">
              <Icon size={13} style={{ color: accent }} />
              {label}
            </div>
            <div
              className="mt-2 text-xl font-semibold"
              style={{ color: key === "completed" ? "#3fb950" : "#f0f6fc" }}
            >
              {metrics[key] || 0}
            </div>
          </div>
        ))}
      </div>

      {tickets > 0 && (
        <div className="flex items-center gap-3 rounded-xl border border-[#30363d] bg-[#161b22] px-4 py-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#21262d]">
            <div
              className="h-full rounded-full bg-[#3fb950] transition-all duration-500"
              style={{ width: `${rate}%` }}
            />
          </div>
          <span className="shrink-0 text-[11px] font-medium text-[#8b949e]">{rate}% completed</span>
        </div>
      )}
    </div>
  );
}

export default MetricCards;
