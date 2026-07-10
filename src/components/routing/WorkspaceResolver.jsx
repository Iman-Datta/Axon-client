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
    const loadWorkspace = async () => {
      try {
        setLoading(true);
        // 1. Current workspace already correct
        if (currentWorkspace?.slug === slug) {
          return;
        }
        // 2. Check cache first
        const cachedWorkspace = workspaceCache[slug];

        if (cachedWorkspace) {
          dispatch(setCurrentWorkspace(cachedWorkspace));
          return;
        }
        // 3. API call
        const data = await getWorkspaceType(slug, dispatch, accessToken);

        const workspace = {
          slug,
          type: data.workspace.type,
        };

        dispatch(cacheWorkspace(workspace));
        dispatch(setCurrentWorkspace(workspace));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadWorkspace();
  }, [slug, dispatch, accessToken, currentWorkspace, workspaceCache]);

  const workspace =
    currentWorkspace?.slug === slug ? currentWorkspace : workspaceCache[slug];

  if (loading || !workspace) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (workspace.type === "personal") {
    return <Profile />;
  }

  return <OrganizationDetailsPage />;
}

export default WorkspaceResolver;
