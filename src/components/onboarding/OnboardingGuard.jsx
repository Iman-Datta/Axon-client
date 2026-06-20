import { Navigate } from "react-router-dom";

import { useOnboarding } from "../../hooks/useOnboarding";

function OnboardingGuard({ children }) {
  const { status, loading } = useOnboarding();

  if (loading) {
    return null;
  }

  if (!status.identity.status) {
    return <Navigate to="/onboarding" replace />;
  }

  if (!status.profile.status) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}

export default OnboardingGuard;
