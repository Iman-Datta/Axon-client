function RepositorySelector() {
  return (
    <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-6">
      <h2 className="text-xl font-semibold text-white">Connect Repository</h2>

      <p className="mt-2 text-sm text-gray-400">
        Select a GitHub repository to connect with this project.
      </p>

      <button className="mt-6 rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-500">
        Load Repositories
      </button>
    </div>
  );
}

export default RepositorySelector;
