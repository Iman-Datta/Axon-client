import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import { AlertTriangle, LogOut, Trash2, Loader2, X } from "lucide-react";

import { leaveProject } from "../../../services/projectService";
import { fetchWithAuth } from "../../../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;

function DangerRow({
  title,
  description,
  actionLabel,
  actionIcon: Icon,
  onAction,
  isLoading,
}) {
  return (
    <div className="flex flex-col gap-4 rounded-md border border-[#f85149]/30 bg-[#2d1b1f]/40 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="text-sm font-medium text-[#e6edf3]">{title}</p>
        <p className="mt-1 text-sm text-[#8b949e]">{description}</p>
      </div>
      <button
        type="button"
        onClick={onAction}
        disabled={isLoading}
        className="flex shrink-0 items-center gap-1.5 rounded-md border border-[#f85149]/40 bg-[#f85149]/10 px-3.5 py-1.5 text-sm font-medium text-[#f85149] transition-colors hover:bg-[#f85149]/20 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <Icon size={14} />
        )}
        {actionLabel}
      </button>
    </div>
  );
}

function Danger() {
  const { project } = useOutletContext();
  const { slug, project_slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const user = useSelector((state) => state.auth.user);

  const isOwner = project?.role?.toLowerCase() === "owner";

  const [confirmingLeave, setConfirmingLeave] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [leaveError, setLeaveError] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState(null);

  const canDelete = deleteConfirmText === project?.name;

  const handleLeave = async () => {
    setIsLeaving(true);
    setLeaveError(null);
    try {
      await leaveProject(slug, project_slug, dispatch, accessToken);
      navigate(`/${slug}/projects`);
    } catch (err) {
      setLeaveError(err.message || "Couldn't leave the project. Try again.");
    } finally {
      setIsLeaving(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    setDeleteError(null);
    try {
      const response = await fetchWithAuth(
        `${API}/projects/${slug}/${project_slug}/delete/`,
        { method: "DELETE" },
        dispatch,
        accessToken,
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok || data.success === false) {
        throw new Error(
          data?.message || "Couldn't delete the project. Try again.",
        );
      }

      navigate(`/${user.username}`, { replace: true });
    } catch (err) {
      setDeleteError(err.message || "Something went wrong. Try again.");
      setIsDeleting(false);
    }
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setDeleteConfirmText("");
    setDeleteError(null);
  };

  return (
    <div className="max-w-2xl">
      <div>
        <h1 className="text-base font-semibold text-[#e6edf3]">Danger Zone</h1>
        <p className="mt-1 text-sm text-[#8b949e]">
          {isOwner
            ? "These actions are irreversible. Review carefully before continuing."
            : "Leaving this project removes your access immediately."}
        </p>
      </div>

      <div className="mt-8 space-y-5">
        <h2 className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#f85149]">
          <AlertTriangle size={13} />
          Irreversible actions
        </h2>

        {!confirmingLeave ? (
          <DangerRow
            title="Leave project"
            description="You'll lose access to this project's boards, tickets, and settings. You can only rejoin if another member invites you again."
            actionLabel="Leave project"
            actionIcon={LogOut}
            onAction={() => setConfirmingLeave(true)}
          />
        ) : (
          <div className="rounded-md border border-[#f85149]/40 bg-[#2d1b1f]/60 p-4">
            <p className="text-sm font-medium text-[#e6edf3]">
              Are you sure you want to leave this project?
            </p>
            <p className="mt-1 text-sm text-[#8b949e]">
              This action can't be undone from here — you'd need a new invite to
              rejoin.
            </p>

            {leaveError && (
              <p className="mt-3 text-sm text-[#f85149]">{leaveError}</p>
            )}

            <div className="mt-4 flex items-center gap-2">
              <button
                type="button"
                onClick={handleLeave}
                disabled={isLeaving}
                className="flex items-center gap-1.5 rounded-md bg-[#f85149] px-3.5 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#da3633] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLeaving ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <LogOut size={14} />
                )}
                {isLeaving ? "Leaving…" : "Yes, leave project"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirmingLeave(false);
                  setLeaveError(null);
                }}
                disabled={isLeaving}
                className="rounded-md border border-[#30363d] px-3.5 py-1.5 text-sm text-[#c9d1d9] transition-colors hover:border-[#8b949e] hover:bg-[#161b22] disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {isOwner && (
          <DangerRow
            title="Delete project"
            description="Permanently delete this project, including all boards, tickets, and history. This cannot be undone."
            actionLabel="Delete project"
            actionIcon={Trash2}
            onAction={() => setDeleteModalOpen(true)}
          />
        )}
      </div>

      {deleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-[#30363d] bg-[#161b22] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#21262d] px-6 py-4">
              <h2 className="text-lg font-semibold text-[#f0f6fc]">
                Delete project
              </h2>
              <button
                onClick={closeDeleteModal}
                className="rounded-md p-1 text-[#8b949e] transition hover:bg-[#21262d] hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 px-6 py-5">
              <p className="text-sm leading-6 text-[#8b949e]">
                This will permanently delete{" "}
                <span className="font-semibold text-[#f0f6fc]">
                  {project?.name}
                </span>{" "}
                and all of its data. This action cannot be undone.
              </p>
              <p className="text-sm leading-6 text-[#8b949e]">
                Type{" "}
                <span className="font-semibold text-[#f85149]">
                  {project?.name}
                </span>{" "}
                to confirm.
              </p>

              {deleteError && (
                <div className="rounded-md border border-[#f85149]/30 bg-[#f85149]/10 px-3 py-2 text-sm text-[#f85149]">
                  {deleteError}
                </div>
              )}

              <input
                type="text"
                value={deleteConfirmText}
                disabled={isDeleting}
                onChange={(e) => {
                  setDeleteConfirmText(e.target.value);
                  if (deleteError) setDeleteError(null);
                }}
                placeholder={`Type ${project?.name} to confirm`}
                className="w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm text-[#f0f6fc] outline-none transition focus:border-[#f85149] disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            <div className="flex justify-end gap-3 border-t border-[#21262d] px-6 py-4">
              <button
                onClick={closeDeleteModal}
                disabled={isDeleting}
                className="rounded-md border border-[#30363d] px-4 py-2 text-sm text-[#c9d1d9] transition hover:bg-[#21262d] disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                disabled={!canDelete || isDeleting}
                onClick={handleDelete}
                className="flex items-center gap-1.5 rounded-md bg-[#da3633] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#f85149] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDeleting ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Trash2 size={14} />
                )}
                {isDeleting ? "Deleting…" : "Delete project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Danger;
