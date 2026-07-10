import ResourceCard from "./ResourceCard";

function ResourceList({ resources, type, actionText, onAction }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#30363d]">
      {resources.map((resource) => (
        <ResourceCard
          key={resource.id}
          resource={resource}
          type={type}
          actionText={actionText}
          onAction={onAction}
        />
      ))}
    </div>
  );
}

export default ResourceList;
