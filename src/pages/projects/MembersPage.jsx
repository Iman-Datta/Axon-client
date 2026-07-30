import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { listMember } from "../../services/projectService";
import EmptyState from "../../components/shared/resource/EmptyState";
import MembersTable from "../../components/project/members/MembersTable";
import MemberToolbar from "../../components/project/members/MemberToolbar";

function MembersPage() {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const { slug, project_slug } = useParams();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    async function loadMembers() {
      try {
        const members = await listMember(
          slug,
          project_slug,
          dispatch,
          accessToken,
        );
        setMembers(members);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    loadMembers();
  }, [slug, project_slug, dispatch, accessToken]);

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
    <div className="mt-18">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#e6edf3]">Project Members</h1>

          <p className="mt-2 text-[#8b949e]">
            Manage your project members and permissions.
          </p>
        </div>
      </div>

      <MemberToolbar
        search={search}
        setSearch={setSearch}
        onAddMember={() => {
          // Open Invite Member Modal
        }}
      />

      <div className="mt-3">
        <MembersTable members={filteredMembers} />
      </div>
    </div>
  );
}

export default MembersPage;
