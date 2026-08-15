import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  AlertTriangle,
  Loader2,
  X,
  Shield,
  MoreHorizontal,
} from "lucide-react";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

const ROLE_STYLES = {
  OWNER: "border-[#30363d] bg-[#21262d] text-[#c9d1d9]",
  ADMIN: "border-[#30363d] bg-[#21262d] text-[#c9d1d9]",
  MEMBER: "border-[#30363d] bg-[#21262d] text-[#8b949e]",
  DEFAULT: "border-[#30363d] bg-[#21262d] text-[#8b949e]",
};

function getInitials(name = "") {
  return name
    .split(/[\s_.-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
}

function Avatar({ src, alt }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#21262d] text-xs font-bold text-[#c9d1d9] ring-1 ring-[#30363d]">
        {getInitials(alt)}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-[#30363d]"
    />
  );
}

function MemberRow({ member, orgSlug, refetch }) {
  const API = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const { slug: routeSlug } = useParams();
  const currentOrgSlug = orgSlug || routeSlug;

  const isOwner = member.role === "OWNER";
  const [loadingAction, setLoadingAction] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(member.role);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const handleConfirmRemove = async () => {
    try {
      setLoadingAction(true);
      const response = await fetchWithAuth(
        `${API}/org/${currentOrgSlug}/members/${member.id}/remove/`,
        { method: "DELETE" },
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

  const roleStyle = ROLE_STYLES[member.role] ?? ROLE_STYLES.DEFAULT;

  return (
    <>
      <div
        className={`grid grid-cols-[1fr_150px_110px_44px] items-center gap-3 border-b border-[#21262d] px-5 py-3.5 transition-colors last:border-b-0 hover:bg-[#161b22]/60 ${
          loadingAction ? "pointer-events-none opacity-50" : ""
        }`}
      >
        {/* User */}
        <div className="flex min-w-0 items-center gap-3">
          <Avatar
            src={member.avatar}
            alt={member.github_username || member.username}
          />

          <div className="min-w-0">
            <Link
              to={`/${member.username}`}
              className="truncate text-[13px] font-medium text-[#58a6ff] hover:underline"
            >
              {member.github_username || member.username}
            </Link>
            <p className="truncate text-[11.5px] text-[#8b949e]">
              @{member.username}
            </p>
            {member.bio && (
              <p className="mt-0.5 truncate text-[11px] text-[#6e7681]">
                {member.bio}
              </p>
            )}
          </div>
        </div>

        {/* Membership */}
        <div>
          <span className="inline-flex rounded-md border border-[#30363d] bg-[#21262d] px-2 py-0.5 text-[10.5px] font-medium text-[#8b949e]">
            Direct assignment
          </span>
        </div>

        {/* Role */}
        <div>
          <span
            className={`inline-flex rounded-md border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${roleStyle}`}
          >
            {member.role}
          </span>
        </div>

        {/* Actions */}
        <div className="relative flex justify-end">
          {!isOwner && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                aria-label="Member actions"
                className="flex h-7 w-7 items-center justify-center rounded-md border border-[#30363d] bg-[#21262d] text-[#8b949e] transition-colors hover:border-[#388bfd] hover:text-white"
              >
                <MoreHorizontal size={14} />
              </button>

              {isDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsDropdownOpen(false)}
                  />
                  <div className="absolute right-0 bottom-full z-50 mb-2 w-36 rounded-lg border border-[#30363d] bg-[#161b22] py-1 shadow-xl">
                    <button
                      type="button"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setSelectedRole(member.role);
                        setIsRoleModalOpen(true);
                      }}
                      className="w-full px-3 py-1.5 text-left text-[11.5px] text-[#c9d1d9] transition-colors hover:bg-[#21262d]"
                    >
                      Change role
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setIsDeleteModalOpen(true);
                      }}
                      className="w-full px-3 py-1.5 text-left text-[11.5px] text-red-400 transition-colors hover:bg-[#21262d]"
                    >
                      Remove
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Change Role Modal */}
      {isRoleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm space-y-4 rounded-xl border border-[#30363d] bg-[#161b22] p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#21262d] pb-3">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-[#f0f6fc]">
                <Shield size={15} className="text-[#58a6ff]" /> Change role
              </h3>
              <button
                type="button"
                onClick={() => setIsRoleModalOpen(false)}
                className="text-[#8b949e] hover:text-[#f0f6fc]"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex items-center gap-3 rounded-lg border border-[#21262d] bg-[#0d1117] p-2.5">
              <Avatar
                src={member.avatar}
                alt={member.github_username || member.username}
              />
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium text-[#f0f6fc]">
                  {member.github_username || member.username}
                </p>
                <p className="truncate text-[11px] text-[#8b949e]">
                  @{member.username}
                </p>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-[11px] font-medium text-[#c9d1d9]">
                New role
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full rounded-lg border border-[#30363d] bg-[#0d1117] px-3 py-2 text-[13px] text-[#f0f6fc] focus:border-[#58a6ff] focus:outline-none"
              >
                <option value="MEMBER">Member</option>
                <option value="ADMIN">Admin</option>
                <option value="OWNER">Owner</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-[#21262d] pt-3">
              <button
                type="button"
                onClick={() => setIsRoleModalOpen(false)}
                className="rounded-lg border border-[#30363d] bg-[#21262d] px-3.5 py-1.5 text-xs font-medium text-[#c9d1d9] hover:bg-[#30363d]"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={loadingAction}
                onClick={handleConfirmChangeRole}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#238636] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#2ea043] disabled:opacity-50"
              >
                {loadingAction && (
                  <Loader2 size={12} className="animate-spin" />
                )}
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Remove Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm space-y-4 rounded-xl border border-[#30363d] bg-[#161b22] p-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#21262d] pb-3">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-[#f0f6fc]">
                <AlertTriangle size={15} className="text-red-400" /> Remove
                member
              </h3>
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="text-[#8b949e] hover:text-[#f0f6fc]"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-[12.5px] leading-relaxed text-[#c9d1d9]">
              Remove{" "}
              <span className="font-semibold text-white">
                @{member.username}
              </span>{" "}
              from this organization? This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-2 border-t border-[#21262d] pt-3">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="rounded-lg border border-[#30363d] bg-[#21262d] px-3.5 py-1.5 text-xs font-medium text-[#c9d1d9] hover:bg-[#30363d]"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={loadingAction}
                onClick={handleConfirmRemove}
                className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {loadingAction && (
                  <Loader2 size={12} className="animate-spin" />
                )}
                Yes, remove
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MemberRow;
