import { Activity, Clock } from "lucide-react";
import SectionCard from "./SectionCard";
import EmptyState from "./EmptyState";

function ActivityStreamCard() {
  return (
    <SectionCard icon={Activity} title="Activity Stream">
      <EmptyState
        icon={Clock}
        iconClassName="text-[#8b949e]"
        title="Activity timeline coming in V2"
        description="Real-time audit trails, event feeds, and developer contribution graphs will be tracked here in the upcoming release."
      />
    </SectionCard>
  );
}

export default ActivityStreamCard;
