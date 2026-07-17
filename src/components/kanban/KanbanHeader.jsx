import { LayoutGrid } from "lucide-react";

const KanbanHeader = () => {
  return (
    <div className="mb-6 flex items-center gap-3 border-b border-[#21262d] pb-5">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#30363d] bg-[#161b22]">
        <LayoutGrid className="h-5 w-5 text-[#58a6ff]" />
      </div>

      <div>
        <h1 className="text-xl font-semibold text-[#e6edf3]">Board</h1>
        <p className="text-[13px] text-[#6e7681]">
          Visualize and manage your project workflow.
        </p>
      </div>
    </div>
  );
};

export default KanbanHeader;
