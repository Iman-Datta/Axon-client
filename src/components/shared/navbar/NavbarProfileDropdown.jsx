import { Link } from "react-router-dom";
import { User, FolderGit2, Building2, Settings, LogOut } from "lucide-react";

function NavbarProfileDropdown({ user, logoutUser }) {
  return (
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
        to={`/${user.username}/projects`}
        className="flex items-center gap-3 px-4 py-3 text-sm text-[#c9d1d9] hover:bg-[#21262d]"
      >
        <FolderGit2 size={15} />
        Projects
      </Link>

      <Link
        to={`/${user.username}/organizations`}
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
  );
}

export default NavbarProfileDropdown;
