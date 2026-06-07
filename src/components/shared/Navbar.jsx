import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AxonLogo from "./AxonLogo";

import { clearUser } from "../../redux/slices/authSlice";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;

function Navbar() {
  const navItems = ["Features", "Workflow", "About", "Contact"];

  const { user, isAuthLoading, accessToken } = useSelector(
    (state) => state.auth,
  );

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
          {/* LEFT */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3.5">
              <AxonLogo />
              <span className="text-[22px] font-semibold">Axon</span>
            </Link>

            <nav className="hidden md:flex items-center gap-9 ml-16">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-[13px] text-[#6b7280] hover:text-[#c9d1d9] transition"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* RIGHT */}

          {isAuthLoading ? (
            <div className="w-20 h-9 rounded-[10px] bg-[#161b22] animate-pulse" />
          ) : user ? (
            <button
              onClick={logoutUser}
              className="text-[13px] text-red-400 hover:text-red-300 border border-[#30363d] hover:bg-red-950/20 px-5 py-2 rounded-[10px] transition"
            >
              Logout
            </button>
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
    </header>
  );
}

export default Navbar;