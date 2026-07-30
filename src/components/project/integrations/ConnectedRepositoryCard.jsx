import { Loader2, Github, CheckCircle2, GitBranch } from "lucide-react";

function ConnectedRepositoryCard({ integration, onDisconnect, disconnecting }) {
  return (
    <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-500/10 text-green-400">
            <Github className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-[#e6edf3]">
              GitHub Repository
            </h2>
            <div className="mt-1 inline-flex items-center gap-1 rounded-full border border-green-500/30 bg-green-500/10 px-2 py-1 text-xs font-medium text-green-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Connected
            </div>
          </div>
        </div>
      </div>

      {/* Repository Info */}
      <div className="mt-6 space-y-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-[#8b949e]">
            Repository
          </p>
          <p className="mt-1 font-medium text-[#e6edf3]">
            {integration.repository_full_name}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <p className="text-xs uppercase tracking-wide text-[#8b949e]">
              Name
            </p>
            <p className="mt-1 text-[#e6edf3]">{integration.repository_name}</p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-[#8b949e]">
              Default Branch
            </p>

            <div className="mt-1 flex items-center gap-2 text-[#e6edf3]">
              <GitBranch className="h-4 w-4 text-[#8b949e]" />
              {integration.default_branch}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 flex justify-end border-t border-[#21262d] pt-5">
        <button
          onClick={onDisconnect}
          disabled={disconnecting}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition
            ${
              disconnecting
                ? "cursor-not-allowed bg-[#30363d] text-[#8b949e]"
                : "border border-red-500/30 bg-red-500/10 text-red-400 hover:border-red-500 hover:bg-red-500/20"
            }`}
        >
          {disconnecting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Disconnecting...
            </>
          ) : (
            "Disconnect Repository"
          )}
        </button>
      </div>
    </div>
  );
}

export default ConnectedRepositoryCard;
