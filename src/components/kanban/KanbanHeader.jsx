import { LayoutGrid } from "lucide-react";

const KanbanHeader = () => {
  return (
    <div className="border-b border-[#21262d] pb-6">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#30363d] bg-[#161b22]">
          <LayoutGrid className="h-6 w-6 text-[#58a6ff]" />
        </div>

        <div>
          <h1 className="text-4xl font-bold text-[#e6edf3]">Board</h1>
          <p className="mt-1 text-sm text-[#8b949e]">
            Visualize and manage your project workflow.
          </p>
        </div>
      </div>
    </div>
  );
};

export default KanbanHeader;
