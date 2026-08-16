import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ShieldAlert, Lock } from "lucide-react";

import { fetchWithAuth } from "../../utils/fetchWithAuth";

import ConnectedRepositoryCard from "../../components/project/integrations/ConnectedRepositoryCard";
import ConnectGithubCard from "../../components/project/integrations/ConnectGithubCard";
import RepositorySelector from "../../components/project/integrations/RepositorySelector";
import WebhookCard from "../../components/project/integrations/WebhookCard";
import LoadingCard from "../../components/shared/LoadingCard";

const API = import.meta.env.VITE_API_URL;

function IntegrationsPage() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const { slug, project_slug } = useParams();

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [importingRepoId, setImportingRepoId] = useState(null);
  const [reconnecting, setReconnecting] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);

  const fetchStatus = useCallback(async () => {
    const res = await fetchWithAuth(
      `${API}/projects/${slug}/${project_slug}/github/status/`,
      {},
      dispatch,
      accessToken,
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to load status");
    }

    return data;
  }, [slug, project_slug, dispatch, accessToken]);

  const refreshStatus = useCallback(async () => {
    try {
      const data = await fetchStatus();
      setStatus(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }, [fetchStatus]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchStatus();

        if (!cancelled) {
          setStatus(data);
        }
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [fetchStatus]);

  const handleReconnectGithub = async () => {
    console.log("Reconnect clicked");
    try {
      setReconnecting(true);

      const res = await fetchWithAuth(
        `${API}/auth/github/connect/`,
        {},
        dispatch,
        accessToken,
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Unable to connect GitHub.");
      }

      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setReconnecting(false);
    }
  };

  const handleImportRepository = async (repo) => {
    setImportingRepoId(repo.id);
    try {
      // Connect repository
      const connectRes = await fetchWithAuth(
        `${API}/projects/${slug}/${project_slug}/github/connect/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            repository_id: repo.id,
          }),
        },
        dispatch,
        accessToken,
      );

      const connectData = await connectRes.json();

      if (!connectRes.ok) {
        throw new Error(connectData.message || "Failed to connect repository.");
      }

      // Create webhook
      const webhookRes = await fetchWithAuth(
        `${API}/projects/${slug}/${project_slug}/github/create-webhook/`,
        {
          method: "POST",
        },
        dispatch,
        accessToken,
      );

      const webhookData = await webhookRes.json();

      if (!webhookRes.ok) {
        throw new Error(webhookData.message || "Failed to create webhook.");
      }

      // Refresh UI
      await refreshStatus();
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setImportingRepoId(null);
    }
  };

  const handleDisconnectRepository = async () => {
    setDisconnecting(true);
    try {
      const res = await fetchWithAuth(
        `${API}/projects/${slug}/${project_slug}/github/disconnect/`,
        {
          method: "DELETE",
        },
        dispatch,
        accessToken,
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to disconnect repository.");
      }

      // Reload
      await refreshStatus();
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setDisconnecting(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-18 p-6">
        <LoadingCard
          title="Loading integration"
          description="Checking your GitHub integration status..."
        />
      </div>
    );
  }

  if (error) {
    return <div className="mt-18 p-6 text-red-500">{error}</div>;
  }

  // Handle lack of access professionally
  if (status && status.access === false) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="rounded-xl border border-[#30363d] bg-[#161b22] shadow-2xl overflow-hidden">
            {/* Top accent line */}
            <div className="h-1 bg-gradient-to-r from-red-500/60 via-red-500/30 to-transparent" />

            <div className="p-8 flex flex-col items-center text-center">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400 ring-1 ring-red-500/20 mb-5">
                <ShieldAlert size={22} strokeWidth={2} />
              </div>

              <h2 className="text-base font-semibold text-[#e6edf3] tracking-tight">
                Restricted Access
              </h2>

              <p className="mt-2 text-sm text-[#8b949e] leading-relaxed max-w-sm">
                Only project owners or Lead can manage GitHub
                integrations for this project. Contact a project administrator
                if you need changes made.
              </p>

              <div className="mt-6 flex items-center gap-2 text-xs text-[#6e7681] bg-[#0d1117] border border-[#21262d] rounded-lg px-3 py-2">
                <Lock size={12} />
                <span>
                  Requires{" "}
                  <span className="text-[#8b949e] font-medium">Owner</span> or{" "}
                  <span className="text-[#8b949e] font-medium">Lead</span> role
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-18 p-6">
      {!status.github_connected && (
        <ConnectGithubCard
          expired={status.github_token_expired}
          onReconnect={handleReconnectGithub}
          loading={reconnecting}
        />
      )}

      {status.github_connected && !status.repository_connected && (
        <RepositorySelector
          onImport={handleImportRepository}
          importingRepoId={importingRepoId}
        />
      )}

      {status.github_connected &&
        status.repository_connected &&
        !status.webhook_connected && <WebhookCard />}

      {status.github_connected &&
        status.repository_connected &&
        status.webhook_connected && (
          <ConnectedRepositoryCard
            integration={status.integration}
            onDisconnect={handleDisconnectRepository}
            disconnecting={disconnecting}
          />
        )}
    </div>
  );
}

export default IntegrationsPage;
