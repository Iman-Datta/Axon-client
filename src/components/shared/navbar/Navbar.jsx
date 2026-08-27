import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  ChevronDown,
  Check,
  Building2,
  User,
  Plus,
  Menu,
  X,
} from "lucide-react";

import NavbarLogo from "./NavbarLogo";
import NavbarLinks from "./NavbarLinks";
import NavbarProfileMenu from "./NavbarProfileMenu";

import { clearUser } from "../../../redux/slices/authSlice";
import { clearWorkspaceState } from "../../../redux/slices/workspaceSlice";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;

function WorkspaceRow({ workspace, isSelected, onSelect }) {
  const Icon = workspace.type === "organization" ? Building2 : User;

  return (
    <button
      role="menuitem"
      onClick={onSelect}
      className={`flex w-full items-center justify-between gap-3 rounded-lg px-2.5 py-2 text-left transition-colors ${
        isSelected
          ? "bg-[#21262d] text-white"
          : "text-[#c9d1d9] hover:bg-[#1c2128]"
      }`}
    >
      <div className="flex min-w-0 items-center gap-2.5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#0d1117] ring-1 ring-inset ring-white/10">
          {workspace.avatar ? (
            <img
              src={workspace.avatar}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <Icon size={14} className="text-[#8b949e]" />
          )}
        </span>
        <div className="min-w-0">
          <p
            className={`truncate text-xs ${
              isSelected
                ? "font-semibold text-white"
                : "font-medium text-[#e6edf3]"
            }`}
          >
            {workspace.name}
          </p>
          <p className="truncate text-[10px] text-[#8b949e]">
            @{workspace.slug}
          </p>
        </div>
      </div>
      {isSelected && (
        <Check size={14} strokeWidth={2.5} className="shrink-0 text-blue-400" />
      )}
    </button>
  );
}

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, isAuthLoading, accessToken } = useSelector(
    (state) => state.auth,
  );
  const currentWorkspace = useSelector(
    (state) => state.workspace.currentWorkspace,
  );

  const [workspaces, setWorkspaces] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const mobileNavRef = useRef(null);
  const mobileNavTriggerRef = useRef(null);

  const isRootLanding = location.pathname === "/";

  useEffect(() => {
    if (!user || !accessToken) return;

    const fetchWorkspaces = async () => {
      try {
        const res = await fetchWithAuth(
          `${API}/auth/workspaces/`,
          { method: "GET" },
          dispatch,
          accessToken,
        );
        const data = await res.json();
        if (res.ok && data.success) {
          setWorkspaces(data.workspaces);
        }
      } catch (err) {
        console.error("Failed to fetch workspaces", err);
      }
    };

    fetchWorkspaces();
  }, [user, accessToken, dispatch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
      if (
        mobileNavRef.current &&
        !mobileNavRef.current.contains(e.target) &&
        !mobileNavTriggerRef.current?.contains(e.target)
      ) {
        setIsMobileNavOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setIsMobileNavOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    setIsMobileNavOpen(false);
    setIsOpen(false);
  }, [location.pathname]);

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
      dispatch(clearWorkspaceState());
      navigate("/");
    }
  };

  const goToWorkspace = (slug) => {
    setIsOpen(false);
    setIsMobileNavOpen(false);
    navigate(`/${slug}`);
  };

  const currentSlug = currentWorkspace?.slug || user?.username;
  const activeWorkspace = workspaces.find((w) => w.slug === currentSlug) || {
    name: user
      ? `${user.first_name || ""} ${user.last_name || ""}`.trim() ||
        user.username
      : "",
    slug: currentSlug,
    type: "personal",
  };

  const personalWorkspace = workspaces.find((w) => w.type === "personal");
  const orgWorkspaces = workspaces.filter((w) => w.type === "organization");

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-[#30363d]/60 bg-[#0d1117]/90 backdrop-blur-xl">
      <div className="w-full px-3 sm:px-6 lg:px-10">
        <div className="flex h-14 sm:h-16 lg:h-20 items-center justify-between">
          <div className="flex min-w-0 items-center">
            <NavbarLogo />

            {/* Workspace switcher */}
            {user && (
              <div
                className="relative ml-2 flex items-center border-l border-[#30363d]/80 pl-2 sm:ml-3.5 sm:pl-3.5"
                ref={dropdownRef}
              >
                <button
                  ref={triggerRef}
                  onClick={() => setIsOpen((prev) => !prev)}
                  aria-haspopup="menu"
                  aria-expanded={isOpen}
                  className={`flex items-center gap-1.5 rounded-lg px-1.5 py-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 sm:gap-2 sm:px-2 sm:py-1.5 ${
                    isOpen
                      ? "bg-[#161b22] ring-1 ring-[#30363d]"
                      : "hover:bg-[#161b22]/70"
                  }`}
                >
                  <span className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center overflow-hidden rounded-md bg-[#21262d] ring-1 ring-inset ring-white/10">
                    {activeWorkspace.avatar ? (
                      <img
                        src={activeWorkspace.avatar}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : activeWorkspace.type === "organization" ? (
                      <Building2 size={13} className="text-[#8b949e]" />
                    ) : (
                      <User size={13} className="text-[#8b949e]" />
                    )}
                  </span>

                  <span className="max-w-[80px] sm:max-w-[120px] lg:max-w-[140px] truncate text-xs sm:text-[13px] font-semibold tracking-tight text-[#e6edf3]">
                    {activeWorkspace.name || activeWorkspace.slug}
                  </span>

                  <ChevronDown
                    size={12}
                    strokeWidth={2.5}
                    className={`text-[#8b949e] transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-white" : ""
                    }`}
                  />
                </button>

                {/* Workspace Dropdown */}
                {isOpen && (
                  <div
                    role="menu"
                    className="absolute left-0 top-full z-50 mt-2 w-56 sm:w-64 overflow-hidden rounded-xl border border-[#30363d] bg-[#161b22] shadow-[0_16px_48px_rgba(0,0,0,0.7)]"
                  >
                    {personalWorkspace && (
                      <div className="border-b border-[#21262d] p-1.5">
                        <div className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#6e7681]">
                          Personal account
                        </div>
                        <WorkspaceRow
                          workspace={personalWorkspace}
                          isSelected={personalWorkspace.slug === currentSlug}
                          onSelect={() => goToWorkspace(personalWorkspace.slug)}
                        />
                      </div>
                    )}

                    <div className="p-1.5">
                      <div className="flex items-center justify-between px-2.5 py-1">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#6e7681]">
                          Organizations
                        </span>
                        <Link
                          to="/organizations/create"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-1 text-[10px] font-medium text-[#58a6ff] hover:underline"
                        >
                          <Plus size={12} /> New
                        </Link>
                      </div>

                      <div className="mt-0.5 max-h-48 space-y-0.5 overflow-y-auto">
                        {orgWorkspaces.map((ws) => (
                          <WorkspaceRow
                            key={ws.slug}
                            workspace={ws}
                            isSelected={ws.slug === currentSlug}
                            onSelect={() => goToWorkspace(ws.slug)}
                          />
                        ))}

                        {orgWorkspaces.length === 0 && (
                          <p className="px-2.5 py-2 text-[11px] text-[#6e7681]">
                            You haven&apos;t joined any organizations yet.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex lg:items-center">
              <NavbarLinks
                user={user}
                currentWorkspace={currentWorkspace}
                isRootLanding={isRootLanding}
              />
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {/* Desktop Profile Menu */}
            <div className="hidden sm:block">
              {user ? (
                <NavbarProfileMenu
                  user={user}
                  currentWorkspace={currentWorkspace}
                  isAuthLoading={isAuthLoading}
                  logoutUser={logoutUser}
                />
              ) : isAuthLoading ? (
                <div className="h-8 w-8 animate-pulse rounded-full bg-[#161b22] sm:h-9 sm:w-9" />
              ) : (
                <Link
                  to="/auth"
                  className="rounded-[10px] border border-[#30363d] px-3 py-1.5 text-xs text-[#c9d1d9] transition hover:bg-[#161b22] hover:text-white sm:px-4 sm:py-2 sm:text-[13px]"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              ref={mobileNavTriggerRef}
              onClick={() => setIsMobileNavOpen((prev) => !prev)}
              aria-haspopup="menu"
              aria-expanded={isMobileNavOpen}
              aria-label="Toggle navigation menu"
              className={`flex h-8 w-8 items-center justify-center rounded-lg border border-[#30363d] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 sm:h-9 sm:w-9 lg:hidden ${
                isMobileNavOpen ? "bg-[#161b22]" : "hover:bg-[#161b22]/70"
              }`}
            >
              {isMobileNavOpen ? (
                <X size={16} className="text-[#e6edf3]" />
              ) : (
                <Menu size={16} className="text-[#e6edf3]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Full-width Responsive Mobile Navigation Drawer */}
      {isMobileNavOpen && (
        <div
          ref={mobileNavRef}
          className="border-t border-[#30363d]/60 bg-[#0d1117] px-4 py-3 shadow-2xl lg:hidden"
        >
          <div className="flex flex-col gap-3">
            <div
              className="flex flex-col gap-1 [&_a]:flex [&_a]:w-full [&_a]:items-center [&_a]:gap-2.5 [&_a]:rounded-lg [&_a]:px-3 [&_a]:py-2 [&_a]:text-xs [&_a]:font-medium [&_a]:text-[#c9d1d9] [&_a:hover]:bg-[#1c2128] [&_a:hover]:text-white"
              onClick={() => setIsMobileNavOpen(false)}
            >
              <NavbarLinks
                user={user}
                currentWorkspace={currentWorkspace}
                isRootLanding={isRootLanding}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;