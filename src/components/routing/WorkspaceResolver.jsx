import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Profile from "../../pages/Profile";
import OrganizationDetailsPage from "../../pages/organizations/OrganizationDetailsPage";

import { setCurrentWorkspace } from "../../redux/slices/workspaceSlice";

import { getWorkspaceType } from "../../services/workspaceService";

function WorkspaceResolver() {
  const { slug } = useParams();

  const dispatch = useDispatch();

  const accessToken = useSelector((state) => state.auth.accessToken);

  const workspace = useSelector((state) => state.workspace.currentWorkspace);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWorkspace = async () => {
      try {
        if (workspace?.slug === slug) {
          setLoading(false);
          return;
        }

        const data = await getWorkspaceType(slug, dispatch, accessToken);

        dispatch(
          setCurrentWorkspace({
            slug,
            type: data.type,
          }),
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    loadWorkspace();
  }, [slug, dispatch, accessToken, workspace]);

  if (loading || !workspace || workspace.slug !== slug) {
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
