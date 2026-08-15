import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AlertTriangle, Loader2, X, Shield } from "lucide-react";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

function MemberRow({ member, orgSlug, refetch }) {
  const API = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const { slug: routeSlug } = useParams();
  const currentOrgSlug = orgSlug || routeSlug;

  const isOwner = member.role === "OWNER";
  const [loadingAction, setLoadingAction] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // States for Change Role Modal & Dropdown
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(member.role);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Handle Role Change PATCH Request
  const handleConfirmChangeRole = async () => {
    try {
      setLoadingAction(true);
      const response = await fetchWithAuth(
        `${API}/org/${currentOrgSlug}/members/${member.id}/role/`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role: selectedRole }),
        },
        dispatch,
        accessToken,
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || data.errors?.role?.[0] || "Failed to update role.",
        );
      }

      setIsRoleModalOpen(false);
      if (refetch) refetch();
    } catch (err) {
      alert(err.message || "Error updating member role.");
    } finally {
      setLoadingAction(false);
    }
  };

  // Handle Remove Member DELETE Request via Confirmation Modal
  const handleConfirmRemove = async () => {
    try {
      setLoadingAction(true);
      const response = await fetchWithAuth(
        `${API}/org/${currentOrgSlug}/members/${member.id}/remove/`,
        {
          method: "DELETE",
        },
        dispatch,
        accessToken,
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to remove member.");
      }

      setIsDeleteModalOpen(false);
      if (refetch) refetch();
    } catch (err) {
      alert(err.message || "Error removing member.");
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <>
      <div
        className={`grid grid-cols-[1fr_180px_140px_60px] items-center border-b border-[#21262d] px-6 py-5 transition-colors hover:bg-[#161b22] overflow-visible relative ${loadingAction ? "opacity-50 pointer-events-none" : ""}`}
      >
        {/* User */}
        <div className="flex items-center gap-4">
          <img
            src={member.avatar || "/default-avatar.png"}
            alt={member.username}
            className="h-12 w-12 rounded-full object-cover"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";
            }}
          />

          <div>
            <Link
              to={`/${member.username}`}
              className="text-lg font-medium text-[#58a6ff] hover:underline"
            >
              {member.github_username || member.username}
            </Link>

            <p className="text-[#8b949e]">@{member.username}</p>

            {member.bio && (
              <p className="mt-1 text-sm text-[#8b949e]">{member.bio}</p>
            )}
          </div>
        </div>

        {/* Membership */}
        <div>
          <span className="rounded-md border border-[#30363d] bg-[#161b22] px-3 py-1 text-xs font-medium text-[#c9d1d9]">
            direct assignment
          </span>
        </div>

        {/* Role */}
        <div>
          <span className="rounded-full border border-[#30363d] px-3 py-1 text-xs font-medium text-[#8b949e]">
            {member.role}
          </span>
        </div>

        {/* Actions (Omitted entirely if the user is an OWNER) */}
        <div className="relative overflow-visible">
          {!isOwner ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#30363d] bg-[#21262d] text-[#8b949e] hover:text-white transition-colors"
              >
                <span className="text-sm font-bold">•••</span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 bottom-full mb-2 w-36 z-50 rounded-xl border border-[#30363d] bg-[#161b22] py-1 shadow-2xl">
                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setSelectedRole(member.role);
                      setIsRoleModalOpen(true);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-[#c9d1d9] hover:bg-[#21262d] transition-colors"
                  >
                    Change Role
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setIsDeleteModalOpen(true);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-rose-400 hover:bg-[#21262d] transition-colors"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>

      {/* Change Role Modal */}
      {isRoleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl border border-[#30363d] bg-[#161b22] p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#21262d] pb-3">
              <h3 className="text-base font-semibold text-[#e6edf3] flex items-center gap-2">
                <Shield size={18} className="text-[#58a6ff]" /> Change Member
                Role
              </h3>
              <button
                type="button"
                onClick={() => setIsRoleModalOpen(false)}
                className="text-[#8b949e] hover:text-[#f0f6fc]"
              >
                <X size={18} />
              </button>
            </div>

            {/* User Details Box */}
            <div className="flex items-center gap-3.5 rounded-xl border border-[#21262d] bg-[#0d1117] p-3">
              <img
                src={member.avatar || "/default-avatar.png"}
                alt={member.username}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[#f0f6fc] truncate">
                  {member.github_username || member.username}
                </p>
                <p className="text-xs text-[#8b949e] truncate">
                  @{member.username}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#c9d1d9] mb-1.5">
                Select New Role
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full rounded-lg border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm text-[#f0f6fc] focus:border-[#58a6ff] focus:outline-none"
              >
                <option value="MEMBER">Member</option>
                <option value="ADMIN">Admin</option>
                <option value="OWNER">Owner</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#21262d]">
              <button
                type="button"
                onClick={() => setIsRoleModalOpen(false)}
                className="rounded-lg border border-[#30363d] bg-[#21262d] px-4 py-2 text-xs font-semibold text-[#c9d1d9] hover:bg-[#30363d]"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={loadingAction}
                onClick={handleConfirmChangeRole}
                className="inline-flex items-center gap-2 rounded-lg bg-[#238636] px-4 py-2 text-xs font-semibold text-white hover:bg-[#2ea043] disabled:opacity-50"
              >
                {loadingAction && (
                  <Loader2 size={13} className="animate-spin" />
                )}
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Member Removal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-xl border border-[#30363d] bg-[#161b22] p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#21262d] pb-3">
              <h3 className="text-base font-semibold text-[#e6edf3] flex items-center gap-2">
                <AlertTriangle size={18} className="text-rose-400" /> Remove
                Member
              </h3>
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="text-[#8b949e] hover:text-[#f0f6fc]"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-[#c9d1d9] leading-relaxed">
              Are you sure you want to remove{" "}
              <span className="font-semibold text-white">
                @{member.username}
              </span>{" "}
              from this organization? This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#21262d]">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="rounded-lg border border-[#30363d] bg-[#21262d] px-4 py-2 text-xs font-semibold text-[#c9d1d9] hover:bg-[#30363d]"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={loadingAction}
                onClick={handleConfirmRemove}
                className="inline-flex items-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-700 disabled:opacity-50"
              >
                {loadingAction && (
                  <Loader2 size={13} className="animate-spin" />
                )}
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MemberRow;
