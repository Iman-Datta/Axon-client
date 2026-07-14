import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import useProjects from "../../hooks/useProjects";

import ProfileLayout from "../../components/shared/ProfileLayout";
import OrganizationLayout from "../../components/organization/OrganizationLayout";

import ResourceList from "../../components/shared/resource/ResourceList";
import ResourceSkeleton from "../../components/shared/resource/ResourceSkeleton";
import EmptyState from "../../components/shared/resource/EmptyState";
import NewResourceButton from "../../components/shared/resource/NewResourceButton";

function ProjectsListPage() {
  const { slug } = useParams();

  const { projects, loading, error } = useProjects(slug);

  const profile = useSelector((state) => state.auth.user);
  const currentWorkspace = useSelector(
    (state) => state.workspace.currentWorkspace,
  );

  const isOrganization = currentWorkspace?.type === "organization";

  const pageContent = (
    <>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#e6edf3]">Projects</h1>

          <p className="mt-2 text-[#8b949e]">
            Manage your personal and collaborative projects.
          </p>
        </div>

        <NewResourceButton label="New project" path="/projects/create" />
      </div>

      {projects.length === 0 ? (
        <EmptyState
          title="No projects found"
          description="Create your first project to get started."
        />
      ) : (
        <ResourceList
          resources={projects}
          type="project"
          workspaceSlug={slug}
        />
      )}
    </>
  );

  if (loading) {
    return isOrganization ? (
      <OrganizationLayout organization={currentWorkspace}>
        <ResourceSkeleton />
      </OrganizationLayout>
    ) : (
      <ProfileLayout user={profile}>
        <ResourceSkeleton />
      </ProfileLayout>
    );
  }

  if (error) {
    return isOrganization ? (
      <OrganizationLayout organization={currentWorkspace}>
        <div className="text-red-500">{error}</div>
      </OrganizationLayout>
    ) : (
      <ProfileLayout user={profile}>
        <div className="text-red-500">{error}</div>
      </ProfileLayout>
    );
  }

  return isOrganization ? (
    <OrganizationLayout organization={currentWorkspace}>
      {pageContent}
    </OrganizationLayout>
  ) : (
    <ProfileLayout user={profile}>{pageContent}</ProfileLayout>
  );
}

export default ProjectsListPage;
