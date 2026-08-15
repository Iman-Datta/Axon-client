import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AlertTriangle } from "lucide-react";
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import OrganizationLayout from "../../components/layout/OrganizationLayout";
import MetricCards from "../../components/organization/MetricCards";
import TicketOverviewPanel from "../../components/organization/TicketOverviewPanel";
import RecentActivityPanel from "../../components/organization/RecentActivityPanel";
import ProjectsTableSection from "../../components/organization/ProjectsTableSection";

const API = import.meta.env.VITE_API_URL;

function OrganizationDetailsPage() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const organization = useSelector((state) => state.workspace.currentWorkspace);

  const [overviewData, setOverviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchOverview = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetchWithAuth(
          `${API}/org/${slug}/overview/`,
          {},
          dispatch,
          accessToken,
        );
        if (!res.ok) throw new Error("Failed to fetch organization overview.");
        const data = await res.json();
        if (isMounted) setOverviewData(data);
      } catch (err) {
        if (isMounted) setError(err.message || "Something went wrong.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchOverview();
    return () => {
      isMounted = false;
    };
  }, [slug, dispatch, accessToken]);

  if (loading) {
    return (
      <OrganizationLayout organization={organization}>
        <div className="flex flex-col items-center justify-center gap-3 py-20">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#30363d] border-t-[#58a6ff]" />
          <p className="text-sm text-[#8b949e]">Loading overview...</p>
        </div>
      </OrganizationLayout>
    );
  }

  if (error) {
    return (
      <OrganizationLayout organization={organization}>
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-red-500/20 bg-red-500/5 py-20 text-center">
          <AlertTriangle size={20} className="text-red-400" />
          <p className="text-sm font-medium text-red-400">{error}</p>
        </div>
      </OrganizationLayout>
    );
  }

  const {
    metrics = {},
    ticket_overview = {},
    recent_activity = [],
    projects = [],
  } = overviewData || {};

  return (
    <OrganizationLayout organization={organization}>
      <div className="space-y-6">
        <div>
          <h2 className="text-base font-semibold text-[#f0f6fc]">Overview</h2>
          <p className="mt-0.5 text-xs text-[#8b949e]">
            A quick look at what's happening across {organization?.name || slug}
            .
          </p>
        </div>

        <MetricCards metrics={metrics} />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <TicketOverviewPanel stats={ticket_overview} />
          <RecentActivityPanel activity={recent_activity} />
        </div>

        <ProjectsTableSection projects={projects} orgSlug={slug} />
      </div>
    </OrganizationLayout>
  );
}

export default OrganizationDetailsPage;
