import { NavLink } from "react-router-dom";
import { SETTINGS_NAV } from "./settingsNav";

function NavBar({ type = "project" }) {
  const items = SETTINGS_NAV[type] ?? [];

  return (
    <nav className="w-2xl border-b border-[#21262d]">
      <div className="flex w-full overflow-x-auto">
        {items.map(({ name, icon: Icon, path, danger }) => (
          <NavLink
            key={path}
            to={path}
            end
            className={({ isActive }) =>
              [
                "flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors duration-150",
                isActive
                  ? danger
                    ? "border-[#f85149] text-[#f85149]"
                    : "border-[var(--accent)] text-[var(--accent)]"
                  : danger
                    ? "border-transparent text-[#f85149]/70 hover:border-[#f85149]/30 hover:text-[#f85149]"
                    : "border-transparent text-[#8b949e] hover:border-[#8b949e]/30 hover:text-[#c9d1d9]",
              ].join(" ")
            }
          >
            <Icon size={16} />
            {name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

export default NavBar;
