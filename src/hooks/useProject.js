import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProject } from "../services/projectService";

const useProject = (workspaceSlug, projectSlug) => {
  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.auth.accessToken);

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProject = useCallback(async () => {
    if (!workspaceSlug || !projectSlug) return;

    try {
      setLoading(true);
      setError(null);

      const data = await getProject(
        workspaceSlug,
        projectSlug,
        dispatch,
        accessToken,
      );

      setProject(data);
    } catch (err) {
      setError(err.message || "Failed to load project.");
    } finally {
      setLoading(false);
    }
  }, [workspaceSlug, projectSlug, dispatch, accessToken]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  return {
    project,
    loading,
    error,
    refetch: fetchProject,
    setProject, // Optional, useful for optimistic updates
  };
};

export default useProject;
