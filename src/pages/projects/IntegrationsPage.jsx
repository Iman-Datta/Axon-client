import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchWithAuth } from "../../utils/fetchWithAuth";

import ConnectedRepositoryCard from "../../components/project/integrations/ConnectedRepositoryCard";
import ConnectGithubCard from "../../components/project/integrations/ConnectGithubCard";
import RepositorySelector from "../../components/project/integrations/RepositorySelector";
import WebhookCard from "../../components/project/integrations/WebhookCard";

const API = import.meta.env.VITE_API_URL;

function IntegrationsPage() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const { slug, project_slug } = useParams();

  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [reconnecting, setReconnecting] = useState(false);
  const [importingRepoId, setImportingRepoId] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadStatus = async () => {
      setLoading(true);
      setError(null);

      try {
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

        if (isMounted) {
          setStatus(data);
        }
      } catch (error) {
        if (isMounted) {
          console.error(error);
          setError(error.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadStatus();

    return () => {
      isMounted = false;
    };
  }, [slug, project_slug, dispatch, accessToken]);

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
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setImportingRepoId(null);
    }
  };

  const handleDisconnectRepository = async () => {
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

      // For now
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };
  if (loading) {
    return <div className="mt-18 p-6">Loading...</div>;
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
          />
        )}
    </div>
  );
}

export default IntegrationsPage;
