import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMyTickets } from "../services/ticketService";

function useTickets(workspaceSlug, projectSlug, filters = {}) {
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.auth.accessToken);

  const [tickets, setTickets] = useState([]);
  const [count, setCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const filtersKey = JSON.stringify(filters);

  const refetch = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyTickets(
        workspaceSlug,
        projectSlug,
        dispatch,
        accessToken,
        filters,
      );

      setTickets(data.tickets);
      setCount(data.count);
    } catch (error) {
      setError(error.message || "Failed to fetch tickets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!workspaceSlug || !projectSlug || !accessToken) {
      return;
    }

    const loadTickets = async () => {
      await refetch();
    };

    loadTickets();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceSlug, projectSlug, accessToken, filtersKey]);

  return {
    tickets,
    count,
    loading,
    error,
    refetch,
  };
}

export default useTickets;
