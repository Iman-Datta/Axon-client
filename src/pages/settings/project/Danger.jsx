import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { leaveProject } from "../../../services/projectService";
import { TriangleAlert, X } from "lucide-react";

function Danger() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const navigate = useNavigate();
  const { slug, project_slug } = useParams();

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const canLeave = confirmText === "CONFIRM";

  const handleLeave = async () => {
    try {
      setLoading(true);
      setError("");

      await leaveProject(slug, project_slug, dispatch, accessToken);

      setOpen(false);
      setConfirmText("");

      navigate(`/${slug}/projects`);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to leave project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-[#f85149]">Danger Zone</h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-[#8b949e]">
            Leaving a project will immediately remove your access. You will no
            longer be able to view tickets, boards, members, or project settings
            unless another member invites you again.
          </p>
        </div>

        <div className="rounded-lg border border-[#f85149]/30 bg-[#161b22] p-5">
          <div className="flex items-start gap-3">
            <TriangleAlert
              size={20}
              className="mt-0.5 shrink-0 text-[#f85149]"
            />

            <div className="flex-1">
              <h3 className="text-base font-semibold text-[#f0f6fc]">
                Leave Project
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#8b949e]">
                Once you leave this project, your access will be revoked
                immediately. You can only rejoin if another member invites you
                again.
              </p>

              <button
                onClick={() => {
                  setOpen(true);
                  setConfirmText("");
                  setError("");
                }}
                className="mt-5 rounded-md border border-[#f85149]/50 bg-[#da3633]/10 px-4 py-2 text-sm font-medium text-[#f85149] transition hover:bg-[#da3633]/20"
              >
                Leave Project
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-[#30363d] bg-[#161b22] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#21262d] px-6 py-4">
              <h2 className="text-lg font-semibold text-[#f0f6fc]">
                Leave Project
              </h2>

              <button
                onClick={() => {
                  setOpen(false);
                  setConfirmText("");
                  setError("");
                }}
                className="rounded-md p-1 text-[#8b949e] transition hover:bg-[#21262d] hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 px-6 py-5">
              <p className="text-sm leading-6 text-[#8b949e]">
                This action cannot be undone. Type{" "}
                <span className="font-semibold text-[#f85149]">CONFIRM</span>{" "}
                below to leave this project.
              </p>
              {error && (
                <div className="rounded-md border border-[#f85149]/30 bg-[#f85149]/10 px-3 py-2 text-sm text-[#f85149]">
                  {error}
                </div>
              )}
              <input
                type="text"
                value={confirmText}
                disabled={loading}
                onChange={(e) => {
                  setConfirmText(e.target.value);
                  if (error) setError("");
                }}
                placeholder="Type CONFIRM"
                className="w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm text-[#f0f6fc] outline-none transition focus:border-[#f85149] disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            <div className="flex justify-end gap-3 border-t border-[#21262d] px-6 py-4">
              <button
                onClick={() => {
                  setOpen(false);
                  setConfirmText("");
                  setError("");
                }}
                className="rounded-md border border-[#30363d] px-4 py-2 text-sm text-[#c9d1d9] transition hover:bg-[#21262d]"
              >
                Cancel
              </button>

              <button
                disabled={!canLeave || loading}
                onClick={handleLeave}
                className="rounded-md bg-[#da3633] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#f85149] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Leaving..." : "Leave Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Danger;
