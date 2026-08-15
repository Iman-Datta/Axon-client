import { Link } from "react-router-dom";
import { User, FolderGit2, Building2, Settings, LogOut } from "lucide-react";

function NavbarProfileDropdown({ user, logoutUser, onClose }) {
  const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ");
  const displayName = fullName || user.username;

  return (
    <div className="absolute right-0 z-50 mt-2 w-60 origin-top-right overflow-hidden rounded-lg border border-[#30363d] bg-[#161b22] shadow-2xl">
      {/* Identity header */}
      <div className="flex items-center gap-3 border-b border-[#21262d] px-4 py-3">
        {user.avatar ? (
          <img
            src={user.avatar}
            referrerPolicy="no-referrer"
            alt={displayName}
            className="h-9 w-9 shrink-0 rounded-full object-cover ring-1 ring-[#30363d]"
          />
        ) : (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#21262d] text-[#8b949e] ring-1 ring-[#30363d]">
            <User size={16} />
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate text-[13px] font-medium text-[#f0f6fc]">
            {displayName}
          </p>
          <p className="truncate text-[11.5px] text-[#8b949e]">
            @{user.username}
          </p>
        </div>
      </div>

      <div className="py-1">
        <Link
          to={`/${user.username}`}
          onClick={onClose}
          className="flex items-center gap-2.5 px-4 py-2 text-[12.5px] text-[#c9d1d9] transition-colors hover:bg-[#21262d]"
        >
          <User size={14} className="text-[#8b949e]" />
          Profile
        </Link>

        <Link
          to={`/${user.username}/projects`}
          onClick={onClose}
          className="flex items-center gap-2.5 px-4 py-2 text-[12.5px] text-[#c9d1d9] transition-colors hover:bg-[#21262d]"
        >
          <FolderGit2 size={14} className="text-[#8b949e]" />
          Projects
        </Link>

        <Link
          to={`/${user.username}/organizations`}
          onClick={onClose}
          className="flex items-center gap-2.5 px-4 py-2 text-[12.5px] text-[#c9d1d9] transition-colors hover:bg-[#21262d]"
        >
          <Building2 size={14} className="text-[#8b949e]" />
          Organizations
        </Link>
      </div>

      <div className="border-t border-[#21262d] py-1">
        <Link
          to={`/${user.username}/settings`}
          onClick={onClose}
          className="flex items-center gap-2.5 px-4 py-2 text-[12.5px] text-[#c9d1d9] transition-colors hover:bg-[#21262d]"
        >
          <Settings size={14} className="text-[#8b949e]" />
          Settings
        </Link>

        <button
          type="button"
          onClick={() => {
            onClose?.();
            logoutUser();
          }}
          className="flex w-full items-center gap-2.5 px-4 py-2 text-[12.5px] text-red-400 transition-colors hover:bg-red-500/10"
        >
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default NavbarProfileDropdown;
