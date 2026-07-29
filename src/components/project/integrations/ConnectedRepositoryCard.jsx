import { Loader2 } from "lucide-react";

function ConnectedRepositoryCard({ integration, onDisconnect, disconnecting }) {
  return (
    <div className="rounded-xl border border-green-500 bg-[#161b22] p-6">
      <h2 className="text-xl font-semibold text-green-400">
        Repository Connected
      </h2>

      <div className="mt-6 space-y-2 text-gray-300">
        <p>
          <strong>Name:</strong> {integration.repository_name}
        </p>

        <p>
          <strong>Repository:</strong> {integration.repository_full_name}
        </p>

        <p>
          <strong>Branch:</strong> {integration.default_branch}
        </p>
      </div>

      <button
        onClick={onDisconnect}
        disabled={disconnecting}
        className={`mt-6 flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-medium
        transition-all duration-200
        ${
          disconnecting
            ? "cursor-not-allowed bg-gray-500 text-white opacity-70"
            : "cursor-pointer bg-red-600 text-white hover:-translate-y-0.5 hover:scale-105 hover:bg-red-500 hover:shadow-lg active:scale-95"
        }`}
            >
        {disconnecting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Disconnecting...</span>
          </>
        ) : (
          "Disconnect"
        )}
      </button>
    </div>
  );
}

export default ConnectedRepositoryCard;
