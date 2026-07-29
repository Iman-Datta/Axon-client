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
        <RepositorySelector />
      )}

      {status.github_connected &&
        status.repository_connected &&
        !status.webhook_connected && <WebhookCard />}

      {status.github_connected &&
        status.repository_connected &&
        status.webhook_connected && (
          <ConnectedRepositoryCard integration={status.integration} />
        )}
    </div>
  );
}

export default IntegrationsPage;
