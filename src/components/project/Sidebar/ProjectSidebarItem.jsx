import { NavLink } from "react-router-dom";

function ProjectSidebarItem({
  icon: Icon,
  name,
  path,
  end = false,
  soon = false,
  collapsed = false,
}) {
  return (
    <NavLink
      to={soon ? "#" : path}
      end={end}
      title={collapsed ? name : ""}
      className={({ isActive }) =>
        `group flex items-center rounded-xl px-3 py-3 transition-all duration-200 ${
          collapsed ? "justify-center" : "gap-3"
        } ${
          isActive
            ? "bg-[#0d419d33] text-[#58a6ff]"
            : "text-[#c9d1d9] hover:bg-[#161b22] hover:text-white"
        }`
      }
    >
      <Icon
        size={20}
        className="shrink-0 transition-transform duration-200 group-hover:scale-110"
      />

      {!collapsed && (
        <>
          <span className="flex-1 text-sm font-medium">{name}</span>

          {soon && (
            <span className="rounded-full bg-[#21262d] px-2 py-0.5 text-[10px] text-[#8b949e]">
              Soon
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}

export default ProjectSidebarItem;
