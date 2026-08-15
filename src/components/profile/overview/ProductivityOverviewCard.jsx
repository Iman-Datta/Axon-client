import { TrendingUp } from "lucide-react";
import SectionCard from "./SectionCard";
import CompletionRing from "./CompletionRing";
import StatusBreakdownBar from "./StatusBreakdownBar";

function ProductivityOverviewCard({ metrics, tickets }) {
  const completionRate = metrics.completion_rate ?? 0;

  return (
    <SectionCard icon={TrendingUp} title="Productivity Overview">
      <div className="flex items-center gap-5">
        <CompletionRing percentage={completionRate} />

        <div className="flex flex-1 flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#8b949e]">Assigned</span>
            <span className="text-sm font-semibold text-[#f0f6fc]">{metrics.total_assigned || 0}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#8b949e]">Completed</span>
            <span className="text-sm font-semibold text-[#3fb950]">{metrics.completed || 0}</span>
          </div>
          <div className="flex items-center justify-between border-t border-[#21262d] pt-3">
            <span className="text-xs text-[#8b949e]">Remaining</span>
            <span className="text-sm font-semibold text-[#e3b341]">
              {Math.max((metrics.total_assigned || 0) - (metrics.completed || 0), 0)}
            </span>
          </div>
        </div>
      </div>

      {tickets.length > 0 && (
        <div className="mt-5 border-t border-[#21262d] pt-4">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#8b949e]">By Status</p>
          <StatusBreakdownBar tickets={tickets} />
        </div>
      )}
    </SectionCard>
  );
}

export default ProductivityOverviewCard;
