import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMyTickets } from "../services/ticketService";

function useTickets(workspaceSlug, projectSlug) {
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.auth.accessToken);

  const [tickets, setTickets] = useState([]);
  const [count, setCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyTickets(
        workspaceSlug,
        projectSlug,
        dispatch,
        accessToken,
      );

      setTickets(data.tickets);
      setCount(data.count);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!workspaceSlug || !projectSlug) return;
    const loadEpics = async () => {
      fetchTickets();
    };
    loadEpics();
  }, [workspaceSlug, projectSlug]);

  return {
    tickets,
    count,
    loading,
    error,
    refetch: fetchTickets,
  };
}

export default useTickets;
