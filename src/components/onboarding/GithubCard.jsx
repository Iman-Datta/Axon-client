// UI only – no logic. Wire up state/handlers in IdentitySetup.jsx

export default function GithubCard({ status = "pending" }) {
  // status: "pending" | "connecting" | "done"
  const isDone = status === "done";
  const isConnecting = status === "connecting";

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
          {/* GitHub icon */}
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
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-[#c9d1d9]">
                GitHub account
              </h3>
              <span className="rounded-full border border-[#30363d] bg-[#0d1117] px-2 py-0.5 text-[10px] font-medium text-[#8b949e]">
                Required for OAuth
              </span>
            </div>
            <p className="mt-0.5 text-xs text-[#8b949e]">
              Powers Git-aware automations, repo linking, and commit tracking.
            </p>
          </div>
        </div>

        {isDone && (
          <span className="shrink-0 rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-400">
            Connected ✓
          </span>
        )}
      </div>

      {/* Connect button */}
      {!isDone && (
        <div className="mt-4">
          <button
            className="
              flex w-full items-center justify-center gap-2.5
              rounded-lg border border-[#30363d] bg-[#21262d]
              px-4 py-2.5 text-sm font-medium text-[#c9d1d9]
              hover:border-[#8b949e] hover:bg-[#30363d]
              transition-all
              disabled:cursor-not-allowed disabled:opacity-50
            "
            disabled={isConnecting}
          >
            {isConnecting ? (
              <>
                <svg
                  className="h-4 w-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Connecting to GitHub…
              </>
            ) : (
              <>
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                Connect GitHub
              </>
            )}
          </button>
          <p className="mt-2 text-center text-[11px] text-[#484f58]">
            You'll be redirected to GitHub to authorize access.
          </p>
        </div>
      )}

      {/* Done state — show connected account */}
      {isDone && (
        <div className="mt-3 flex items-center gap-3 rounded-lg border border-[#30363d] bg-[#0d1117] px-3 py-2.5">
          <img
            src="https://github.com/ghost.png"
            alt="GitHub avatar"
            className="h-6 w-6 rounded-full border border-[#30363d]"
          />
          <span className="text-sm text-[#c9d1d9]">@iman-datta</span>
          <button className="ml-auto text-xs text-[#f85149] hover:underline">
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
}