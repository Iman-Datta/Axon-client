import { useState } from "react";
import { FolderGit2, Menu } from "lucide-react";
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
      className={`sticky top-18 h-[calc(100vh-4.5rem)] shrink-0 border-r border-[#21262d] bg-gradient-to-b from-[#0d1117]/98 via-[#0d1117]/95 to-[#0d1117]/98 backdrop-blur-md flex flex-col transition-all duration-300 ${collapsed ? "w-20" : "w-72"}`}
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
        <div className="mb-4 flex items-center justify-between">
          {!collapsed && (
            <span className="text-sm font-semibold text-[#e6edf3]">
              Project
            </span>
          )}

          <button
            onClick={() => setCollapsed((prev) => !prev)}
            className="rounded-xl p-2 text-[#8b949e] transition-all duration-200 hover:bg-[#161b22] hover:text-white"
          >
            <Menu size={18} />
          </button>
        </div>

        {/* Project Card */}
        <div
          className={`group rounded-2xl border border-[#30363d] bg-gradient-to-b from-[#161b22] to-[#11161d] p-4 transition-all duration-300 hover:border-[#3d444d] hover:shadow-[0_8px_24px_rgba(0,0,0,0.35)] ${collapsed ? "flex justify-center" : "flex items-center gap-4"}`}
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#30363d] bg-[#0d1117] transition-transform duration-300 group-hover:scale-105">
            <FolderGit2 size={22} className="text-[#58a6ff]" />
          </div>

          {!collapsed && (
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-sm font-semibold text-[#e6edf3]">
                {projectName}
              </h2>

              <p className="mt-0.5 text-xs text-[#8b949e]">Project Workspace</p>
            </div>
          )}
        </div>
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
