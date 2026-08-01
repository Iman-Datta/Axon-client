import { AlertTriangle, X } from "lucide-react";

function ConfirmDeleteTicketModal({
  ticket,
  onCancel,
  onConfirm,
  loading,
  error,
}) {
  return (
    <div
      className="fixed inset-0 -z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-xl border border-[#30363d] bg-[#161b22] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#21262d] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-red-500/10 ring-1 ring-red-500/30">
              <AlertTriangle className="h-4 w-4 text-red-400" />
            </div>
            <h2 className="text-sm font-semibold text-[#e6edf3]">
              Delete Ticket
            </h2>
          </div>

          <button
            onClick={onCancel}
            type="button"
            className="rounded-md p-1.5 text-[#8b949e] transition hover:bg-[#21262d] hover:text-[#e6edf3]"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-5 py-5">
          <p className="text-sm text-[#c9d1d9]">
            Are you sure you want to delete{" "}
            <span className="font-mono text-xs text-[#8b949e]">
              {ticket?.ticket_number}
            </span>{" "}
            —{" "}
            <span className="font-semibold text-[#e6edf3]">
              "{ticket?.title}"
            </span>
            ? This action cannot be undone.
          </p>

          {error && (
            <div className="mt-3 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
              {error}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 border-t border-[#21262d] px-5 py-3.5">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-md border border-[#30363d] px-3.5 py-1.5 text-xs font-medium text-[#c9d1d9] transition hover:bg-[#21262d] disabled:opacity-50"
          >
            No, cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`rounded-md px-3.5 py-1.5 text-xs font-medium text-white transition ${
              loading
                ? "cursor-not-allowed bg-[#30363d] text-[#8b949e]"
                : "bg-red-600 hover:bg-red-500"
            }`}
          >
            {loading ? "Deleting..." : "Yes, delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteTicketModal;
