import { NavLink } from "react-router-dom";

function ProjectSidebarItem({ icon: Icon, name, path, collapsed, soon, end }) {
  return (
    <NavLink
      to={path}
      end={end}
      className={({ isActive }) =>
        `group flex items-center rounded-lg px-3 py-2.5 transition-all ${
          isActive
            ? "bg-[#1f6feb]/15 text-[#58a6ff]"
            : "text-[#c9d1d9] hover:bg-[#161b22]"
        } ${collapsed ? "justify-center" : "gap-3"}`
      }
    >
      <Icon size={18} />

      {!collapsed && (
        <>
          <span className="flex-1 text-sm">{name}</span>

          {soon && (
            <span className="rounded-full bg-[#21262d] px-2 py-0.5 text-[10px]">
              Soon
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}

export default ProjectSidebarItem;
