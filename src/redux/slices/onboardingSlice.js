import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: null,
  loaded: false,
};

const onboardingSlice = createSlice({
  name: "onboarding",
  initialState,
  reducers: {
    setOnboardingStatus(state, action) {
      state.status = action.payload;
      state.loaded = true;
    },

    clearOnboardingStatus(state) {
      state.status = null;
      state.loaded = false;
    },
  },
});

export const { setOnboardingStatus, clearOnboardingStatus } =
  onboardingSlice.actions;

export default onboardingSlice.reducer;
