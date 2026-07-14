import { fetchWithAuth } from "../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;

export const getMyTickets = async (
  workspaceSlug,
  projectSlug,
  dispatch,
  accessToken,
) => {
  const res = await fetchWithAuth(
    `${API}/tickets/${workspaceSlug}/${projectSlug}/`,
    {},
    dispatch,
    accessToken,
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch tickets.");
  }

  return data;
};

export const createTicket = async (
  workspaceSlug,
  projectSlug,
  ticketData,
  dispatch,
  accessToken,
) => {
  const res = await fetchWithAuth(
    `${API}/tickets/${workspaceSlug}/${projectSlug}/create/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticketData),
    },
    dispatch,
    accessToken,
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to create ticket.");
  }

  return data;
};
