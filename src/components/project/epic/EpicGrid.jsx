import EpicCard from "./EpicCard";
import { Layers } from "lucide-react";

function EpicGrid({ epics }) {
  if (epics.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-[#30363d] bg-[#161b22] p-10 text-center">
        <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#0d1117] ring-1 ring-[#30363d]">
          <Layers className="h-5 w-5 text-[#8b949e]" />
        </div>
        <h3 className="mt-3 text-sm font-semibold text-[#e6edf3]">
          No epics yet
        </h3>
        <p className="mt-1 text-xs text-[#8b949e]">
          Create your first epic to organize related tickets.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {epics.map((epic) => (
        <EpicCard key={epic.id} epic={epic} />
      ))}
    </div>
  );
}

export default EpicGrid;
