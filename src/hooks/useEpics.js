import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMyEpics } from "../services/epicService";

function useEpics(workspaceSlug, projectSlug) {
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.auth.accessToken);

  const [epics, setEpics] = useState([]);
  const [count, setCount] = useState(0);
  const [can_edit, setCan_edit] = useState(false);
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
      setCan_edit(data.can_edit);
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
    can_edit,
    loading,
    error,
    refetch: fetchEpics,
  };
}

export default useEpics;
