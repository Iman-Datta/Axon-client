import { useSelector } from "react-redux";

import useOrganizations from "../../hooks/useOrganizations";

import ProfileLayout from "../../components/shared/ProfileLayout";

import OrganizationList from "../../components/organization/OrganizationList";
import EmptyOrganizations from "../../components/organization/EmptyOrganizations";
import OrganizationSkeleton from "../../components/organization/OrganizationSkeleton";
import NewOrganizationButton from "../../components/organization/NewOrganizationButton";

function OrganizationsPage() {
  const { organizations, loading, error } = useOrganizations();

  const profile = useSelector((state) => state.auth.user);

  if (loading) {
    return (
      <ProfileLayout user={profile}>
        <OrganizationSkeleton />
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
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold text-[#e6edf3]">Organizations</h1>

          <p className="mt-2 text-[#8b949e]">
            Manage your organizations and teams.
          </p>
        </div>

        <NewOrganizationButton />
      </div>

      {organizations.length === 0 ? (
        <EmptyOrganizations />
      ) : (
        <OrganizationList organizations={organizations} />
      )}
    </ProfileLayout>
  );
}

export default OrganizationsPage;
