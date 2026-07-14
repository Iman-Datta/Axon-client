import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMyEpics } from "../services/epicService";

function useEpics(workspaceSlug, projectSlug) {
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.auth.accessToken);

  const [epics, setEpics] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEpics = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getMyEpics(
        workspaceSlug,
        projectSlug,
        dispatch,
        accessToken,
      );

      setEpics(data.epics);
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
      await fetchEpics();
    };

    loadEpics();
  }, [workspaceSlug, projectSlug]);

  return {
    epics,
    count,
    loading,
    error,
    refetch: fetchEpics,
  };
}

export default useEpics;
