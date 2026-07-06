import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "./components/shared/Navbar";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import CheckEmail from "./pages/CheckEmail";
import EmailCallback from "./pages/EmailCallback";
import Onboarding from "./pages/Onboarding";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import OnboardingGuard from "./components/onboarding/OnboardingGuard";
import Profile from "./pages/Profile";

import { setUser, setAuthLoading, clearUser } from "./redux/slices/authSlice";

import { fetchWithAuth } from "./utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.auth.accessToken);
  const isAuthLoading = useSelector((state) => state.auth.isAuthLoading);

  useEffect(() => {
    const restoreAuth = async () => {
      try {
        const res = await fetchWithAuth(
          `${API}/auth/me/`,
          {},
          dispatch,
          accessToken,
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error("Auth failed");
        }

        dispatch(setUser(data.user));
      } catch (error) {
        dispatch(clearUser());
        console.log(error);
      } finally {
        dispatch(setAuthLoading(false));
      }
    };

    restoreAuth();
  }, [dispatch, accessToken]);

  if (isAuthLoading) {
    return <div className="bg-[#0d1117] min-h-screen" />;
  }

  return (
    <div className="bg-[#0d1117] text-[#c9d1d9] min-h-screen">
      {location.pathname !== "/auth" && <Navbar />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <OnboardingGuard>
                <Dashboard />
              </OnboardingGuard>
            </ProtectedRoute>
          }
        />
        <Route path="/checkEmail" element={<CheckEmail />} />
        <Route path="/callback" element={<EmailCallback />} />
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <Onboarding />
            </ProtectedRoute>
          }
        />
        <Route
          path="/:username"
          element={
            <OnboardingGuard>
              <Profile />
            </OnboardingGuard>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
