import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import WorkspaceSettingsLayout from "../layout/WorkspaceSettingsLayout";

import {
  setCurrentWorkspace,
  cacheWorkspace,
} from "../../redux/slices/workspaceSlice";
import { getWorkspaceType } from "../../services/workspaceService";

function WorkspaceSettings() {
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

        // 1. If it's already the active workspace in Redux, skip fetching
        if (currentWorkspace?.slug === slug) {
          return;
        }

        // 2. Check if we already cached it previously
        const cachedWorkspace = workspaceCache[slug];
        if (cachedWorkspace) {
          dispatch(setCurrentWorkspace(cachedWorkspace));
          return;
        }

        // 3. Otherwise, fetch it from the API
        const data = await getWorkspaceType(slug, dispatch, accessToken);

        const workspace = {
          slug,
          type: data.workspace.type,
          ...data.workspace, // Spread any extra data you might need later
        };

        // 4. Save to Redux
        dispatch(cacheWorkspace(workspace));
        dispatch(setCurrentWorkspace(workspace));
      } catch (error) {
        console.error("Failed to load workspace settings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadWorkspace();
    }
  }, [slug, dispatch, accessToken, currentWorkspace?.slug, workspaceCache]);

  // Use the currently resolved workspace
  const workspace =
    currentWorkspace?.slug === slug ? currentWorkspace : workspaceCache[slug];
  console.log(workspace);

  if (loading || !workspace) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (workspace.type === "personal") {
    // Passed the workspace data as a prop here so your layout can use it!
    return <WorkspaceSettingsLayout type="personal" workspace={workspace} />;
  } else {
    // Fixed a bug here: you were missing the `return` keyword
    return <div className="text-white">Organization settings coming soon.</div>;
  }
}

export default WorkspaceSettings;
