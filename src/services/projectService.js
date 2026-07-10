import { fetchWithAuth } from "../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;
export const getMyProjects = async (workspaceSlug, dispatch, accessToken) => {
  console.log(`${API}/workspaces/${workspaceSlug}/projects/`);
  const response = await fetchWithAuth(
    `${API}/projects/workspaces/${workspaceSlug}/`,
    {},
    dispatch,
    accessToken,
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch projects.");
  }

  return data.projects;
};

export const createProject = async (
  workspaceSlug,
  projectData,
  dispatch,
  accessToken,
) => {
  const response = await fetchWithAuth(
    `${API}/projects/workspaces/${workspaceSlug}/create/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectData),
    },
    dispatch,
    accessToken,
  );

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
};
