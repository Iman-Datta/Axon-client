import { useEffect, useState } from "react";
import { X, Search } from "lucide-react";

function AddMemberModal({ open, loading, error, onClose, onAdd }) {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("VIEWER");

  // Close on ESC
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setUsername("");
      setRole("VIEWER");
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = async () => {
    const success = await onAdd({
      username,
      role,
    });

    if (success) {
      setUsername("");
      setRole("VIEWER");
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="w-full max-w-lg rounded-xl border border-[#30363d] bg-[#0d1117] shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#21262d] px-6 py-4">
            <h2 className="text-lg font-semibold text-[#e6edf3]">Add Member</h2>

            <button
              onClick={onClose}
              className="rounded-md p-2 text-[#8b949e] transition hover:bg-[#21262d]"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className="space-y-5 p-6">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#c9d1d9]">
                Username
              </label>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8b949e]" />

                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username..."
                  className="w-full rounded-lg border border-[#30363d] bg-[#161b22] py-2.5 pl-10 pr-4 text-sm text-[#e6edf3] outline-none focus:border-[#58a6ff]"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#c9d1d9]">
                Project Role
              </label>

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-lg border border-[#30363d] bg-[#161b22] px-3 py-2.5 text-sm text-[#e6edf3] outline-none focus:border-[#58a6ff]"
              >
                <option value="DEVELOPER">Developer</option>
                <option value="VIEWER">Viewer</option>
              </select>
            </div>
          </div>
          {error && (
            <div className="mx-6 mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}
          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-[#21262d] px-6 py-4">
            <button
              onClick={onClose}
              className="rounded-lg border border-[#30363d] px-4 py-2 text-sm text-[#c9d1d9] transition hover:bg-[#21262d]"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              disabled={!username.trim() || loading}
              className="rounded-lg bg-[#238636] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2ea043] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Member"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddMemberModal;
