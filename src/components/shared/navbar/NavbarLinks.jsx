import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { publicNav, getPrivateNav } from "./navbarData";
import { isNavItemActive } from "./navbarUtils";

function NavbarLinks({ user }) {
  const location = useLocation();

  const currentWorkspace = useSelector(
    (state) => state.workspace.currentWorkspace,
  );

  const workspaceSlug = currentWorkspace?.slug || user?.username;

  const workspaceType = currentWorkspace?.type || "personal";

  const privateNav = getPrivateNav(workspaceSlug, workspaceType, 2, 3, 5);

  return (
    <nav
      key={`${workspaceSlug}-${workspaceType}`}
      className="hidden md:flex items-center gap-8 ml-16"
    >
      {user
        ? privateNav.map((item) => {
            const Icon = item.icon;

            const active = isNavItemActive(location.pathname, item);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 text-[13px] transition pb-1 border-b-2 ${
                  active
                    ? "text-white border-[#58a6ff]"
                    : "text-[#8b949e] border-transparent hover:text-[#c9d1d9]"
                }`}
              >
                <Icon size={15} strokeWidth={2} />

                <span>{item.name}</span>

                {item.count > 0 && (
                  <span className="min-w-5 h-5 px-1.5 rounded-full bg-[#21262d] border border-[#30363d] text-[11px] text-[#c9d1d9] flex items-center justify-center font-medium">
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })
        : publicNav.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[13px] text-[#8b949e] hover:text-[#c9d1d9] transition"
            >
              {item}
            </a>
          ))}
    </nav>
  );
}

export default NavbarLinks;
