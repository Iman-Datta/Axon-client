import { useEffect, useState } from "react";
import { useParams as useRouteParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentWorkspace,
  cacheWorkspace,
} from "../../redux/slices/workspaceSlice";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;

function WorkspaceLoader({ children }) {
  const { slug } = useRouteParams();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const currentWorkspace = useSelector(
    (state) => state.workspace.currentWorkspace,
  );
  const workspaceCache = useSelector((state) => state.workspace.workspaceCache);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const ensureWorkspaceLoaded = async () => {
      try {
        setLoading(true);
        if (currentWorkspace?.slug === slug && currentWorkspace?.type) {
          return;
        }

        const cached = workspaceCache[slug];
        if (cached && (cached.type === "personal" || cached.id)) {
          dispatch(setCurrentWorkspace(cached));
          return;
        }

        // Fetch full org details on sub-page reload
        const res = await fetchWithAuth(
          `${API}/org/${slug}/`,
          {},
          dispatch,
          accessToken,
        );
        const orgData = await res.json();

        if (res.ok && orgData.organization) {
          const fullOrg = { ...orgData.organization, type: "organization" };
          if (isMounted) {
            dispatch(cacheWorkspace(fullOrg));
            dispatch(setCurrentWorkspace(fullOrg));
          }
        } else {
          // Fallback to personal if org not found
          const personalWs = { slug, type: "personal" };
          if (isMounted) {
            dispatch(cacheWorkspace(personalWs));
            dispatch(setCurrentWorkspace(personalWs));
          }
        }
      } catch (err) {
        console.error("Workspace loader error:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    ensureWorkspaceLoaded();

    return () => {
      isMounted = false;
    };
  }, [slug, dispatch, accessToken, currentWorkspace, workspaceCache]);

  const workspace =
    currentWorkspace?.slug === slug ? currentWorkspace : workspaceCache[slug];

  if (loading || !workspace) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#8b949e] bg-[#0d1117]">
        Loading context...
      </div>
    );
  }

  return children;
}

export default WorkspaceLoader;
