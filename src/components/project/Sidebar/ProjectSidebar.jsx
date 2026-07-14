import { FolderGit2 } from "lucide-react";
import { useParams } from "react-router-dom";

import ProjectSidebarItem from "./ProjectSidebarItem";
import { projectItems, toolItems } from "./projectSidebarData";

function ProjectSidebar() {
  const { slug, project_slug } = useParams();

  const projectName = project_slug
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <aside className="sticky top-18 h-[calc(100vh-4.5rem)] w-72 shrink-0 border-r border-[#21262d] bg-gradient-to-b from-[#0d1117]/98 via-[#0d1117]/95 to-[#0d1117]/98 backdrop-blur-md flex flex-col">
      <style>{`.axon-sidebar-scroll::-webkit-scrollbar { width: 6px; } .axon-sidebar-scroll::-webkit-scrollbar-track { background: transparent; } .axon-sidebar-scroll::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #388bfd55, #388bfd33); border-radius: 999px; } .axon-sidebar-scroll::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg, #58a6ff88, #388bfd55); } .axon-sidebar-scroll { scrollbar-width: thin; scrollbar-color: #388bfd55 transparent; }`}</style>

      {/* Header */}
      <div className="border-b border-[#21262d] p-5">
        <div className="group flex items-center gap-4 rounded-2xl border border-[#30363d] bg-gradient-to-b from-[#161b22] to-[#11161d] p-4 transition-all duration-300 hover:border-[#3d444d] hover:bg-gradient-to-b hover:from-[#1a2028] hover:to-[#121821] hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)]">
          {/* Logo */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#30363d] bg-[#0d1117] transition-transform duration-300 group-hover:scale-105">
            <FolderGit2 size={22} className="text-[#58a6ff]" />
          </div>

          {/* Project Info */}
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-sm font-semibold text-[#e6edf3]">
              {projectName}
            </h2>

            <p className="mt-0.5 text-xs text-[#8b949e]">Project Workspace</p>
          </div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="axon-sidebar-scroll flex-1 overflow-y-auto overflow-x-hidden">
        {/* Project */}
        <div className="p-4">
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6e7681]">
            Project
          </p>

          <div className="space-y-1">
            {projectItems.map((item) => (
              <ProjectSidebarItem
                key={item.name}
                icon={item.icon}
                name={item.name}
                path={
                  item.path
                    ? `/${slug}/${project_slug}/${item.path}`
                    : `/${slug}/${project_slug}`
                }
                end={item.path === ""}
              />
            ))}
          </div>
        </div>

        {/* Tools */}
        <div className="border-t border-[#21262d] p-4">
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6e7681]">
            Tools
          </p>

          <div className="space-y-1">
            {toolItems.map((item) => (
              <ProjectSidebarItem
                key={item.name}
                icon={item.icon}
                name={item.name}
                path={`/${slug}/${project_slug}/${item.path}`}
                soon={item.soon}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default ProjectSidebar;
