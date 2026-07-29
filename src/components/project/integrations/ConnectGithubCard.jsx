import { Loader2, RefreshCw } from "lucide-react";

function ConnectGithubCard({ expired = false, onReconnect, loading = false }) {
  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-[#30363d] bg-[#161b22] p-8 shadow-lg">
      <div className="flex items-start gap-5">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl ${
            expired ? "bg-yellow-500/10" : "bg-[#0d1117]"
          }`}
        >
          <img
            src="https://github.githubassets.com/favicons/favicon.svg"
            alt="GitHub"
            className="h-8 w-8"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white">
            {expired ? "Reconnect GitHub" : "Connect GitHub"}
          </h2>

          <p className="mt-3 text-gray-300">
            {expired
              ? "Your GitHub authorization has expired."
              : "Connect your GitHub account to import repositories and enable automatic ticket updates."}
          </p>

          <p className="mt-2 text-sm text-gray-500">
            {expired
              ? "Reconnect your GitHub account to continue importing repositories and receiving webhook events."
              : "You'll be redirected to GitHub to authorize Axon. This only takes a few seconds."}
          </p>

          <button
            onClick={onReconnect}
            disabled={loading}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
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
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConnectGithubCard;
