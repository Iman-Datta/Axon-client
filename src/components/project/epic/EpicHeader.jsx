import { Plus, Layers } from "lucide-react";

function EpicHeader({ onCreateEpic, count }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-[#21262d] pb-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#161b22] ring-1 ring-[#30363d]">
          <Layers className="h-5 w-5 text-[#8b949e]" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-[#e6edf3]">Epics</h1>
            {typeof count === "number" && (
              <span className="rounded-full bg-[#161b22] px-2 py-0.5 text-xs font-medium text-[#8b949e] ring-1 ring-[#30363d]">
                {count}
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-[#8b949e]">
            Group related tickets into larger initiatives.
          </p>
        </div>
      </div>

      <button
        onClick={onCreateEpic}
        className="inline-flex items-center gap-1.5 rounded-md bg-[#238636] px-3.5 py-2 text-xs font-medium text-white transition-colors hover:bg-[#2ea043]"
      >
        <Plus size={15} />
        New Epic
      </button>
    </div>
  );
}

export default EpicHeader;
