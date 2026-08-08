import { NavLink } from "react-router-dom";
import { personalItems, organizationItems } from "./sidebarConfig";

const Sidebar = ({ type }) => {
//   console.log(type);
  console.log("Inside sidebar");
  // Select the correct data array based on the type prop
  const items = type === "organization" ? organizationItems : personalItems;

  return (
    <aside className="w-full">
      <nav className="flex flex-col space-y-1">
        {items.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  isActive
                    ? item.isDanger
                      ? "bg-[#2d1b1f] text-[#f85149]" // Active Danger state
                      : "bg-[#1f242c] text-[#e6edf3]" // Active standard state
                    : item.isDanger
                      ? "text-[#f85149] hover:bg-[#211720]" // Inactive Danger state
                      : "text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#161b22]" // Inactive standard state
                }`
              }
            >
              <Icon
                className={`w-[18px] h-[18px] ${
                  item.isDanger ? "text-[#f85149]" : "opacity-80"
                }`}
              />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
