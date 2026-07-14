import { Plus } from "lucide-react";

function EpicHeader({ onCreateEpic }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-4xl font-bold text-[#e6edf3]">Epics</h1>

        <p className="mt-2 text-[#8b949e]">
          Group related tickets into larger initiatives.
        </p>
      </div>

      <button
        onClick={onCreateEpic}
        className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#238636] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#2ea043]"
      >
        <Plus size={16} />
        New Epic
      </button>
    </div>
  );
}

export default EpicHeader;
