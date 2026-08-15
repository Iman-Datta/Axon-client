import { useOutletContext } from "react-router-dom";
import ProjectSettingsLayout from "../../components/layout/ProjectSettingsLayout";

function ProjectSettings() {
  const { project, setProject } = useOutletContext();

  return (
    <ProjectSettingsLayout
      title="Project Settings"
      description="Manage your project's configuration and preferences."
      type="project"
      context={{
        project,
        setProject,
      }}
    />
  );
}

export default ProjectSettings;
