import OrganizationCard from "./OrganizationCard";

function OrganizationList({ organizations }) {
  return (
    <div
      className="
        overflow-hidden
        rounded-xl
        border
        border-[#30363d]
      "
    >
      {organizations.map((organization) => (
        <OrganizationCard key={organization.id} organization={organization} />
      ))}
    </div>
  );
}

export default OrganizationList;
