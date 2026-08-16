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

  return { epics: data.epics, count: data.count, can_edit: data.can_edit };
};

export const createEpic = async (
  workspaceSlug,
  projectSlug,
  data,
  dispatch,
  accessToken,
) => {
  const res = await fetchWithAuth(
    `${API}/tickets/${workspaceSlug}/${projectSlug}/epics/create/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
    dispatch,
    accessToken,
  );

  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.message || "Failed to create epic.");
  }

  return responseData;
};

export const updateEpic = async (
  workspaceSlug,
  projectSlug,
  epic_id,
  data,
  dispatch,
  accessToken,
) => {
  const res = await fetchWithAuth(
    `${API}/tickets/${workspaceSlug}/${projectSlug}/epic/${epic_id}/update/`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
    dispatch,
    accessToken,
  );

  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.message || "Failed to update epic.");
  }

  return responseData;
};

export const deleteEpic = async (
  workspaceSlug,
  projectSlug,
  epic_id,
  dispatch,
  accessToken,
) => {
  const res = await fetchWithAuth(
    `${API}/tickets/${workspaceSlug}/${projectSlug}/epic/${epic_id}/delete/`,
    {
      method: "DELETE",
    },
    dispatch,
    accessToken,
  );

  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.message || "Failed to delete epic.");
  }

  return responseData;
};
