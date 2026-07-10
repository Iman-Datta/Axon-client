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
      state.user = action.payload;

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
