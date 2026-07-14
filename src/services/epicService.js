import { fetchWithAuth } from "../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;

export const getMyEpics = async (
  workspaceSlug,
  projectSlug,
  dispatch,
  accessToken,
) => {
  const res = await fetchWithAuth(
    `${API}/tickets/${workspaceSlug}/${projectSlug}/epics`,
    {},
    dispatch,
    accessToken,
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error("Failed to fetch Epics.");
  }

  return { epics: data.epics, count: data.count };
};
