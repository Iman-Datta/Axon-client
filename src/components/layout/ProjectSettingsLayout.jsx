import { Outlet } from "react-router-dom";

import Header from "../project/Header";
import NavBar from "../settings/project/NavBar";

function ProjectSettingsLayout({
  title = "Settings",
  description = "",
  type = "project",
  context,
}) {
  return (
    <section className="min-h-screen bg-[#0d1117] pt-15">
      <Header
        title={title}
        description={description}
        type={type}
        outletContext={context.project}
      />

      <div className="mx-auto w-full px-4 sm:px-8">
        <NavBar type={type} />

        <main className="py-10">
          <Outlet context={context} />
        </main>
      </div>
    </section>
  );
}

export default ProjectSettingsLayout;
