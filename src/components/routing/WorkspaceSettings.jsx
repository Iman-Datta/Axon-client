import { useSelector } from "react-redux";

import ProfileSettings from "../../pages/settings/personal/ProfileSettings";

function WorkspaceSettings() {
  console.log("Setting");
  const workspace = useSelector((state) => state.workspace.currentWorkspace);
  console.log(workspace);

  if (!workspace) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (workspace.type === "personal") {
    return <ProfileSettings />;
  } else {
    <div className="text-white">Organization settings coming soon.</div>;
  }
}

export default WorkspaceSettings;
