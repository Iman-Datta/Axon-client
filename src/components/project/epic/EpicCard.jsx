function EpicCard({ epic }) {
  const createdDate = new Date(epic.created_at).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      className="group overflow-hidden rounded-2xl border border-[#30363d] bg-[#161b22] transition-all duration-300 hover:-translate-y-1 hover:border-[#3d444d] hover:shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
      style={{
        borderTop: `4px solid ${epic.color}`,
      }}
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <div
              className="mt-1 h-3 w-3 shrink-0 rounded-full"
              style={{
                backgroundColor: epic.color,
              }}
            />

            <div className="min-w-0">
              <h3 className="truncate text-lg font-semibold text-[#e6edf3]">
                {epic.name}
              </h3>

              <p className="mt-2 line-clamp-2 text-sm text-[#8b949e]">
                {epic.description || "No description provided."}
              </p>
            </div>
          </div>

          <span
            className="h-3 w-3 shrink-0 rounded-full"
            style={{
              backgroundColor: epic.color,
            }}
          />
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-[#21262d] pt-4">
          <div>
            <p className="text-[11px] uppercase tracking-wider text-[#6e7681]">
              Created By
            </p>

            <p className="mt-1 text-sm font-medium text-[#c9d1d9]">
              {epic.created_by}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[11px] uppercase tracking-wider text-[#6e7681]">
              Created
            </p>

            <p className="mt-1 text-sm font-medium text-[#c9d1d9]">
              {createdDate}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EpicCard;
