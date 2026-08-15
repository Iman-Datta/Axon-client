import { useState, useRef, useEffect } from "react";
import { User } from "lucide-react";

import NavbarProfileDropdown from "./NavbarProfileDropdown";

function NavbarProfileMenu({ user, isAuthLoading, logoutUser }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  if (isAuthLoading) {
    return <div className="h-9 w-9 animate-pulse rounded-full bg-[#161b22]" />;
  }

  if (!user) return null;

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open profile menu"
        className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-[#30363d] bg-[#161b22] transition-colors hover:border-[#388bfd]"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            referrerPolicy="no-referrer"
            alt={user.username}
            className="h-full w-full object-cover"
          />
        ) : (
          <User size={16} className="text-[#8b949e]" />
        )}
      </button>

      {open && (
        <NavbarProfileDropdown
          user={user}
          logoutUser={logoutUser}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}

export default NavbarProfileMenu;
