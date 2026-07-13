import { useSelector } from "react-redux";

import OrganizationLayout from "../../components/organization/OrganizationLayout";

import { useOrganizationMembers } from "../../hooks/useOrganizationMembers";

import MembersTable from "../../components/organization/members/MembersTable";
import MemberSkeleton from "../../components/organization/members/MemberSkeleton";
import EmptyState from "../../components/shared/resource/EmptyState";

function OrganizationMembersPage() {
  const { members, loading, error } = useOrganizationMembers();

  const organization = useSelector((state) => state.workspace.currentWorkspace);
  if (loading) {
    return (
      <OrganizationLayout organization={organization}>
        <MemberSkeleton />
      </OrganizationLayout>
    );
  }

  if (error) {
    return (
      <OrganizationLayout organization={organization}>
        <div className="text-red-500">{error}</div>
      </OrganizationLayout>
    );
  }

  return (
    <OrganizationLayout organization={organization}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h1 className="text-4xl font-bold text-[#e6edf3]">
            Organization Members
          </h1>

          <p className="mt-2 text-[#8b949e]">
            Manage your organization members and permissions.
          </p>
        </div>
      </div>

      {members.length === 0 ? (
        <EmptyState
          title="No members found"
          description="Invite members to start collaborating."
        />
      ) : (
        <MembersTable members={members} />
      )}
    </OrganizationLayout>
  );
}

export default OrganizationMembersPage;
