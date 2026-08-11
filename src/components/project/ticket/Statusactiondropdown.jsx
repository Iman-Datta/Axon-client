import { useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  CheckCircle2,
  Ban,
  XCircle,
  RotateCcw,
  Undo2,
  X,
} from "lucide-react";

const STATUS_META = {
  DONE: {
    label: "Mark as Done",
    confirmLabel: "Done",
    icon: CheckCircle2,
    textClass: "text-[#3fb950]",
  },
  BLOCKED: {
    label: "Block Ticket",
    confirmLabel: "Blocked",
    icon: Ban,
    textClass: "text-[#d29922]",
  },
  CANCELLED: {
    label: "Cancel Ticket",
    confirmLabel: "Cancelled",
    icon: XCircle,
    textClass: "text-red-400",
  },
  OPEN: {
    label: "Reopen Ticket",
    confirmLabel: "Open",
    icon: RotateCcw,
    textClass: "text-[#58a6ff]",
  },
  DRAFT: {
    label: "Back to Board",
    confirmLabel: "Draft (Backlog)",
    icon: Undo2,
    textClass: "text-[#8b949e]",
  },
};

// which transitions are allowed from a given current status
const TRANSITIONS = {
  OPEN: ["DONE", "BLOCKED", "CANCELLED"],
  BLOCKED: ["DRAFT", "OPEN", "DONE", "CANCELLED"],
  CANCELLED: ["DRAFT"],
  DONE: [],
};

function StatusActionDropdown({ status, onSelect, loading = false }) {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(null); // status pending confirmation
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const options = TRANSITIONS[status] || [];
  if (options.length === 0) return null;

  const handleConfirm = () => {
    if (pending) onSelect(pending);
    setPending(null);
  };

  return (
    <>
      <div ref={ref} className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl border border-[#30363d] px-3 py-2 text-sm text-[#c9d1d9] transition hover:bg-[#161b22] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Status"}
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <div className="absolute right-0 z-30 mt-1.5 w-48 overflow-hidden rounded-xl border border-[#30363d] bg-[#161b22] shadow-2xl">
            {options.map((key) => {
              const meta = STATUS_META[key];
              const Icon = meta.icon;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setPending(key);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm transition-colors hover:bg-[#21262d] ${meta.textClass}`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {meta.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {pending && (
        <div
          onMouseDown={() => setPending(null)}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
        >
          <div
            onMouseDown={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl border border-[#30363d] bg-[#161b22] shadow-[0_20px_80px_rgba(0,0,0,0.65)]"
          >
            <div className="flex items-start justify-between border-b border-[#30363d] px-5 py-4">
              <h3 className="text-base font-semibold text-[#e6edf3]">
                {STATUS_META[pending].label}?
              </h3>
              <button
                type="button"
                onClick={() => setPending(null)}
                className="rounded-lg p-1 text-[#8b949e] hover:bg-[#21262d] hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="px-5 py-4 text-sm text-[#8b949e]">
              This will set the ticket status to{" "}
              <span
                className={`font-semibold ${STATUS_META[pending].textClass}`}
              >
                {STATUS_META[pending].confirmLabel}
              </span>
              .
            </div>
            <div className="flex justify-end gap-2.5 border-t border-[#30363d] px-5 py-4">
              <button
                type="button"
                onClick={() => setPending(null)}
                className="rounded-lg border border-[#30363d] bg-[#0d1117] px-4 py-2 text-sm font-medium text-[#c9d1d9] hover:border-[#484f58] hover:bg-[#21262d]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="rounded-lg bg-[#238636] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2ea043]"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default StatusActionDropdown;
