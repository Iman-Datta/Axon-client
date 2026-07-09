import OrganizationCard from "./OrganizationCard";

function OrganizationList({ organizations }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {organizations.map((organization) => (
        <OrganizationCard key={organization.id} organization={organization} />
      ))}
    </div>
  );
}

export default OrganizationList;
