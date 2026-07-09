import OrganizationCard from "./OrganizationCard";

function OrganizationList({ organizations }) {
  return (
    <div className="border border-[#30363d] rounded-xl overflow-hidden">
      {organizations.map((organization) => (
        <OrganizationCard key={organization.id} organization={organization} />
      ))}
    </div>
  );
}

export default OrganizationList;
