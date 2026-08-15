import { useSelector } from "react-redux";

import useOrganizations from "../../hooks/useOrganizations";

import ProfileLayout from "../../components/layout/ProfileLayout";

import ResourceList from "../../components/shared/resource/ResourceList";
import EmptyState from "../../components/shared/resource/EmptyState";
import ResourceSkeleton from "../../components/shared/resource/ResourceSkeleton";
import OrganizationListHeader from "../../components/organization/OrganizationListHeader";

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
      <div className="space-y-8">
        <OrganizationListHeader count={organizations.length} />

        {organizations.length === 0 ? (
          <EmptyState
            title="No organizations found"
            description="Create an organization or accept an invitation to get started."
          />
        ) : (
          <ResourceList resources={organizations} type="organization" />
        )}
      </div>
    </ProfileLayout>
  );
}

export default OrganizationsPage;
