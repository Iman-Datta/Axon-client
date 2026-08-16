import { Shield, X, AlertTriangle, Loader2 } from "lucide-react";

function Avatar({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-[#30363d]"
    />
  );
}

function MemberModals({
  member,
  isRoleModalOpen,
  setIsRoleModalOpen,
  selectedRole,
  setSelectedRole,
  handleConfirmChangeRole,
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  handleConfirmRemove,
  loadingAction,
}) {
  return (
    <>
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
                <option value="OWNER">Owner</option>
                <option value="LEAD">Lead</option>
                <option value="DEVELOPER">Developer</option>
                <option value="VIEWER">Viewer</option>
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
              from this project? This action cannot be undone.
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

export default MemberModals;
