import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "./components/shared/navbar/Navbar";
import LandingPage from "./components/landingpage/LandingPage";
// Auth
import AuthPage from "./pages/auth/Auth";
import CheckEmail from "./pages/auth/CheckEmail";
import EmailCallback from "./pages/auth/EmailCallback";
import Onboarding from "./pages/auth/Onboarding";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import OnboardingGuard from "./components/onboarding/OnboardingGuard";
import OrganizationsPage from "./pages/organizations/OrganizationsPage";
import CreateOrganization from "./pages/organizations/CreateOrganization";

// My working ticket
import MyWorkPage from "./components/profile/MyWorkPage";

// Project
import ProjectsListPage from "./pages/projects/ProjectsListPage";
import CreateProject from "./pages/projects/CreateProject";
import OverviewPage from "./pages/projects/OverviewPage";
import EpicsPage from "./pages/projects/EpicsPage";
import TicketsTablePage from "./pages/projects/TicketsTablePage";
import IntegrationsPage from "./pages/projects/IntegrationsPage";
import MembersPage from "./pages/projects/MembersPage";

// Settings
import ProjectSettings from "./pages/projects/ProjectSettings";
import GeneralSetting from "./pages/settings/project/GeneralSetting";
import WorkflowSettings from "./pages/settings/project/WorkflowSettings";
import LabelsSetting from "./pages/settings/project/LabelsSetting";
import Danger from "./pages/settings/project/Danger";
import WorkspaceSettings from "./components/routing/WorkspaceSettings";
import Dashboard from "./pages/dashboard/Dashboard";
import GeneralSettings from "./pages/settings/workspace/Generalsettings";
import Account from "./pages/settings/workspace/Account";
import Security from "./pages/settings/workspace/Security";
import DangerOrg from "./pages/settings/workspace/DangerOrg";

// Workspace
import WorkspaceResolver from "./components/routing/WorkspaceResolver";
import WorkspaceLoader from "./components/routing/WorkspaceLoader";

// Layout
import ProjectLayout from "./components/layout/ProjectLayout";

// Coming soon
import ComingSoon from "./components/shared/ComingSoon";
import ComingSoonV2 from "./components/shared/ComingSoonV2";

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
                <ProjectsListPage />
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
          path="/:slug/insights"
          element={
            <ProtectedRoute>
              <WorkspaceLoader>
                <ComingSoonV2 />
              </WorkspaceLoader>
            </ProtectedRoute>
          }
        />
        <Route
          path="/:slug/my-work"
          element={
            <ProtectedRoute>
              <WorkspaceLoader>
                <MyWorkPage />
              </WorkspaceLoader>
            </ProtectedRoute>
          }
        />

        <Route
          path="/:slug/settings"
          element={
            <ProtectedRoute>
              <WorkspaceSettings />
            </ProtectedRoute>
          }
        >
          <Route index element={<GeneralSettings />} />
          <Route path="permissions" element={<ComingSoon />} />
          <Route path="integrations" element={<ComingSoon />} />
          <Route path="account" element={<Account />} />
          <Route path="security" element={<Security />} />
          <Route path="danger" element={<DangerOrg />} />
          <Route path="connections" element={<ComingSoon />} />
        </Route>

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
        <Route
          path="/:slug/:project_slug"
          element={
            <ProtectedRoute>
              <ProjectLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<OverviewPage />} />
          <Route path="board" element={<Dashboard />} />
          <Route path="tickets" element={<TicketsTablePage />} />
          <Route path="epics" element={<EpicsPage />} />
          <Route path="integrations" element={<IntegrationsPage />} />
          <Route path="members" element={<MembersPage />} />
          <Route path="settings" element={<ProjectSettings />}>
            <Route index element={<GeneralSetting />} />
            <Route path="workflow" element={<WorkflowSettings />} />
            <Route path="labels" element={<LabelsSetting />} />
            <Route path="danger" element={<Danger />} />
          </Route>
          <Route path="activity" element={<ComingSoonV2 />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
