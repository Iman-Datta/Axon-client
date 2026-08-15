import { Clock, Sparkles } from "lucide-react";

function RecentActivityPanel() {
  return (
    <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-[#21262d] pb-3">
        <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
          <Clock size={15} className="text-amber-400" /> Recent Activity
        </h3>
        <span className="inline-flex items-center gap-1 rounded-md border border-sky-500/20 bg-sky-500/10 px-2 py-0.5 text-[10px] font-medium text-sky-400">
          <Sparkles size={10} /> Coming Soon
        </span>
      </div>
      <div className="flex flex-col items-center justify-center py-6 text-center space-y-1.5">
        <p className="text-xs font-medium text-slate-300">
          Real-time activity tracking is under development.
        </p>
        <p className="text-[11px] text-slate-500 max-w-xs">
          Stay tuned for upcoming releases to monitor organization events,
          deployments, and member updates seamlessly.
        </p>
      </div>
    </div>
  );
}

export default RecentActivityPanel;
