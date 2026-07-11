import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function OnboardingGuard({ children }) {
  const user = useSelector((state) => state.auth.user);
  if (!user) {
    return null;
  }

  const onboardingCompleted =
    user.is_profile_completed && user.is_username_set && user.is_email_verified;

  if (!onboardingCompleted) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}

export default OnboardingGuard;
