import { fetchWithAuth } from "../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;

export const getMyProjects = async (workspaceSlug, dispatch, accessToken) => {
  const response = await fetchWithAuth(
    `${API}/projects/${workspaceSlug}/my/`,
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
    `${API}/projects/${workspaceSlug}/create/`,
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

export const listMember = async (slug, project_slug, dispatch, accessToken) => {
  const response = await fetchWithAuth(
    `${API}/projects/${slug}/${project_slug}/members/`,
    {},
    dispatch,
    accessToken,
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch project members.");
  }

  return data.members;
};

export const addMember = async (
  slug,
  project_slug,
  memberData,
  dispatch,
  accessToken,
) => {
  const response = await fetchWithAuth(
    `${API}/projects/${slug}/${project_slug}/member/add/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(memberData),
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

export const updateProject = async (
  slug,
  project_slug,
  projectData,
  dispatch,
  accessToken,
) => {
  const res = await fetchWithAuth(
    `${API}/projects/${slug}/${project_slug}/update`,
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

  const data = await res.json();

  if (!res.ok) {
    throw data;
  }

  return data;
};

export const leaveProject = async (
  slug,
  project_slug,
  dispatch,
  accessToken,
) => {
  const res = await fetchWithAuth(
    `${API}/projects/${slug}/${project_slug}/leave/`,
    {
      method: "DELETE",
    },
    dispatch,
    accessToken,
  );

  if (!res.ok) {
    const responseData = await res.json();
    throw new Error(responseData.message || "Failed to leave project.");
  }

  return res.status === 204 ? null : await res.json();
};
