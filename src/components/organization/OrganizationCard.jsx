function OrganizationCard({ organization }) {
  return (
    <div className="rounded-xl border border-gray-800 bg-[#0f172a] p-5 hover:border-blue-500 transition">
      <h2 className="text-xl font-semibold">{organization.name}</h2>

      <p className="text-gray-400 mt-3">
        {organization.description || "No description provided."}
      </p>
    </div>
  );
}

export default OrganizationCard;
