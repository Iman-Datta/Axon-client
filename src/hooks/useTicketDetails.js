import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchWithAuth } from "../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;

function useTicketDetail(workspaceSlug, projectSlug, ticketId) {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTicket = useCallback(async () => {
    if (!ticketId) {
      setTicket(null);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetchWithAuth(
        `${API}/tickets/${workspaceSlug}/${projectSlug}/${ticketId}`,
        {},
        dispatch,
        accessToken,
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to load ticket details.");
      }

      setTicket(data.ticket);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [workspaceSlug, projectSlug, ticketId, accessToken, dispatch]);

  useEffect(() => {
    fetchTicket();
  }, [fetchTicket]);

  return { ticket, loading, error, refetch: fetchTicket };
}

export default useTicketDetail;
