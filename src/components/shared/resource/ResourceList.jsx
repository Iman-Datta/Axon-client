import ResourceCard from "./ResourceCard";

function ResourceList({ resources, type }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#21262d] bg-[#0d1117]">
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} type={type} />
      ))}
    </div>
  );
}

export default ResourceList;
