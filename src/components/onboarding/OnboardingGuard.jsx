import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function OnboardingGuard({ children }) {
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return null;
  }

  if (!user.is_profile_completed) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}

export default OnboardingGuard;