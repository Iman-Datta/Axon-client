import { useSelector } from "react-redux";

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
    console.log("personal");
  } else {
    return console.log("Org");
  }
}

export default WorkspaceSettings;
