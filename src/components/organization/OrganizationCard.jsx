function OrganizationCard({ organization }) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        px-6
        py-5
        border-b
        border-[#30363d]
        last:border-b-0
        hover:bg-[#161b22]
        transition
      "
    >
      <div>
        <h3 className="text-lg font-semibold text-blue-400">
          {organization.name}
        </h3>

        <p className="text-sm text-gray-400 mt-1">
          {organization.description || "No description provided."}
        </p>
      </div>

      <button
        className="
          px-4
          py-2
          rounded-lg
          border
          border-[#30363d]
          text-red-400
          hover:bg-red-500/10
          transition
        "
      >
        Leave
      </button>
    </div>
  );
}

export default OrganizationCard;
