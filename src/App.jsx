import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "./components/shared/navbar/Navbar";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/Auth";
import CheckEmail from "./pages/CheckEmail";
import EmailCallback from "./pages/EmailCallback";
import Onboarding from "./pages/Onboarding";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import OnboardingGuard from "./components/onboarding/OnboardingGuard";
import OrganizationsPage from "./pages/organizations/OrganizationsPage";
import CreateOrganization from "./pages/organizations/CreateOrganization";
import ProjectsPage from "./pages/projects/ProjectsPage";
import CreateProject from "./pages/projects/CreateProject";

import WorkspaceResolver from "./components/routing/WorkspaceResolver";
import WorkspaceLoader from "./components/routing/WorkspaceLoader";

import { setUser, setAuthLoading, clearUser } from "./redux/slices/authSlice";

import { fetchWithAuth } from "./utils/fetchWithAuth";
import OrganizationMembersPage from "./pages/organizations/OrganizationMembersPage";

const API = import.meta.env.VITE_API_URL;

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.auth.accessToken);
  const isAuthLoading = useSelector((state) => state.auth.isAuthLoading);

  useEffect(() => {
    let mounted = true;

    const restoreAuth = async () => {
      try {
        const res = await fetchWithAuth(
          `${API}/auth/me/`,
          {},
          dispatch,
          accessToken,
        );

        const data = await res.json();

        if (!mounted) return;

        if (!res.ok) {
          throw new Error(data.message || "Authentication failed");
        }

        dispatch(setUser(data.user));
      } catch (error) {
        if (!mounted) return;

        dispatch(clearUser());
        console.log(error);
      } finally {
        if (mounted) {
          dispatch(setAuthLoading(false));
        }
      }
    };

    restoreAuth();

    return () => {
      mounted = false;
    };
  }, []);

  if (isAuthLoading) {
    return <div className="bg-[#0d1117] min-h-screen" />;
  }

  return (
    <div className="bg-[#0d1117] text-[#c9d1d9] min-h-screen">
      {location.pathname !== "/auth" && <Navbar />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />

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
          path="/:slug"
          element={
            <ProtectedRoute>
              <OnboardingGuard>
                <WorkspaceResolver />
              </OnboardingGuard>
            </ProtectedRoute>
          }
        />

        <Route
          path="/:slug/organizations"
          element={
            <ProtectedRoute>
              <OrganizationsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/:slug/projects"
          element={
            <ProtectedRoute>
              <WorkspaceLoader>
                <ProjectsPage />
              </WorkspaceLoader>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/:slug/people"
          element={
            <ProtectedRoute>
              <WorkspaceLoader>
                <OrganizationMembersPage />
              </WorkspaceLoader>
            </ProtectedRoute>
          }
        />
        <Route
          path="/organizations/create"
          element={
            <ProtectedRoute>
              <CreateOrganization />
            </ProtectedRoute>
          }
        />
        <Route
          path="/projects/create"
          element={
            <ProtectedRoute>
              <CreateProject />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
