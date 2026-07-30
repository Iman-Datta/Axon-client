import { Loader2, CheckCircle2, GitBranch, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";

function ConnectedRepositoryCard({ integration, onDisconnect, disconnecting }) {
  return (
    <div className="rounded-lg border border-[#30363d] bg-[#161b22] p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full">
            <FaGithub className="h-11 w-11 text-white" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-[#e6edf3]">
                GitHub Repository
              </h2>

              <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-1.5 py-0.5 text-[10px] font-medium text-green-400">
                <CheckCircle2 className="h-3 w-3" />
                Connected
              </span>
            </div>

            <a
              href={`https://github.com/${integration.repository_full_name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-0.5 flex items-center gap-1 text-xs text-[#8b949e] transition hover:text-[#e6edf3] hover:underline"
            >
              {integration.repository_full_name}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        <button
          onClick={onDisconnect}
          disabled={disconnecting}
          className={`flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition ${
            disconnecting
              ? "cursor-not-allowed bg-[#21262d] text-[#8b949e]"
              : "border border-red-500/30 bg-red-500/10 text-red-400 hover:border-red-500/50 hover:bg-red-500/20"
          }`}
        >
          {disconnecting ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Disconnecting...
            </>
          ) : (
            "Disconnect"
          )}
        </button>
      </div>

      {/* Repository Info */}
      <div className="mt-4 flex items-center gap-6 border-t border-[#21262d] pt-3">
        <div>
          <p className="text-[10px] uppercase tracking-wide text-[#8b949e]">
            Name
          </p>
          <p className="mt-0.5 text-xs font-medium text-[#e6edf3]">
            {integration.repository_name}
          </p>
        </div>

        <div className="h-6 w-px bg-[#21262d]" />

        <div>
          <p className="text-[10px] uppercase tracking-wide text-[#8b949e]">
            Default Branch
          </p>

          <div className="mt-0.5 flex items-center gap-1 text-xs font-medium text-[#e6edf3]">
            <GitBranch className="h-3.5 w-3.5 text-[#8b949e]" />
            {integration.default_branch}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectedRepositoryCard;
