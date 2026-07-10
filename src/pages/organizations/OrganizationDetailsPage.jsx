import OrganizationHeader from "../../components/organization/OrganizationHeader";

function OrganizationDetailsPage() {
  const organization = {
    name: "Health Desk",
    slug: "health-desk",
    description:
      "HealthDesk is a simple healthcare management project designed to organize and manage health-related information.",
    location: "India",
    email: "dattaiman56@gmail.com",
    followers: 1,
  };

  return (
    <main className="min-h-screen bg-[#0d1117] text-[#c9d1d9] pt-20">
      <div className="max-w-7xl mx-auto px-6">
        <OrganizationHeader organization={organization} />

        <div className="mt-12">
          <h2 className="text-5xl font-bold text-white mb-4">
            Welcome to {organization.name}
          </h2>

          <p className="text-xl text-[#8b949e]">
            Organization overview content will go here.
          </p>
        </div>
      </div>
    </main>
  );
}

export default OrganizationDetailsPage;
