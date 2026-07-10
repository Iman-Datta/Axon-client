import { useState } from "react";
import { User } from "lucide-react";

import NavbarProfileDropdown from "./NavbarProfileDropdown";

function NavbarProfileMenu({ user, isAuthLoading, logoutUser }) {
  const [open, setOpen] = useState(false);

  if (isAuthLoading) {
    return (
      <div className="w-10 h-10 rounded-full bg-[#161b22] animate-pulse" />
    );
  }

  if (!user) {
    return null;
  }

  return (
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

      {open && <NavbarProfileDropdown user={user} logoutUser={logoutUser} />}
    </div>
  );
}

export default NavbarProfileMenu;
