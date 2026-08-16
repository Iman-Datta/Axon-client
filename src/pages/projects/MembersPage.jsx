import { useCallback, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { listMember, addMember } from "../../services/projectService";
import EmptyState from "../../components/shared/resource/EmptyState";
import MembersTable from "../../components/project/members/MembersTable";
import AddMemberModal from "../../components/project/members/AddMemberModal";
import MembersHeader from "../../components/project/members/MembersHeader";

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

      setMembers(data.members);
      setCan_edit(data.can_edit);
      setError(null);
    } catch (error) {
      setError(error);
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
    } catch (error) {
      setAddMemberError(
        error.message || error.detail || error.error || "Failed to add member.",
      );
      return false;
    } finally {
      setAddingMember(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (members.length === 0) {
    return (
      <EmptyState
        title="No members found"
        description="Invite members to start collaborating."
      />
    );
  }

  if (error) {
    return (
      <div className="text-red-400">
        {error.message || "Something went wrong."}
      </div>
    );
  }

  const filteredMembers = members.filter((member) => {
    const query = search.toLowerCase();

    return (
      member.first_name.toLowerCase().includes(query) ||
      member.last_name.toLowerCase().includes(query) ||
      member.username.toLowerCase().includes(query) ||
      member.github_username?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="mt-21 px-2">
      <MembersHeader
        count={members.length}
        can_edit={can_edit}
        search={search}
        setSearch={setSearch}
        onAddMember={() => setInviteOpen(true)}
      />

      <MembersTable members={filteredMembers} can_edit={can_edit} />

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
