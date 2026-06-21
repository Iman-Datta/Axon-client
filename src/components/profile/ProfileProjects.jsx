import { FolderGit2, Plus, Sparkles } from "lucide-react";

/**
 * ProfileProjects
 * Pinned / recent projects grid. Empty for a freshly created account —
 * styled as a clear next step rather than a dead end.
 */
function ProfileProjects() {
  const projects = []; // hardcoded — no projects created yet

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-[#c9d1d9]">Projects</h3>
        <button className="inline-flex items-center gap-1.5 border border-[#30363d] bg-[#161b22] hover:bg-[#21262d] px-3 py-1.5 rounded-lg text-xs font-medium text-[#c9d1d9] transition-colors duration-200">
          <Plus size={13} />
          New project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="border border-dashed border-[#30363d] rounded-2xl px-6 py-12 text-center bg-[#161b22]/40">
          <div className="w-12 h-12 mx-auto rounded-xl bg-[#21262d] border border-[#30363d] flex items-center justify-center mb-4">
            <FolderGit2 size={20} className="text-[#2f81f7]" />
          </div>
          <h4 className="text-base font-medium text-[#c9d1d9]">
            No projects yet
          </h4>
          <p className="mt-2 max-w-sm mx-auto text-sm text-[#8b949e] leading-relaxed">
            Create your first project to start tracking issues, pull requests,
            and sprints in one place.
          </p>
          <button className="mt-5 inline-flex items-center gap-2 bg-[#2f81f7] hover:bg-[#1f6feb] px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-colors duration-200">
            <Sparkles size={15} />
            Create your first project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((p) => (
            <div
              key={p.name}
              className="border border-[#30363d] bg-[#0d1117] rounded-xl p-4"
            >
              {p.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfileProjects;
