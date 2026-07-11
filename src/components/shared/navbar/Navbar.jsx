import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import NavbarLogo from "./NavbarLogo";
import NavbarLinks from "./NavbarLinks";
import NavbarProfileMenu from "./NavbarProfileMenu";

import { clearUser } from "../../../redux/slices/authSlice";
import { clearWorkspaceState } from "../../../redux/slices/workspaceSlice";

import { fetchWithAuth } from "../../../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthLoading, accessToken } = useSelector(
    (state) => state.auth,
  );

  const currentWorkspace = useSelector(
    (state) => state.workspace.currentWorkspace,
  );

  const logoutUser = async () => {
    try {
      await fetchWithAuth(
        `${API}/auth/logout/`,
        {
          method: "POST",
        },
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

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-[#30363d]/60 bg-[#0d1117]/90 backdrop-blur-xl">
      <div className="w-full px-6 lg:px-10">
        <div className="h-20 flex items-center justify-between">
          <div className="flex items-center">
            <NavbarLogo />

            <NavbarLinks user={user} currentWorkspace={currentWorkspace} />
          </div>

          <div>
            {user ? (
              <NavbarProfileMenu
                user={user}
                currentWorkspace={currentWorkspace}
                isAuthLoading={isAuthLoading}
                logoutUser={logoutUser}
              />
            ) : isAuthLoading ? (
              <div className="w-10 h-10 rounded-full bg-[#161b22] animate-pulse" />
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
