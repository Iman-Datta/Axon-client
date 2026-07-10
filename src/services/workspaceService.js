import { fetchWithAuth } from "../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;

export const getWorkspaceType = async (slug, dispatch, accessToken) => {
  const response = await fetchWithAuth(
    `${API}/auth/workspaces/${slug}/`,
    {},
    dispatch,
    accessToken,
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Workspace not found.");
  }

  return data;
};
