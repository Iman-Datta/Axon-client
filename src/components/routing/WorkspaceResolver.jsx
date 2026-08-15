import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Profile from "../../pages/Profile";
import OrganizationDetailsPage from "../../pages/organizations/OrganizationDetailsPage";

import {
  setCurrentWorkspace,
  cacheWorkspace,
} from "../../redux/slices/workspaceSlice";

import { getWorkspaceType } from "../../services/workspaceService";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;

function WorkspaceResolver() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const currentWorkspace = useSelector(
    (state) => state.workspace.currentWorkspace,
  );
  const workspaceCache = useSelector((state) => state.workspace.workspaceCache);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadWorkspace = async () => {
      try {
        setLoading(true);
        if (currentWorkspace?.slug === slug && currentWorkspace?.type) {
          return;
        }

        const cachedWorkspace = workspaceCache[slug];
        // Use cache only if it has full organization details or is personal
        if (
          cachedWorkspace &&
          (cachedWorkspace.type === "personal" || cachedWorkspace.id)
        ) {
          dispatch(setCurrentWorkspace(cachedWorkspace));
          return;
        }

        const data = await getWorkspaceType(slug, dispatch, accessToken);
        const workspaceType = data.workspace.type;

        if (workspaceType === "personal") {
          const personalWs = { slug, type: "personal" };
          if (isMounted) {
            dispatch(cacheWorkspace(personalWs));
            dispatch(setCurrentWorkspace(personalWs));
          }
        } else {
          // Fetch full organization payload so it's ready globally
          const res = await fetchWithAuth(
            `${API}/org/${slug}/`,
            {},
            dispatch,
            accessToken,
          );
          const orgData = await res.json();

          if (!res.ok) {
            throw new Error(orgData.message || "Failed to fetch organization.");
          }

          const fullOrg = {
            ...orgData.organization,
            type: "organization",
          };

          if (isMounted) {
            dispatch(cacheWorkspace(fullOrg));
            dispatch(setCurrentWorkspace(fullOrg));
          }
        }
      } catch (error) {
        console.error("Failed to resolve workspace:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadWorkspace();

    return () => {
      isMounted = false;
    };
  }, [slug, dispatch, accessToken, currentWorkspace, workspaceCache]);

  const workspace =
    currentWorkspace?.slug === slug ? currentWorkspace : workspaceCache[slug];

  if (loading || !workspace) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white bg-[#0d1117]">
        Loading workspace...
      </div>
    );
  }

  if (workspace.type === "personal") {
    return <Profile />;
  }

  return <OrganizationDetailsPage />;
}

export default WorkspaceResolver;
