function ConnectGithubCard(handleReconnectGithub) {
  return (
    <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-6">
      <h2 className="text-xl font-semibold text-white">Connect GitHub</h2>

      <p className="mt-2 text-sm text-gray-400">
        Connect your GitHub account to import repositories and enable automatic
        ticket updates.
      </p>

      <button className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500" onClick={handleReconnectGithub}>
        Connect GitHub
      </button>
    </div>
  );
}

export default ConnectGithubCard;
