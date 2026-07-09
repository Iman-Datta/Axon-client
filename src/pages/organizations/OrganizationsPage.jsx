import { useSelector } from "react-redux";

import useOrganizations from "../../hooks/useOrganizations";

import Sidebar from "../../components/shared/sidebar/Sidebar";
import { sidebarItems } from "../../components/shared/sidebar/sidebarData";

import OrganizationList from "../../components/organization/OrganizationList";
import EmptyOrganizations from "../../components/organization/EmptyOrganizations";
import OrganizationSkeleton from "../../components/organization/OrganizationSkeleton";
import NewOrganizationButton from "../../components/organization/NewOrganizationButton";

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
    <div className="max-w-7xl mx-auto px-6 pt-28">
      <div className="flex gap-10">
        {/* Left Side */}
        <Sidebar title="Workspace" items={sidebarItems} user={profile} />

        {/* Right Side */}
        <div className="flex-1">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold">Organizations</h1>

              <p className="text-gray-400 mt-2">
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
        </div>
      </div>
    </div>
  );
}

export default OrganizationsPage;
