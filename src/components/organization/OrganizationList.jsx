import OrganizationCard from "./OrganizationCard";

function OrganizationList({ organizations }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {organizations.map((organization) => (
        <OrganizationCard key={organization.id} organization={organization} />
      ))}
    </div>
  );
}

export default OrganizationList;
