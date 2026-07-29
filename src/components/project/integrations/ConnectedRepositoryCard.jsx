function ConnectedRepositoryCard({ integration, onDisconnect }) {
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
        className="mt-6 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-500"
      >
        Disconnect
      </button>
    </div>
  );
}

export default ConnectedRepositoryCard;
