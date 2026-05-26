import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,

  accessToken: null,

  loading: false,

  isAuthLoading: true,

  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {

    setUser: (state, action) => {
      state.user = {
        id: action.payload.id,

        username: action.payload.username,

        email: action.payload.email,

        first_name: action.payload.first_name,

        last_name: action.payload.last_name,

        avatar: action.payload.avatar,

        bio: action.payload.bio,

        is_email_verified: action.payload.is_email_verified,

        is_profile_completed: action.payload.is_profile_completed,

        google_id: action.payload.google_id,

        github_profile: action.payload.github_profile,

        linkedin_profile: action.payload.linkedin_profile,

        portfolio_website: action.payload.portfolio_website,

        created_at: action.payload.created_at,
      };

      state.isAuthenticated = true;

      state.loading = false;
    },
    
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setAuthLoading: (state, action) => {
      state.isAuthLoading = action.payload;
    },

    clearUser: (state) => {
      state.user = null;

      state.accessToken = null;

      state.loading = false;

      state.isAuthenticated = false;
    },
  },
});

export const {
  setUser,
  clearUser,
  setAccessToken,
  setAuthLoading,
  setLoading,
} = authSlice.actions;

export default authSlice.reducer;
