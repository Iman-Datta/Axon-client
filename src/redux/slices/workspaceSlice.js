import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentWorkspace: null,
};

const workspaceSlice = createSlice({
  name: "workspace",
  initialState,
  reducers: {
    setCurrentWorkspace: (state, action) => {
      state.currentWorkspace = action.payload;
    },

    clearCurrentWorkspace: (state) => {
      state.currentWorkspace = null;
    },
  },
});

export const { setCurrentWorkspace, clearCurrentWorkspace } =
  workspaceSlice.actions;

export default workspaceSlice.reducer;
