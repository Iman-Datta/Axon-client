import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import workspaceReducer from "./slices/workspaceSlice";
import onboardingReducer from "./slices/onboardingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    workspace: workspaceReducer,
    onboarding: onboardingReducer,
  },
});
