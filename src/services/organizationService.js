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
