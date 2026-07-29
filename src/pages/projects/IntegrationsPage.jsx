import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

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
