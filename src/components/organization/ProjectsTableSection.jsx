import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FolderGit2,
  CheckSquare,
  Users,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";

function ProjectsTableSection({ projects, orgSlug }) {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  // Slice to top 4 unless "View All" is toggled
  const displayedProjects = showAll ? projects : projects.slice(0, 4);
  const hasMore = projects.length > 4;

  return (
    <div className="overflow-hidden rounded-xl border border-[#30363d] bg-[#161b22]">
      <div className="flex items-center justify-between border-b border-[#21262d] bg-[#0d1117]/50 px-4 py-2.5">
        <h3 className="flex items-center gap-2 text-[13px] font-semibold text-[#f0f6fc]">
          <FolderGit2 size={14} className="text-[#58a6ff]" /> Projects
        </h3>
        <span className="text-[10.5px] font-medium text-[#8b949e]">
          {projects.length} total
        </span>
      </div>

      {projects.length === 0 ? (
        <div className="py-12 text-center text-xs text-[#8b949e]">
          No projects found in this organization.
        </div>
      ) : (
        <>
          <div className="divide-y divide-[#21262d]">
            {displayedProjects.map((project) => (
              <div
                key={project.id}
                role="button"
                tabIndex={0}
                onClick={() => navigate(`/${orgSlug}/${project.slug}`)}
                onKeyDown={(e) =>
                  e.key === "Enter" && navigate(`/${orgSlug}/${project.slug}`)
                }
                className="group flex cursor-pointer items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-[#0d1117]/60"
              >
                <span className="min-w-0 truncate text-[13px] font-medium text-[#c9d1d9] transition-colors group-hover:text-[#58a6ff]">
                  {project.name}
                </span>

                <div className="flex shrink-0 items-center gap-4 text-[10.5px] text-[#8b949e]">
                  <span className="hidden items-center gap-1 sm:inline-flex">
                    <CheckSquare size={11} /> {project.ticket_count}
                  </span>
                  <span className="hidden items-center gap-1 sm:inline-flex">
                    <Users size={11} /> {project.member_count}
                  </span>
                  <span
                    className={`inline-flex rounded-full border px-2 py-0.5 text-[10px] font-medium ${
                      project.is_archived
                        ? "border-[#8b949e]/30 bg-[#8b949e]/10 text-[#8b949e]"
                        : "border-[#3fb950]/30 bg-[#3fb950]/10 text-[#3fb950]"
                    }`}
                  >
                    {project.is_archived ? "Archived" : "Active"}
                  </span>
                  <ArrowUpRight
                    size={13}
                    className="text-[#8b949e] transition-colors group-hover:text-white"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* View All / Collapse Toggle Footer */}
          {hasMore && (
            <div className="border-t border-[#21262d] bg-[#0d1117]/30 px-4 py-2.5 text-center">
              <button
                type="button"
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-[#58a6ff] transition-colors hover:text-[#79c0ff]"
              >
                {showAll ? (
                  <>Show less</>
                ) : (
                  <>
                    View all {projects.length} projects{" "}
                    <ChevronDown size={13} />
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProjectsTableSection;
