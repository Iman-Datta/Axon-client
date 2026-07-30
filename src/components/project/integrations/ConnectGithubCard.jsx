import { FaGithub } from "react-icons/fa";
import {
  Loader2,
  RefreshCw,
  ArrowUpRight,
  GitPullRequest,
  GitCommit,
  Webhook,
} from "lucide-react";

function ConnectGithubCard({ expired = true, onReconnect, loading = true }) {
  return (
    <div className="mx-auto max-w-2xl rounded-lg border border-[#30363d] bg-[#161b22] p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-full">
          <FaGithub className="h-11 w-11 text-white" />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-semibold text-[#e6edf3]">
              {expired ? "Reconnect GitHub" : "Connect GitHub"}
            </h2>
            {expired && (
              <span className="rounded-full bg-yellow-500/10 px-1.5 py-0.5 text-[10px] font-medium text-yellow-400">
                Authorization Expired
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-[#8b949e]">
            {expired
              ? "Reconnect to resume syncing repositories and webhook events."
              : "Link a repository to sync development activity with your tickets."}
          </p>
        </div>

        <button
          onClick={onReconnect}
          disabled={loading}
          className={`flex shrink-0 items-center gap-2 rounded-md px-4 py-2 text-xs font-medium transition
            ${
              loading
                ? "cursor-not-allowed bg-[#30363d] text-[#8b949e]"
                : "bg-[#238636] text-white hover:bg-[#2ea043]"
            }`}
        >
          {loading ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              Redirecting
            </>
          ) : (
            <>
              <RefreshCw className="h-3.5 w-3.5" />
              {expired ? "Reconnect" : "Connect"}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </div>

      <div className="mt-4 flex items-center gap-5 border-t border-[#21262d] pt-3 text-xs text-[#8b949e]">
        <div className="flex items-center gap-1.5">
          <GitPullRequest className="h-3.5 w-3.5 text-[#8b949e]" />
          Auto ticket updates from PRs
        </div>
        <div className="h-4 w-px bg-[#21262d]" />
        <div className="flex items-center gap-1.5">
          <GitCommit className="h-3.5 w-3.5 text-[#8b949e]" />
          Commit tracking
        </div>
        <div className="h-4 w-px bg-[#21262d]" />
        <div className="flex items-center gap-1.5">
          <Webhook className="h-3.5 w-3.5 text-[#8b949e]" />
          Real-time webhooks
        </div>
      </div>
    </div>
  );
}

export default ConnectGithubCard;
