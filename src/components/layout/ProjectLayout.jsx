import { Outlet } from "react-router-dom";

import ProjectSidebar from "../project/Sidebar/ProjectSidebar";

function ProjectLayout() {
  return (
    <div className="flex min-h-screen bg-[#0d1117]">
      <ProjectSidebar />
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default ProjectLayout;
