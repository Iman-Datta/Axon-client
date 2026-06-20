// UI only – no logic. Wire up state/handlers in IdentitySetup.jsx

export default function EmailCard({ status = "pending" }) {
  // status: "pending" | "otp-sent" | "done" | "skipped"
  const isDone = status === "done";
  const otpSent = status === "otp-sent";

  return (
    <div
      className={`
        rounded-xl border bg-[#161b22] p-5 transition-all duration-200
        ${isDone ? "border-green-500/40" : "border-[#30363d]"}
      `}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-4">
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-[#c9d1d9]">
                Email address
              </h3>
              <span className="rounded-full border border-[#30363d] bg-[#0d1117] px-2 py-0.5 text-[10px] font-medium text-[#8b949e]">
                Required for OAuth
              </span>
            </div>
            <p className="mt-0.5 text-xs text-[#8b949e]">
              Used for notifications, recovery, and account security.
            </p>
          </div>
        </div>

        {isDone && (
          <span className="shrink-0 rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-400">
            Verified ✓
          </span>
        )}
      </div>

      {/* Input + Send OTP — default state */}
      {!isDone && !otpSent && (
        <div className="mt-4 flex gap-2">
          <input
            type="email"
            placeholder="you@example.com"
            className="
              flex-1 rounded-lg border border-[#30363d] bg-[#0d1117]
              px-3 py-2.5 text-sm text-[#c9d1d9] placeholder-[#484f58]
              outline-none transition-all
              focus:border-[#388bfd] focus:ring-1 focus:ring-[#388bfd]/30
            "
          />
          <button
            className="
              shrink-0 rounded-lg border border-[#30363d] bg-[#21262d]
              px-4 py-2.5 text-sm font-medium text-[#c9d1d9]
              hover:border-[#388bfd]/50 hover:bg-[#388bfd]/10 hover:text-[#388bfd]
              transition-all
            "
          >
            Send OTP
          </button>
        </div>
      )}

      {/* OTP input — after send */}
      {!isDone && otpSent && (
        <div className="mt-4 space-y-3">
          <p className="text-xs text-[#8b949e]">
            Enter the 6-digit code sent to{" "}
            <span className="font-medium text-[#c9d1d9]">you@example.com</span>
          </p>
          <div className="flex gap-2">
            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                className="
                  h-11 w-11 rounded-lg border border-[#30363d] bg-[#0d1117]
                  text-center text-base font-semibold text-[#c9d1d9]
                  outline-none transition-all
                  focus:border-[#388bfd] focus:ring-1 focus:ring-[#388bfd]/30
                "
              />
            ))}
          </div>
          <div className="flex items-center justify-between">
            <button className="text-xs text-[#8b949e] hover:text-[#c9d1d9] transition-colors">
              Resend code
            </button>
            <button
              className="
                rounded-lg bg-[#388bfd] px-4 py-2 text-sm font-medium text-white
                hover:bg-[#58a6ff] transition-colors
              "
            >
              Verify
            </button>
          </div>
        </div>
      )}

      {/* Done state */}
      {isDone && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-[#30363d] bg-[#0d1117] px-3 py-2.5">
          <svg
            className="h-4 w-4 text-green-400"
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
          <span className="text-sm text-[#c9d1d9]">you@example.com</span>
          <button className="ml-auto text-xs text-[#388bfd] hover:underline">
            Change
          </button>
        </div>
      )}
    </div>
  );
}