import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { listMember, addMember } from "../../services/projectService";
import EmptyState from "../../components/shared/resource/EmptyState";
import MembersTable from "../../components/project/members/MembersTable";
import AddMemberModal from "../../components/project/members/AddMemberModal";
import MembersHeader from "../../components/project/members/MembersHeader";

// Skeleton table loader matching MembersTable UI layout
function MembersTableSkeleton() {
  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-[#30363d] bg-[#161b22]">
      {/* Table Header Skeleton */}
      <div className="flex items-center justify-between border-b border-[#21262d] bg-[#0d1117] px-6 py-3.5">
        <div className="h-4 w-24 animate-pulse rounded bg-[#21262d]" />
        <div className="h-4 w-32 animate-pulse rounded bg-[#21262d]" />
        <div className="h-4 w-20 animate-pulse rounded bg-[#21262d]" />
        <div className="h-4 w-16 animate-pulse rounded bg-[#21262d]" />
      </div>

      {/* Table Rows Skeleton */}
      <div className="divide-y divide-[#21262d]">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="flex items-center justify-between px-6 py-4"
          >
            {/* User Info (Avatar + Name) */}
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 animate-pulse rounded-full bg-[#21262d]" />
              <div className="space-y-1.5">
                <div className="h-4 w-32 animate-pulse rounded bg-[#21262d]" />
                <div className="h-3 w-20 animate-pulse rounded bg-[#21262d]" />
              </div>
            </div>

            {/* Email / Username */}
            <div className="h-4 w-36 animate-pulse rounded bg-[#21262d]" />

            {/* Role Badge */}
            <div className="h-6 w-20 animate-pulse rounded-full bg-[#21262d]" />

            {/* Actions */}
            <div className="h-8 w-8 animate-pulse rounded-lg bg-[#21262d]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function MembersPage() {
  const [members, setMembers] = useState([]);
  const [can_edit, setCan_edit] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [inviteOpen, setInviteOpen] = useState(false);
  const [addingMember, setAddingMember] = useState(false);
  const [addMemberError, setAddMemberError] = useState("");

  const { slug, project_slug } = useParams();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const loadMembers = useCallback(async () => {
    try {
      const data = await listMember(slug, project_slug, dispatch, accessToken);

      setMembers(data.members || []);
      setCan_edit(data.can_edit || false);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [slug, project_slug, dispatch, accessToken]);

  useEffect(() => {
    loadMembers();
  }, [loadMembers]);

  const handleCreateMember = async (formData) => {
    try {
      setAddMemberError("");
      setAddingMember(true);

      await addMember(slug, project_slug, formData, dispatch, accessToken);

      await loadMembers();

      setInviteOpen(false);
      return true;
    } catch (err) {
      setAddMemberError(
        err.message || err.detail || err.error || "Failed to add member.",
      );
      return false;
    } finally {
      setAddingMember(false);
    }
  };

  const filteredMembers = members.filter((member) => {
    const query = search.toLowerCase();

    const firstName = member.first_name || "";
    const lastName = member.last_name || "";
    const username = member.username || "";
    const githubUsername = member.github_username || "";

    return (
      firstName.toLowerCase().includes(query) ||
      lastName.toLowerCase().includes(query) ||
      username.toLowerCase().includes(query) ||
      githubUsername.toLowerCase().includes(query)
    );
  });

  if (error) {
    return (
      <div className="mt-21 px-2 text-sm font-medium text-red-400">
        {error.message || "Something went wrong."}
      </div>
    );
  }

  return (
    <div className="mt-21 px-2">
      <MembersHeader
        count={loading ? 0 : members.length}
        can_edit={can_edit}
        search={search}
        setSearch={setSearch}
        onAddMember={() => setInviteOpen(true)}
      />

      {loading ? (
        <MembersTableSkeleton />
      ) : members.length === 0 ? (
        <div className="mt-6">
          <EmptyState
            title="No members found"
            description="Invite members to start collaborating."
          />
        </div>
      ) : (
        <MembersTable
          members={filteredMembers}
          can_edit={can_edit}
          refetch={loadMembers}
        />
      )}

      <AddMemberModal
        open={inviteOpen}
        loading={addingMember}
        error={addMemberError}
        onClose={() => {
          setInviteOpen(false);
          setAddMemberError("");
        }}
        onAdd={handleCreateMember}
      />
    </div>
  );
}

export default MembersPage;
