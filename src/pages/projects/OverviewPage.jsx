import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchWithAuth } from "../../utils/fetchWithAuth";
import Header from "../../components/project/Header";
import ProjectStatsCard from "../../components/project/overview/ProjectStatsCard";
import ProjectOverviewFeed from "../../components/project/overview/ProjectOverviewFeed";

function OverviewPage() {
  const API = import.meta.env.VITE_API_URL;
  const { slug, project_slug } = useParams();

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [project, setProject] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [assignedTickets, setAssignedTickets] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOverviewData = async () => {
      setLoading(true);
      try {
        // 1. Fetch project meta
        const projectRes = await fetchWithAuth(
          `${API}/projects/${slug}/${project_slug}/`,
          {},
          dispatch,
          accessToken,
        );
        const projectData = await projectRes.json();
        setProject(projectData.project || projectData);

        // 2. Fetch all tickets for your stats card
        const ticketsRes = await fetchWithAuth(
          `${API}/tickets/${slug}/${project_slug}/`,
          {},
          dispatch,
          accessToken,
        );
        const ticketsData = await ticketsRes.json();
        setTickets(
          Array.isArray(ticketsData) ? ticketsData : ticketsData.tickets || [],
        );

        // 3. Fetch tickets assigned to the logged-in user using your new API endpoint!
        const assignedRes = await fetchWithAuth(
          `${API}/tickets/${slug}/${project_slug}/?assignee=me`,
          {},
          dispatch,
          accessToken,
        );
        const assignedData = await assignedRes.json();
        setAssignedTickets(
          Array.isArray(assignedData)
            ? assignedData
            : assignedData.tickets || [],
        );

        // 4. Fetch members for your contributors card
        const membersRes = await fetchWithAuth(
          `${API}/projects/${slug}/${project_slug}/members/`,
          {},
          dispatch,
          accessToken,
        );
        const membersData = await membersRes.json();
        setMembers(
          Array.isArray(membersData) ? membersData : membersData.members || [],
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOverviewData();
  }, [slug, project_slug, API, dispatch, accessToken]);

  if (loading) {
    return <div className="p-8 text-[#8b949e]">Loading workspace...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-400">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#0d1117] pb-16">
      {project && <Header project={project} />}

      <div className="mx-auto max-w-7xl px-6 pt-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* LEFT AREA (~67% width) -> Pass the fetched assignedTickets here */}
          <div className="lg:col-span-8">
            <ProjectOverviewFeed
              project={project}
              assignedTickets={assignedTickets}
            />
          </div>

          {/* RIGHT AREA (~33% width) -> Sidebar Stats Cards */}
          <div className="lg:col-span-4">
            <ProjectStatsCard tickets={tickets} members={members} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;
