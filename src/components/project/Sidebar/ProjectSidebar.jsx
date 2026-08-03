import { useState } from "react";
import { FolderGit2, Menu, ChevronRight } from "lucide-react";
import { useParams } from "react-router-dom";

import ProjectSidebarItem from "./ProjectSidebarItem";
import { projectItems, toolItems } from "./projectSidebarData";

function ProjectSidebar() {
  const { slug, project_slug } = useParams();

  const [collapsed, setCollapsed] = useState(false);

  const projectName = project_slug
    ?.split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <aside
      className={`sticky top-18 h-[calc(100vh-4.5rem)] shrink-0 border-r border-[#21262d] bg-linear-to-b from-[#0d1117]/98 via-[#0d1117]/95 to-[#0d1117]/98 backdrop-blur-md flex flex-col transition-all duration-300 ${collapsed ? "w-20" : "w-62"}`}
    >
      <style>{`
        .axon-sidebar-scroll::-webkit-scrollbar {
          width: 6px;
        }

        .axon-sidebar-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .axon-sidebar-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #388bfd55, #388bfd33);
          border-radius: 999px;
        }

        .axon-sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #58a6ff88, #388bfd55);
        }

        .axon-sidebar-scroll {
          scrollbar-width: thin;
          scrollbar-color: #388bfd55 transparent;
        }
      `}</style>

      {/* Top Header */}
      <div className="border-b border-[#21262d] p-4">
        <div
          className={`mb-4 flex items-center ${collapsed ? "justify-center" : "justify-between"}`}
        >
          {!collapsed && (
            <span className="text-sm font-semibold text-[#e6edf3]">
              Projects
            </span>
          )}

          {/* Hamburger only exists in the expanded state now */}
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="rounded-xl p-2 text-[#8b949e] transition-all duration-200 hover:bg-[#161b22] hover:text-white"
              title="Collapse sidebar"
            >
              <Menu size={18} />
            </button>
          )}
        </div>

        {/* Project Card / Logo — doubles as the expand control when collapsed */}
        <button
          type="button"
          onClick={() => collapsed && setCollapsed(false)}
          title={collapsed ? "Expand sidebar" : undefined}
          className={
            collapsed
              ? "group flex w-full justify-center"
              : "group relative flex w-full cursor-default items-center gap-4 rounded-2xl border border-[#30363d] bg-linear-to-b from-[#161b22] to-[#11161d] p-4 transition-all duration-300 hover:border-[#388bfd66] hover:shadow-[0_8px_24px_rgba(56,139,253,0.18)]"
          }
        >
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#30363d] bg-[#0d1117] transition-all duration-300 group-hover:scale-105 group-hover:border-[#388bfd88]">
            <FolderGit2 size={22} className="text-[#58a6ff]" />

            {/* Chevron badge — only appears (on hover) when the logo is actually clickable */}
            {collapsed && (
              <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full border border-[#0d1117] bg-[#21262d] text-[#8b949e] opacity-0 shadow-md transition-all duration-200 group-hover:translate-x-0.5 group-hover:bg-[#1f6feb] group-hover:text-white group-hover:opacity-100">
                <ChevronRight size={12} />
              </span>
            )}
          </div>

          {!collapsed && (
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-sm font-semibold text-[#e6edf3]">
                {projectName}
              </h2>

              <p className="mt-0.5 text-xs text-[#8b949e]">Project Workspace</p>
            </div>
          )}
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="axon-sidebar-scroll flex-1 overflow-y-auto overflow-x-hidden">
        {/* Project Section */}
        <div className="p-4">
          {!collapsed && (
            <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6e7681]">
              Project
            </p>
          )}

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
                collapsed={collapsed}
              />
            ))}
          </div>
        </div>

        {/* Tools Section */}
        <div className="border-t border-[#21262d] p-4">
          {!collapsed && (
            <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6e7681]">
              Tools
            </p>
          )}

          <div className="space-y-1">
            {toolItems.map((item) => (
              <ProjectSidebarItem
                key={item.name}
                icon={item.icon}
                name={item.name}
                path={`/${slug}/${project_slug}/${item.path}`}
                soon={item.soon}
                collapsed={collapsed}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default ProjectSidebar;
