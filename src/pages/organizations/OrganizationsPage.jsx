import useOrganizations from "../../hooks/useOrganizations";

import ProfileHeader from "../../components/profile/ProfileHeader";

import Sidebar from "../../components/shared/sidebar/Sidebar";
import { sidebarItems } from "../../components/shared/sidebar/sidebarData";

import OrganizationList from "../../components/organization/OrganizationList";
import EmptyOrganizations from "../../components/organization/EmptyOrganizations";
import OrganizationSkeleton from "../../components/organization/OrganizationSkeleton";

import { useSelector } from "react-redux";

function OrganizationsPage() {
  const { organizations, loading, error } = useOrganizations();

  const profile = useSelector((state) => state.auth.user);

  if (loading) {
    return <OrganizationSkeleton />;
  }

  if (error) {
    return <div className="text-red-500 p-6">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 pt-20">
      {/* Profile Header */}
      <ProfileHeader user={profile} />

      {/* Sidebar + Content */}
      <div className="flex gap-10 mt-8">
        {/* Left Side */}
        <Sidebar title="Workspace" items={sidebarItems} />

        {/* Right Side */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Organizations</h1>

          <p className="text-gray-400 mt-2 mb-8">
            Manage your organizations and teams.
          </p>

          {organizations.length === 0 ? (
            <EmptyOrganizations />
          ) : (
            <OrganizationList organizations={organizations} />
          )}
        </div>
      </div>
    </div>
  );
}

export default OrganizationsPage;