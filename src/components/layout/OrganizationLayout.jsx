import OrganizationHeader from "../organization/OrganizationHeader";

function OrganizationLayout({ organization, children }) {
  return (
    <main className="min-h-screen bg-[#0d1117] text-[#c9d1d9] pt-20">
      <div className="max-w-7xl mx-auto px-6">
        <OrganizationHeader organization={organization} />

        <section className="mt-8">{children}</section>
      </div>
    </main>
  );
}

export default OrganizationLayout;
