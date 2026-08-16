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
  const { members, can_edit, loading, error, refetch } =
    useOrganizationMembers();
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
        <div className="text-sm text-red-400">{error}</div>
      </OrganizationLayout>
    );
  }

  return (
    <OrganizationLayout organization={organization}>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-[#f0f6fc]">Members</h2>
          <p className="mt-0.5 text-xs text-[#8b949e]">
            Manage who has access to this organization and what they can do.
          </p>
        </div>
        {can_edit && (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[#238636] px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[#2ea043]"
          >
            <UserPlus size={13} /> Add member
          </button>
        )}
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm space-y-4 rounded-xl border border-[#30363d] bg-[#161b22] p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#21262d] pb-3">
              <h3 className="text-sm font-semibold text-[#f0f6fc]">
                Add new member
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-[#8b949e] hover:text-[#f0f6fc]"
              >
                <X size={16} />
              </button>
            </div>

            {modalError && (
              <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/10 p-2.5 text-[11.5px] text-red-400">
                <AlertTriangle size={14} className="shrink-0" />
                <span>{modalError}</span>
              </div>
            )}

            <form onSubmit={handleAddMember} className="space-y-3.5">
              <div>
                <label className="mb-1.5 block text-[11px] font-medium text-[#c9d1d9]">
                  Username
                </label>
                <input
                  type="text"
                  placeholder="Enter exact username (e.g. iman2)"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  required
                  className="w-full rounded-lg border border-[#30363d] bg-[#0d1117] px-3 py-2 text-[13px] text-[#f0f6fc] placeholder-[#6e7681] focus:border-[#58a6ff] focus:outline-none"
                />
                <p className="mt-1 text-[10.5px] text-[#8b949e]">
                  Type the exact global username of the user you want to add.
                </p>
              </div>

              <div>
                <label className="mb-1.5 block text-[11px] font-medium text-[#c9d1d9]">
                  Role
                </label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full rounded-lg border border-[#30363d] bg-[#0d1117] px-3 py-2 text-[13px] text-[#f0f6fc] focus:border-[#58a6ff] focus:outline-none"
                >
                  <option value="MEMBER">Member</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-[#21262d] pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-[#30363d] bg-[#21262d] px-3.5 py-1.5 text-xs font-medium text-[#c9d1d9] hover:bg-[#30363d]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#238636] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#2ea043] disabled:opacity-50"
                >
                  {submitting && <Loader2 size={12} className="animate-spin" />}
                  Add member
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
