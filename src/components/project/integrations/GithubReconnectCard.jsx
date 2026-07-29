import { RefreshCw } from "lucide-react";

function GithubReconnectCard({ message, onReconnect, loading }) {
  console.log("GithubReconnectCard rendered", onReconnect);
  return (
    <div className="mx-auto max-w-3xl rounded-2xl border border-yellow-700/40 bg-[#161b22] p-8 shadow-lg">
      <div className="flex items-start gap-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-yellow-500/10">
          <img
            src="https://github.githubassets.com/favicons/favicon.svg"
            alt="GitHub"
            className="h-8 w-8"
          />
        </div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold text-white">Reconnect GitHub</h2>

          <p className="mt-3 text-gray-300">{message}</p>

          <p className="mt-2 text-sm text-gray-500">
            Your GitHub authorization has expired. Reconnect your account to
            continue importing repositories and receiving webhook events.
          </p>

          <button
            onClick={onReconnect}
            disabled={loading}
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 font-medium text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw className="h-4 w-4" />
            {loading ? "Redirecting..." : "Reconnect GitHub"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default GithubReconnectCard;
