// UI only – no logic. Wire up state/handlers in IdentitySetup.jsx

export default function UsernameCard({ status = "pending" }) {
  // status: "pending" | "active" | "done" | "skipped"
  const isDone = status === "done";
  const isActive = status === "active";

  return (
    <div
      className={`
        rounded-xl border bg-[#161b22] p-5 transition-all duration-200
        ${isDone ? "border-green-500/40" : isActive ? "border-[#388bfd]/50" : "border-[#30363d]"}
      `}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-4">
        {/* Icon + Info */}
        <div className="flex items-start gap-4">
          <div
            className={`
              mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border
              ${isDone ? "border-green-500/30 bg-green-500/10 text-green-400" : "border-[#30363d] bg-[#0d1117] text-[#8b949e]"}
            `}
          >
            {isDone ? (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-[#c9d1d9]">Username</h3>
              <span className="rounded-full border border-[#388bfd]/30 bg-[#388bfd]/10 px-2 py-0.5 text-[10px] font-medium text-[#388bfd]">
                Required
              </span>
            </div>
            <p className="mt-0.5 text-xs text-[#8b949e]">
              Your unique handle on Axon — used for mentions and your public
              profile.
            </p>
          </div>
        </div>

        {/* Done badge */}
        {isDone && (
          <span className="shrink-0 rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-400">
            Set ✓
          </span>
        )}
      </div>

      {/* Input area — shown when not done */}
      {!isDone && (
        <div className="mt-4">
          <div className="flex items-center rounded-lg border border-[#30363d] bg-[#0d1117] ring-0 focus-within:border-[#388bfd] focus-within:ring-1 focus-within:ring-[#388bfd]/30 transition-all">
            <span className="select-none border-r border-[#30363d] px-3 py-2.5 text-sm text-[#8b949e]">
              @
            </span>
            <input
              type="text"
              placeholder="your-username"
              className="w-full bg-transparent px-3 py-2.5 text-sm text-[#c9d1d9] placeholder-[#484f58] outline-none"
            />
          </div>
          <p className="mt-1.5 text-[11px] text-[#484f58]">
            Only letters, numbers, and hyphens. Min 3 characters.
          </p>
        </div>
      )}

      {/* Done state — show chosen username */}
      {isDone && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-[#30363d] bg-[#0d1117] px-3 py-2.5">
          <span className="text-sm text-[#8b949e]">@</span>
          <span className="text-sm text-[#c9d1d9]">iman-datta</span>
          <button className="ml-auto text-xs text-[#388bfd] hover:underline">
            Change
          </button>
        </div>
      )}
    </div>
  );
}