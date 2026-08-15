import { useEffect, useState, useCallback } from "react";
import { Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import ProjectSidebar from "../project/Sidebar/ProjectSidebar";

function ProjectLayout() {
  const API = import.meta.env.VITE_API_URL;
  const { slug, project_slug } = useParams();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProjectDetails = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetchWithAuth(
        `${API}/projects/${slug}/${project_slug}/`,
        {},
        dispatch,
        accessToken,
      );
      if (!res.ok) throw new Error("Failed to load project details.");
      const data = await res.json();
      setProject(data.project ?? data);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, [API, slug, project_slug, dispatch, accessToken]);

  useEffect(() => {
    fetchProjectDetails();
  }, [fetchProjectDetails]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0d1117] text-sm text-[#8b949e]">
        Loading workspace...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0d1117] text-sm text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#0d1117]">
      <ProjectSidebar project={project} />
      <main className="flex-1 overflow-y-auto">
        <Outlet
          context={{ project, setProject, refetchProject: fetchProjectDetails }}
        />
      </main>
    </div>
  );
}

export default ProjectLayout;
