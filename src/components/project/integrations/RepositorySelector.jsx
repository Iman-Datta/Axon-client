import { useEffect, useMemo, useState } from "react";
import { Search, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { fetchWithAuth } from "../../../utils/fetchWithAuth";

import LoadingCard from "../../shared/LoadingCard";

const API = import.meta.env.VITE_API_URL;

function RepositorySelector({ onImport, importingRepoId }) {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadRepositories = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetchWithAuth(
          `${API}/projects/github/repositories/`,
          {},
          dispatch,
          accessToken,
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message);
        }

        if (isMounted) {
          setRepositories(data.repositories || []);
        }
      } catch (err) {
        if (isMounted) {
          console.error(err);
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadRepositories();

    return () => {
      isMounted = false;
    };
  }, [dispatch, accessToken]);

  const filteredRepositories = useMemo(() => {
    return repositories
      .filter((repo) =>
        repo.full_name.toLowerCase().includes(search.toLowerCase()),
      )
      .slice(0, 8);
  }, [repositories, search]);

  if (loading) {
    return (
      <LoadingCard
        title="Loading repositories"
        description="Fetching your GitHub repositories..."
      />
    );
  }

  if (error) {
    return <div className="text-red-400">{error}</div>;
  }

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white">Import Git Repository</h1>

        <p className="mt-2 text-gray-400">
          Select a GitHub repository to connect with this project.
        </p>
      </div>

      <div className="mb-6 relative">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        />

        <input
          type="text"
          placeholder="Search repositories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-12 w-full rounded-xl border border-[#30363d] bg-[#0d1117] pl-12 pr-4 text-white outline-none focus:border-blue-500"
        />
      </div>
      <p className="mb-4 text-sm text-gray-500">
        Showing {filteredRepositories.length} of {repositories.length}{" "}
        repositories
      </p>
      <div className="overflow-hidden rounded-xl border border-[#30363d]">
        {filteredRepositories.map((repo) => (
          <div
            key={repo.id}
            className="flex items-center justify-between border-b border-[#21262d] bg-[#161b22] px-6 py-5 last:border-b-0"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#0d1117]">
                <img
                  src="https://github.githubassets.com/favicons/favicon.svg"
                  alt=""
                  className="h-6 w-6"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">
                  {repo.name}
                </h3>

                <p className="text-sm text-gray-400">{repo.full_name}</p>
              </div>
            </div>

            <button
              onClick={() => onImport?.(repo)}
              disabled={importingRepoId === repo.id}
              className={`flex items-center gap-2 rounded-lg px-5 py-2 font-medium transition
              ${
                importingRepoId === repo.id
                  ? "cursor-not-allowed bg-gray-500 text-white"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
            >
              {importingRepoId === repo.id ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Importing...</span>
                </>
              ) : (
                "Import"
              )}
            </button>
          </div>
        ))}

        {!filteredRepositories.length && (
          <div className="py-10 text-center text-gray-500">
            No repositories found.
          </div>
        )}
      </div>
    </div>
  );
}

export default RepositorySelector;
