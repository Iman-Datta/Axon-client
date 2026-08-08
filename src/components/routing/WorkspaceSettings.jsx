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

        if (currentWorkspace?.slug === slug) {
          return;
        }

        const cachedWorkspace = workspaceCache[slug];
        if (cachedWorkspace) {
          dispatch(setCurrentWorkspace(cachedWorkspace));
          return;
        }

        const data = await getWorkspaceType(slug, dispatch, accessToken);

        const workspace = {
          slug,
          type: data.workspace.type,
          ...data.workspace,
        };

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

  const workspace =
    currentWorkspace?.slug === slug ? currentWorkspace : workspaceCache[slug];

  if (loading || !workspace) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <WorkspaceSettingsLayout type={workspace.type} workspace={workspace} />
  );
}

export default WorkspaceSettings;
