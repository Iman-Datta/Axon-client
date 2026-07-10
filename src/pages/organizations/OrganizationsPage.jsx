import { useSelector } from "react-redux";

import useOrganizations from "../../hooks/useOrganizations";

import ProfileLayout from "../../components/shared/ProfileLayout";

import ResourceList from "../../components/shared/resource/ResourceList";
import EmptyState from "../../components/shared/resource/EmptyState";
import ResourceSkeleton from "../../components/shared/resource/ResourceSkeleton";
import NewResourceButton from "../../components/shared/resource/NewResourceButton";

function OrganizationsPage() {
  const { organizations, loading, error } = useOrganizations();

  const profile = useSelector((state) => state.auth.user);

  if (loading) {
    return (
      <ProfileLayout user={profile}>
        <ResourceSkeleton />
      </ProfileLayout>
    );
  }

  if (error) {
    return (
      <ProfileLayout user={profile}>
        <div className="text-red-500">{error}</div>
      </ProfileLayout>
    );
  }

  return (
    <ProfileLayout user={profile}>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#e6edf3]">Organizations</h1>

          <p className="mt-2 text-[#8b949e]">
            Manage your organizations and teams.
          </p>
        </div>

        <NewResourceButton
          label="New organization"
          path="/organizations/create"
        />
      </div>

      {organizations.length === 0 ? (
        <EmptyState
          title="No organizations found"
          description="Create an organization or accept an invitation to get started."
        />
      ) : (
        <ResourceList
          resources={organizations}
          type="organization"
          actionText="Leave"
        />
      )}
    </ProfileLayout>
  );
}

export default OrganizationsPage;
