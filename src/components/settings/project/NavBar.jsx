import { NavLink } from "react-router-dom";
import { SETTINGS_NAV } from "./settingsNav";

function NavBar({ type = "project" }) {
  const items = SETTINGS_NAV[type] ?? [];

  return (
    <div>
      <h2 className="pt-2 text-sm font-bold uppercase tracking-wider text-gray-300">
        Project Settings
      </h2>

      <nav className="w-full border-b border-[#21262d]">
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {items.map(({ name, icon: Icon, path, danger }) => (
            <NavLink
              key={path}
              to={path}
              end
              className={({ isActive }) =>
                [
                  "flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? danger
                      ? "bg-[#f85149]/10 text-[#f85149] ring-1 ring-[#f85149]/30"
                      : "bg-[#1f6feb]/10 text-[#58a6ff] ring-1 ring-[#58a6ff]/25"
                    : danger
                      ? "text-[#f85149]/75 hover:bg-[#f85149]/8 hover:text-[#f85149]"
                      : "text-[#8b949e] hover:bg-[#161b22] hover:text-[#f0f6fc]",
                ].join(" ")
              }
            >
              <Icon size={16} strokeWidth={2} />
              <span>{name}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
