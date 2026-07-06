import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { User, FolderGit2, Building2, Settings, LogOut } from "lucide-react";

import AxonLogo from "./AxonLogo";

import { clearUser } from "../../redux/slices/authSlice";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;

function Navbar() {
  const [open, setOpen] = useState(false);

  const publicNav = ["Features", "Workflow", "About", "Contact"];
  const { user, isAuthLoading, accessToken } = useSelector(
    (state) => state.auth,
  );

  const privateNav = [
    {
      name: "Overview",
      path: `/${user?.username}`,
    },

    {
      name: "Projects",
      path: "/projects",
    },

    {
      name: "Organizations",
      path: "/organizations",
    },

    {
      name: "Activity",
      path: "/activity",
    },

    {
      name: "Stars",
      path: "/stars",
    },
  ];

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      await fetchWithAuth(
        `${API}/auth/logout/`,
        { method: "POST" },
        dispatch,
        accessToken,
      );
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(clearUser());

      navigate("/");
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-[#30363d]/60 bg-[#0d1117]/90 backdrop-blur-xl">
      <div className="w-full px-6 lg:px-10">
        <div className="h-20 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3.5">
              <AxonLogo />

              <span className="text-[22px] font-semibold text-white">Axon</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8 ml-16">
              {user
                ? privateNav.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="text-[13px] text-[#8b949e] hover:text-[#c9d1d9] transition"
                    >
                      {item.name}
                    </Link>
                  ))
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
          </div>

          <div>
            {isAuthLoading ? (
              <div className="w-10 h-10 rounded-full bg-[#161b22] animate-pulse" />
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setOpen(!open)}
                  className="w-10 h-10 rounded-full overflow-hidden border border-[#30363d] bg-[#161b22] flex items-center justify-center"
                >
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User size={18} className="text-[#8b949e]" />
                  )}
                </button>

                {open && (
                  <div className="absolute right-0 mt-3 w-56 rounded-xl border border-[#30363d] bg-[#161b22] shadow-xl overflow-hidden">
                    <div className="px-4 py-3 border-b border-[#30363d]">
                      <p className="text-sm text-white">
                        {user.first_name} {user.last_name}
                      </p>

                      <p className="text-xs text-[#8b949e]">@{user.username}</p>
                    </div>

                    <Link
                      to={`/${user.username}`}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-[#c9d1d9] hover:bg-[#21262d]"
                    >
                      <User size={15} />
                      Profile
                    </Link>

                    <Link
                      to="/projects"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-[#c9d1d9] hover:bg-[#21262d]"
                    >
                      <FolderGit2 size={15} />
                      Projects
                    </Link>

                    <Link
                      to="/organizations"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-[#c9d1d9] hover:bg-[#21262d]"
                    >
                      <Building2 size={15} />
                      Organizations
                    </Link>

                    <Link
                      to="/settings"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-[#c9d1d9] hover:bg-[#21262d] border-t border-[#30363d]"
                    >
                      <Settings size={15} />
                      Settings
                    </Link>

                    <button
                      onClick={logoutUser}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-950/20"
                    >
                      <LogOut size={15} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="text-[13px] text-[#c9d1d9] hover:text-white border border-[#30363d] hover:bg-[#161b22] px-5 py-2 rounded-[10px] transition"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
