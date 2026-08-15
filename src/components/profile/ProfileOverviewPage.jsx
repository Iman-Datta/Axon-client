import { useSelector } from "react-redux";
import { useProfileOverview } from "../../hooks/useProfileOverview";
import AssignedTicketsCard from "./overview/AssignedTicketsCard";
import ActivityStreamCard from "./overview/ActivityStreamCard";
import OrganizationsCard from "./overview/OrganizationsCard";
import ProductivityOverviewCard from "./overview/ProductivityOverviewCard";
import LoadingState from "./overview/LoadingState";
import ErrorState from "./overview/ErrorState";

function ProfileOverviewPage() {
  const currentUser = useSelector((state) => state.auth.user);
  const { overviewData, loading, error } = useProfileOverview();

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} />;

  const {
    assigned_tickets = [],
    organizations = [],
    metrics = {},
  } = overviewData || {};
  const username = currentUser?.username || "user";

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="space-y-6 lg:col-span-8">
        <AssignedTicketsCard tickets={assigned_tickets} username={username} />
        <ActivityStreamCard />
      </div>

      <div className="space-y-6 lg:col-span-4">
        <OrganizationsCard organizations={organizations} username={username} />
        <ProductivityOverviewCard
          metrics={metrics}
          tickets={assigned_tickets}
        />
      </div>
    </div>
  );
}

export default ProfileOverviewPage;
