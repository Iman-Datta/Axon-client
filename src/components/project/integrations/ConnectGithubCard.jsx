import { FaGithub } from "react-icons/fa";
import { Loader2, RefreshCw, ArrowUpRight } from "lucide-react";

function ConnectGithubCard({ expired = false, onReconnect, loading = false }) {
  return (
    <div className="mx-auto max-w-3xl rounded-xl border border-[#30363d] bg-[#161b22]">
      <div className="p-8">
        <div className="flex items-start gap-5">
          <div className="flex h-14 w-14 items-center justify-center rounded-full">
            <FaGithub className="h-11 w-11 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-[#e6edf3]">
                {expired ? "Reconnect GitHub" : "Connect GitHub"}
              </h2>

              {expired && (
                <span className="rounded-full border border-yellow-500/30 bg-yellow-500/10 px-2 py-1 text-xs font-medium text-yellow-400">
                  Authorization Expired
                </span>
              )}
            </div>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#8b949e]">
              {expired
                ? "Your GitHub authorization has expired. Reconnect your account to continue syncing repositories and receiving webhook events."
                : "Connect your GitHub account to link repositories, sync development activity, and automatically update ticket status from pull requests and commits."}
            </p>

            <div className="mt-6 rounded-lg border border-[#30363d] bg-[#0d1117] p-4">
              <p className="mb-3 text-sm font-medium text-[#e6edf3]">
                What you'll get
              </p>

              <ul className="space-y-2 text-sm text-[#8b949e]">
                <li>• Import GitHub repositories into your project</li>
                <li>• Automatic ticket updates from commits & pull requests</li>
                <li>• Real-time webhook synchronization</li>
              </ul>
            </div>

            <div className="mt-6">
              <button
                onClick={onReconnect}
                disabled={loading}
                className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition
                  ${
                    loading
                      ? "cursor-not-allowed bg-[#30363d] text-[#8b949e]"
                      : "bg-[#238636] text-white hover:bg-[#2ea043]"
                  }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Redirecting...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    {expired ? "Reconnect GitHub" : "Connect GitHub"}
                    <ArrowUpRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConnectGithubCard;
