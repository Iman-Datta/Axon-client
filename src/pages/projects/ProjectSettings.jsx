import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchWithAuth } from "../../utils/fetchWithAuth";
import SettingsLayout from "../../components/layout/SettingsLayout";

function ProjectSettings() {
  const API = import.meta.env.VITE_API_URL;
  const { slug, project_slug } = useParams();

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);

        const res = await fetchWithAuth(
          `${API}/projects/${slug}/${project_slug}/`,
          {},
          dispatch,
          accessToken,
        );

        if (!res.ok) {
          throw new Error("Failed to fetch project.");
        }

        const data = await res.json();
        setProject(data.project);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [API, slug, project_slug, dispatch, accessToken]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <SettingsLayout
      title="Project Settings"
      description="Manage your project's configuration and preferences."
      type="project"
      context={{
        project,
        setProject,
      }}
    />
  );
}

export default ProjectSettings;
