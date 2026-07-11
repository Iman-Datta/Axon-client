import { fetchWithAuth } from "../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;

export const getMyOrganizations = async (dispatch, accessToken) => {
  const response = await fetchWithAuth(
    `${API}/org/my/`,
    {
      method: "GET",
    },
    dispatch,
    accessToken,
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch organizations.");
  }

  return data.organizations;
};

export const createOrganization = async (data, dispatch, accessToken) => {
  const response = await fetchWithAuth(
    `${API}/org/create/`,
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

  const responseData = await response.json();

  if (!response.ok) {
    throw responseData;
  }

  return responseData;
};

export async function getOrganization(slug) {
  const response = await fetchWithAuth(`/org/${slug}/`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch organization.");
  }

  return data.organization;
}