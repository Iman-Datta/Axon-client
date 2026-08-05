import { NavLink } from "react-router-dom";
import { SETTINGS_NAV } from "./settingsNav";

function NavBar({ type = "project" }) {
  const items = SETTINGS_NAV[type] ?? [];

  return (
    <nav className="sticky top-15 z-10 -mx-4 border-b border-[#21262d] bg-[#0d1117]/95 px-4 backdrop-blur sm:-mx-8 sm:px-8">
      <div className="flex items-center gap-1 overflow-x-auto py-2">
        {items.map(({ name, icon: Icon, path, danger }) => (
          <NavLink
            key={path}
            to={path}
            end
            className={({ isActive }) =>
              [
                "flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? danger
                    ? "bg-[#f85149]/10 text-[#f85149]"
                    : "bg-[var(--accent-soft)] text-[var(--accent)]"
                  : danger
                    ? "text-[#f85149]/70 hover:bg-[#f85149]/5 hover:text-[#f85149]"
                    : "text-[#8b949e] hover:bg-[#161b22] hover:text-[#c9d1d9]",
              ].join(" ")
            }
          >
            <Icon size={16} strokeWidth={2} />
            {name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default NavBar;
