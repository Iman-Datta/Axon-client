import { useCallback, useEffect, useState } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchWithAuth } from "../../utils/fetchWithAuth";
import Header from "../../components/project/Header";
import ProjectStatsCard from "../../components/project/overview/ProjectStatsCard";
import ProjectOverviewFeed from "../../components/project/overview/ProjectOverviewFeed";

const INITIAL_STATE = {
  project_details: null,
  metrics: {},
  ticket_overview: {},
  assignedTickets: [],
  members: [],
};

function OverviewPage() {
  const API = import.meta.env.VITE_API_URL;
  const { slug, project_slug } = useParams();
  const { project: outletProject } = useOutletContext() || {};

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [data, setData] = useState(INITIAL_STATE);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  const loadOverview = useCallback(
    async (signal) => {
      setStatus("loading");
      setError("");

      try {
        const response = await fetchWithAuth(
          `${API}/projects/${slug}/${project_slug}/overview/`,
          { signal },
          dispatch,
          accessToken,
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(
            responseData.message ||
              `Failed to load project overview (status ${response.status}).`,
          );
        }

        if (signal?.aborted) return;

        setData({
          project_details: responseData.project_details || null,
          metrics: responseData.metrics || {},
          ticket_overview: responseData.ticket_overview || {},
          assignedTickets: Array.isArray(responseData.assigned_tickets)
            ? responseData.assigned_tickets
            : [],
          members: Array.isArray(responseData.members)
            ? responseData.members
            : [],
        });
        setStatus("ready");
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(
          err.message ||
            "Something went wrong while loading this project overview.",
        );
        setStatus("error");
      }
    },
    [API, slug, project_slug, dispatch, accessToken],
  );

  useEffect(() => {
    const controller = new AbortController();
    loadOverview(controller.signal);
    return () => controller.abort();
  }, [loadOverview]);

  if (status === "loading" && !outletProject && !data.project_details) {
    return <OverviewSkeleton />;
  }

  if (status === "error") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#0d1117] px-6 text-center">
        <p className="text-sm font-medium text-red-400">{error}</p>
        <button
          type="button"
          onClick={() => loadOverview()}
          className="rounded-lg border border-[#30363d] bg-[#21262d] px-4 py-2 text-xs font-semibold text-[#c9d1d9] transition-colors hover:bg-[#30363d]"
        >
          Try again
        </button>
      </div>
    );
  }

  const {
    project_details,
    metrics,
    ticket_overview,
    assignedTickets,
    members,
  } = data;

  // Fallback to outlet context project if backend details are loading/missing
  const activeProject = project_details || outletProject;

  return (
    <div className="min-h-screen bg-[#0d1117] pt-16">
      {activeProject && <Header project={activeProject} />}

      <div className="mx-auto max-w-7xl px-6 pt-8 pb-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <ProjectOverviewFeed assignedTickets={assignedTickets} />
          </div>

          <div className="lg:col-span-4">
            <ProjectStatsCard
              metrics={metrics}
              ticketOverview={ticket_overview}
              members={members}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function OverviewSkeleton() {
  return (
    <div className="min-h-screen animate-pulse bg-[#0d1117] px-6 pb-16 pt-8">
      <div className="mx-auto max-w-7xl">
        <div className="h-24 rounded-2xl border border-[#30363d] bg-[#161b22]" />
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="h-96 rounded-2xl border border-[#30363d] bg-[#161b22] lg:col-span-8" />
          <div className="h-96 rounded-2xl border border-[#30363d] bg-[#161b22] lg:col-span-4" />
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;
