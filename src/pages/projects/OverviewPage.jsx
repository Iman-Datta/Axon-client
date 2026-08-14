import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchWithAuth } from "../../utils/fetchWithAuth";
import Header from "../../components/settings/project/Header";

function OverviewPage() {
  const API = import.meta.env.VITE_API_URL;
  const { slug, project_slug } = useParams();

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        setLoading(true);

        const projectRes = await fetchWithAuth(
          `${API}/projects/${slug}/${project_slug}/`,
          {},
          dispatch,
          accessToken,
        );

        if (!projectRes.ok) {
          throw new Error("Failed to fetch project details.");
        }

        const projectData = await projectRes.json();
        setProject(projectData.project || projectData);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchOverviewData();
  }, [API, slug, project_slug, dispatch, accessToken]);

  if (loading) {
    return <div className="p-8 text-[#8b949e]">Loading overview...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-400">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#0d1117] pt-16">
      {project && <Header project={project} />}
    </div>
  );
}

export default OverviewPage;
