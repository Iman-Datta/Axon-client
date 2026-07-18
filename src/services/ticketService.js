import { fetchWithAuth } from "../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;

export const getMyTickets = async (
  workspaceSlug,
  projectSlug,
  dispatch,
  accessToken,
  filters = {},
) => {
  const query = new URLSearchParams(filters).toString();

  const url =
    `${API}/tickets/${workspaceSlug}/${projectSlug}/` +
    (query ? `?${query}` : "");

  const res = await fetchWithAuth(url, {}, dispatch, accessToken);

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

export const updateTicket = async (
  workspaceSlug,
  projectSlug,
  ticket_id,
  ticketData,
  dispatch,
  accessToken,
) => {
  const res = await fetchWithAuth(
    `${API}/tickets/${workspaceSlug}/${projectSlug}/${ticket_id}/update/`,
    {
      method: "PATCH",
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
    throw new Error(data.message || "Failed to update ticket.");
  }

  return data;
};
