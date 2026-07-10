import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import useProjects from "../../hooks/useProjects";

import ProfileLayout from "../../components/shared/ProfileLayout";

import ResourceList from "../../components/shared/resource/ResourceList";
import ResourceSkeleton from "../../components/shared/resource/ResourceSkeleton";
import EmptyState from "../../components/shared/resource/EmptyState";
import NewResourceButton from "../../components/shared/resource/NewResourceButton";

function ProjectsPage() {
  const { slug } = useParams();
  const { projects, loading, error } = useProjects(slug);

  const profile = useSelector((state) => state.auth.user);

  if (loading) {
    return (
      <ProfileLayout user={profile}>
        <ResourceSkeleton />
      </ProfileLayout>
    );
  }

  if (error) {
    return (
      <ProfileLayout user={profile}>
        <div className="text-red-500">{error}</div>
      </ProfileLayout>
    );
  }

  return (
    <ProfileLayout user={profile}>
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
    </ProfileLayout>
  );
}

export default ProjectsPage;
