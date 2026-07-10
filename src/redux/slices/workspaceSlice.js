import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentWorkspace: null,
  workspaceCache: {},
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,

  reducers: {
    setCurrentWorkspace: (state, action) => {
      state.currentWorkspace = action.payload;

      if (action.payload?.slug) {
        state.workspaceCache[action.payload.slug] = {
          ...state.workspaceCache[action.payload.slug],
          ...action.payload,
        };
      }
    },

    cacheWorkspace: (state, action) => {
      const workspace = action.payload;

      if (workspace?.slug) {
        state.workspaceCache[workspace.slug] = {
          ...state.workspaceCache[workspace.slug],
          ...workspace,
        };
      }
    },

    clearCurrentWorkspace: (state) => {
      state.currentWorkspace = null;
    },

    clearWorkspaceState: (state) => {
      state.currentWorkspace = null;
      state.workspaceCache = {};
    },
  },
});

export const {
  setCurrentWorkspace,
  cacheWorkspace,
  clearCurrentWorkspace,
  clearWorkspaceState,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
