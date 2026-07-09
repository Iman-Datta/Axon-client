function OrganizationCard({ organization }) {
  return (
    <div
      className="
        rounded-xl
        border
        border-[#30363d]
        bg-[#0d1117]
        p-5
        hover:border-[#58a6ff]
        transition-colors
      "
    >
      <div className="flex justify-between items-start gap-4">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-[#58a6ff] truncate">
            {organization.name}
          </h3>

          <p className="mt-2 text-sm text-[#8b949e] line-clamp-2">
            {organization.description || "Developer collaboration workspace."}
          </p>
        </div>

        <button
          className="
            shrink-0
            px-3
            py-1.5
            rounded-md
            border
            border-[#30363d]
            text-sm
            text-red-400
            hover:bg-red-500/10
            transition-colors
          "
        >
          Leave
        </button>
      </div>
    </div>
  );
}

export default OrganizationCard;
