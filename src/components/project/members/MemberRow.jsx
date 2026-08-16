import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MoreHorizontal } from "lucide-react";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";
import MemberModals from "./MemberModals";

const API = import.meta.env.VITE_API_URL;

const ROLE_STYLES = {
  OWNER: "border-[#30363d] bg-[#21262d] text-[#c9d1d9]",
  ADMIN: "border-[#30363d] bg-[#21262d] text-[#c9d1d9]",
  LEAD: "border-[#30363d] bg-[#21262d] text-[#c9d1d9]",
  DEVELOPER: "border-[#30363d] bg-[#21262d] text-[#8b949e]",
  VIEWER: "border-[#30363d] bg-[#21262d] text-[#8b949e]",
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

function MemberRow({ member, can_edit, refetch }) {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const { slug, project_slug } = useParams();

  const isOwner = member.role === "OWNER";
  const [loadingAction, setLoadingAction] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(member.role);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const joinedDate = member.joined_at
    ? new Date(member.joined_at).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "-";

  const handleConfirmChangeRole = async () => {
    try {
      setLoadingAction(true);
      const response = await fetchWithAuth(
        `${API}/projects/${slug}/${project_slug}/${member.id}/role/`,
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
        `${API}/projects/${slug}/${project_slug}/${member.id}/remove/`,
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
      <tr
        className={`border-b border-[#21262d] transition-colors last:border-b-0 hover:bg-[#161b22]/60 ${
          loadingAction ? "pointer-events-none opacity-50" : ""
        }`}
      >
        {/* Member / User details */}
        <td className="px-5 py-3.5">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar
              src={member.avatar}
              alt={member.github_username || member.username}
            />

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <Link
                  to={`/${member.username}`}
                  className="truncate text-[13px] font-medium text-[#58a6ff] hover:underline"
                >
                  {member.github_username || member.username}
                </Link>
                <span className="inline-flex rounded-md border border-[#30363d] bg-[#21262d] px-1.5 py-0.2 text-[9.5px] font-medium text-[#8b949e]">
                  Direct
                </span>
              </div>
              <p className="truncate text-[11.5px] text-[#8b949e]">
                @{member.username}
              </p>
            </div>
          </div>
        </td>

        {/* Role */}
        <td className="px-5 py-3.5">
          <span
            className={`inline-flex rounded-md border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${roleStyle}`}
          >
            {member.role}
          </span>
        </td>

        {/* Joined Date */}
        <td className="px-5 py-3.5 text-xs text-[#8b949e]">{joinedDate}</td>

        {/* Actions */}
        <td className="px-5 py-3.5 text-right">
          {can_edit && !isOwner && (
            <div className="relative inline-block text-left">
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
        </td>
      </tr>

      {/* Render Modals Separately */}
      <MemberModals
        member={member}
        isRoleModalOpen={isRoleModalOpen}
        setIsRoleModalOpen={setIsRoleModalOpen}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        handleConfirmChangeRole={handleConfirmChangeRole}
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        handleConfirmRemove={handleConfirmRemove}
        loadingAction={loadingAction}
      />
    </>
  );
}

export default MemberRow;
