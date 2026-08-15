import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  FolderGit2,
  Users,
  CheckSquare,
  CheckCircle2,
  Layers,
  Clock,
  ArrowUpRight,
  AlertTriangle,
} from "lucide-react";
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import OrganizationLayout from "../../components/layout/OrganizationLayout";

const API = import.meta.env.VITE_API_URL;

function OrganizationOverviewPage() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const organization = useSelector((state) => state.workspace.currentWorkspace);
  const navigate = useNavigate();

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
        if (!res.ok)
          throw new Error("Failed to fetch organization overview data.");
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
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#30363d] border-t-sky-400" />
          <p className="text-sm text-slate-400">
            Loading organization overview...
          </p>
        </div>
      </OrganizationLayout>
    );
  }

  if (error) {
    return (
      <OrganizationLayout organization={organization}>
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/5 py-20 text-center">
          <AlertTriangle size={20} className="text-rose-400" />
          <p className="text-sm font-medium text-rose-400">{error}</p>
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
      <div className="space-y-8">
        {/* Section Intro Description */}
        <div>
          <h2 className="text-base font-semibold text-slate-100">Overview</h2>
          <p className="mt-0.5 text-xs text-slate-400">
            A quick look at what's happening across {organization?.name || slug}
            .
          </p>
        </div>

        {/* Top Metric Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-4 text-center shadow-sm">
            <div className="text-xs font-medium text-slate-400 flex items-center justify-center gap-1.5">
              <FolderGit2 size={13} className="text-sky-400" /> Projects
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-100">
              {metrics.projects || 0}
            </div>
          </div>

          <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-4 text-center shadow-sm">
            <div className="text-xs font-medium text-slate-400 flex items-center justify-center gap-1.5">
              <Users size={13} className="text-amber-400" /> Members
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-100">
              {metrics.members || 0}
            </div>
          </div>

          <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-4 text-center shadow-sm">
            <div className="text-xs font-medium text-slate-400 flex items-center justify-center gap-1.5">
              <CheckSquare size={13} className="text-indigo-400" /> Tickets
            </div>
            <div className="mt-2 text-2xl font-bold text-slate-100">
              {metrics.tickets || 0}
            </div>
          </div>

          <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-4 text-center shadow-sm">
            <div className="text-xs font-medium text-slate-400 flex items-center justify-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-400" /> Completed
            </div>
            <div className="mt-2 text-2xl font-bold text-emerald-400">
              {metrics.completed || 0}
            </div>
          </div>
        </div>

        {/* Two Columns Grid: Ticket Overview & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ticket Overview Panel */}
          <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#21262d] pb-3">
              <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                <Layers size={15} className="text-sky-400" /> Ticket Overview
              </h3>
            </div>

            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-slate-400" /> Todo
                </span>
                <span className="font-semibold text-slate-200">
                  {ticket_overview.todo || 0}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-sky-400" />{" "}
                  Development
                </span>
                <span className="font-semibold text-slate-200">
                  {ticket_overview.development || 0}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-amber-400" /> Review
                </span>
                <span className="font-semibold text-slate-200">
                  {ticket_overview.review || 0}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" /> Done
                </span>
                <span className="font-semibold text-slate-200">
                  {ticket_overview.done || 0}
                </span>
              </div>
            </div>
          </div>

          {/* Recent Activity Panel */}
          <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#21262d] pb-3">
              <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                <Clock size={15} className="text-amber-400" /> Recent Activity
              </h3>
            </div>

            {recent_activity.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500 italic">
                Activity feed coming soon...
              </div>
            ) : (
              <div className="space-y-3 pt-1">
                {/* Activity list mapping goes here */}
              </div>
            )}
          </div>
        </div>

        {/* Projects Listing Table Section */}
        <div className="rounded-xl border border-[#30363d] bg-[#161b22] overflow-hidden shadow-sm">
          <div className="flex items-center justify-between border-b border-[#21262d] bg-[#0d1117]/60 px-5 py-3">
            <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              <FolderGit2 size={15} className="text-sky-400" /> Projects
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              {projects.length} Total
            </span>
          </div>

          {projects.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              No projects found in this organization.
            </div>
          ) : (
            <div className="divide-y divide-[#21262d]">
              {projects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => navigate(`/${slug}/${project.slug}`)}
                  className="group flex items-center justify-between px-5 py-3.5 transition-colors hover:bg-[#0d1117]/50 cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-semibold text-sm text-slate-200 group-hover:text-sky-400 transition-colors truncate">
                      {project.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-6 text-xs text-slate-400">
                    <span className="hidden sm:inline-block font-mono">
                      {project.ticket_count} tickets
                    </span>
                    <span className="hidden sm:inline-block font-mono">
                      {project.member_count} members
                    </span>
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium border ${
                        project.is_archived
                          ? "border-slate-500/20 bg-slate-500/10 text-slate-400"
                          : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                      }`}
                    >
                      {project.is_archived ? "Archived" : "Active"}
                    </span>
                    <ArrowUpRight
                      size={14}
                      className="text-slate-500 group-hover:text-white transition-colors"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </OrganizationLayout>
  );
}

export default OrganizationOverviewPage;
