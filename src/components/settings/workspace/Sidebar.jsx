// src/components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { personalItems, organizationItems } from "./sidebarConfig";

const Sidebar = ({ type }) => {
  const items = type === "organization" ? organizationItems : personalItems;
  const sectionLabel = type === "organization" ? "Organization" : "Personal";

  const standardItems = items.filter((item) => !item.isDanger);
  const dangerItems = items.filter((item) => item.isDanger);

  const renderItem = (item) => {
    const Icon = item.icon;

    return (
      <NavLink
        key={item.path}
        to={item.path}
        end /* <--- FIXED: Prevents parent routes (like /settings) from staying active on child routes */
        className={({ isActive }) =>
          `group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-[#58a6ff]/60 ${
            isActive
              ? item.isDanger
                ? "bg-[#2d1b1f] text-[#f85149]"
                : "bg-[#1f242c] text-[#e6edf3]"
              : item.isDanger
                ? "text-[#f85149]/80 hover:bg-[#211720] hover:text-[#f85149]"
                : "text-[#8b949e] hover:bg-[#161b22] hover:text-[#c9d1d9]"
          }`
        }
      >
        {({ isActive }) => (
          <>
            {/* Active accent bar */}
            <span
              className={`absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full transition-opacity duration-150 ${
                isActive
                  ? item.isDanger
                    ? "bg-[#f85149] opacity-100"
                    : "bg-[#58a6ff] opacity-100"
                  : "opacity-0"
              }`}
            />

            <Icon
              className={`h-[18px] w-[18px] shrink-0 transition-colors duration-150 ${
                item.isDanger
                  ? "text-[#f85149]"
                  : isActive
                    ? "text-[#e6edf3]"
                    : "text-[#8b949e] group-hover:text-[#c9d1d9]"
              }`}
              strokeWidth={1.75}
            />

            <span className="truncate">{item.label}</span>

            {item.badge && (
              <span className="ml-auto rounded-full bg-[#1f6feb]/15 px-2 py-0.5 text-[11px] font-semibold tabular-nums text-[#58a6ff]">
                {item.badge}
              </span>
            )}
          </>
        )}
      </NavLink>
    );
  };

  return (
    <aside className="w-full self-start md:sticky md:top-6">
      <div className="px-3">
        <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#6e7681]">
          {sectionLabel}
        </h2>
      </div>

      <nav
        aria-label={`${sectionLabel} settings`}
        className="flex flex-col gap-0.5 px-1"
      >
        {standardItems.map(renderItem)}

        {dangerItems.length > 0 && (
          <>
            <div className="my-3 border-t border-[#21262d]" />
            {dangerItems.map(renderItem)}
          </>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
