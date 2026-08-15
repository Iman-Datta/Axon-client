import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { UserPlus, X, AlertTriangle, Loader2 } from "lucide-react";
import OrganizationLayout from "../../components/layout/OrganizationLayout";
import { useOrganizationMembers } from "../../hooks/useOrganizationMembers";
import MembersTable from "../../components/organization/members/MembersTable";
import MemberSkeleton from "../../components/organization/members/MemberSkeleton";
import EmptyState from "../../components/shared/resource/EmptyState";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

function OrganizationMembersPage() {
  const API = import.meta.env.VITE_API_URL;
  const { slug } = useParams();
  const { members, loading, error, refetch } = useOrganizationMembers();
  const organization = useSelector((state) => state.workspace.currentWorkspace);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [selectedRole, setSelectedRole] = useState("MEMBER");
  const [submitting, setSubmitting] = useState(false);
  const [modalError, setModalError] = useState("");

  const handleAddMember = async (e) => {
    e.preventDefault();
    if (!usernameInput.trim()) return;

    try {
      setSubmitting(true);
      setModalError("");

      const response = await fetchWithAuth(
        `${API}/org/${slug}/members/add/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: usernameInput.trim(),
            role: selectedRole,
          }),
        },
        dispatch,
        accessToken,
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add member.");
      }

      setIsModalOpen(false);
      setUsernameInput("");
      setSelectedRole("MEMBER");
      if (refetch) refetch();
    } catch (err) {
      setModalError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

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
        <div className="text-red-500 text-sm">{error}</div>
      </OrganizationLayout>
    );
  }

  return (
    <OrganizationLayout organization={organization}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#e6edf3]">
            Organization Members
          </h1>
          <p className="mt-1 text-xs text-[#8b949e]">
            Manage your organization members and permissions.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-[#238636] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#2ea043]"
        >
          <UserPlus size={14} /> Add Member
        </button>
      </div>

      {members.length === 0 ? (
        <EmptyState
          title="No members found"
          description="Invite members to start collaborating."
        />
      ) : (
        <MembersTable members={members} orgSlug={slug} refetch={refetch} />
      )}

      {/* Add Member Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl border border-[#30363d] bg-[#161b22] p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#21262d] pb-3">
              <h3 className="text-base font-semibold text-[#e6edf3]">
                Add New Member
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-[#8b949e] hover:text-[#f0f6fc]"
              >
                <X size={18} />
              </button>
            </div>

            {modalError && (
              <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
                <AlertTriangle size={15} className="shrink-0" />
                <span>{modalError}</span>
              </div>
            )}

            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#c9d1d9] mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter exact username (e.g. iman2)"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  required
                  className="w-full rounded-lg border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm text-[#f0f6fc] placeholder-[#6e7681] focus:border-[#58a6ff] focus:outline-none"
                />
                <p className="mt-1 text-[11px] text-[#8b949e]">
                  Type the exact global username of the user you want to add.
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#c9d1d9] mb-1.5">
                  Role Permission
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full rounded-lg border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm text-[#f0f6fc] focus:border-[#58a6ff] focus:outline-none"
                >
                  <option value="MEMBER">Member</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#21262d]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-[#30363d] bg-[#21262d] px-4 py-2 text-xs font-semibold text-[#c9d1d9] hover:bg-[#30363d]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#238636] px-4 py-2 text-xs font-semibold text-white hover:bg-[#2ea043] disabled:opacity-50"
                >
                  {submitting && <Loader2 size={13} className="animate-spin" />}
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </OrganizationLayout>
  );
}

export default OrganizationMembersPage;
