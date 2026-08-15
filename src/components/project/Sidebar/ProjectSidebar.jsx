import { useState } from "react";
import { FolderGit2, Menu, ChevronRight, Building2, User } from "lucide-react";
import { useParams } from "react-router-dom";

import ProjectSidebarItem from "./ProjectSidebarItem";
import { projectItems, toolItems } from "./projectSidebarData";

function ProjectSidebar({ project }) {
  const { slug, project_slug } = useParams();
  const [collapsed, setCollapsed] = useState(false);

  const workspaceName = project?.workspace_name || slug || "Workspace";
  const isOrg = project?.workspace_type === "organization";

  return (
    <aside
      className={`sticky top-0 h-screen shrink-0 border-r border-[#21262d] bg-gradient-to-b from-[#0d1117]/98 via-[#0d1117]/95 to-[#0d1117]/98 backdrop-blur-md flex flex-col transition-all duration-300 pt-20 ${
        collapsed ? "w-20" : "w-62 2xl:w-[280px]"
      }`}
    >
      <style>{`
        .axon-sidebar-scroll::-webkit-scrollbar { width: 6px; }
        .axon-sidebar-scroll::-webkit-scrollbar-track { background: transparent; }
        .axon-sidebar-scroll::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #388bfd55, #388bfd33);
          border-radius: 999px;
        }
        .axon-sidebar-scroll::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #58a6ff88, #388bfd55);
        }
        .axon-sidebar-scroll { scrollbar-width: thin; scrollbar-color: #388bfd55 transparent; }
      `}</style>

      {/* Top Header */}
      <div className="border-b border-[#21262d] p-3">
        <div
          className={`mb-2 flex items-center px-1 ${collapsed ? "justify-center" : "justify-between"}`}
        >
          {!collapsed && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6e7681]">
              Workspace Context
            </span>
          )}

          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="rounded-lg p-1.5 text-[#8b949e] transition-all duration-200 hover:bg-[#161b22] hover:text-white"
              title="Collapse sidebar"
            >
              <Menu size={16} />
            </button>
          )}
        </div>

        {/* Professional Workspace Header Indicator */}
        <button
          type="button"
          onClick={() => collapsed && setCollapsed(false)}
          title={collapsed ? "Expand sidebar" : undefined}
          className={
            collapsed
              ? "group flex w-full justify-center py-2"
              : "group flex w-full items-center gap-3 rounded-xl p-2.5 transition-all duration-200 hover:bg-[#161b22]"
          }
        >
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#30363d] bg-[#161b22] text-[#58a6ff] transition-colors group-hover:border-[#8b949e]">
            <FolderGit2 size={18} />

            {collapsed && (
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full border border-[#0d1117] bg-[#21262d] text-[#8b949e] opacity-0 shadow-sm transition-all duration-200 group-hover:translate-x-0.5 group-hover:bg-[#1f6feb] group-hover:text-white group-hover:opacity-100">
                <ChevronRight size={10} />
              </span>
            )}
          </div>

          {!collapsed && (
            <div className="min-w-0 flex-1 text-left">
              <div className="flex items-center gap-1.5">
                {isOrg ? (
                  <Building2 size={11} className="text-amber-400 shrink-0" />
                ) : (
                  <User size={11} className="text-emerald-400 shrink-0" />
                )}
                <span className="truncate text-[11px] font-semibold text-slate-400">
                  {workspaceName}
                </span>
              </div>
              <h2 className="truncate text-xs font-bold text-[#e6edf3]">
                {project?.name || project_slug}
              </h2>
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
