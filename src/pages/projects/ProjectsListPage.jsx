// pages/projects/ProjectsListPage.jsx
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import useProjects from "../../hooks/useProjects";

import ProfileLayout from "../../components/shared/ProfileLayout";
import OrganizationLayout from "../../components/layout/OrganizationLayout";

import ProjectsHeader from "../../components/project/ProjectsHeader";
import ResourceList from "../../components/shared/resource/ResourceList";
import ResourceSkeleton from "../../components/shared/resource/ResourceSkeleton";
import EmptyState from "../../components/shared/resource/EmptyState";

function ProjectsListPage() {
  const { slug } = useParams();

  const { projects, loading, error } = useProjects(slug);

  const profile = useSelector((state) => state.auth.user);
  const currentWorkspace = useSelector(
    (state) => state.workspace.currentWorkspace,
  );

  const isOrganization = currentWorkspace?.type === "organization";

  const pageContent = (
    <div className="space-y-8">
      <ProjectsHeader
        count={projects.length}
        workspaceName={isOrganization ? currentWorkspace?.name : null}
      />

      {projects.length === 0 ? (
        <EmptyState
          title="No projects found"
          description="Create your first project to get started."
        />
      ) : (
        <ResourceList resources={projects} type="project" />
      )}
    </div>
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
