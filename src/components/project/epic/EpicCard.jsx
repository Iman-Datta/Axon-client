import { Link } from "react-router-dom";
import { Calendar } from "lucide-react";

function EpicCard({ epic }) {
  const createdDate = new Date(epic.created_at).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const user = epic.created_by;

  return (
    <div className="group relative overflow-hidden rounded-lg border border-[#30363d] bg-[#161b22] transition-colors hover:border-[#3d444d]">
      <div
        className="absolute inset-y-0 left-0 w-[3px]"
        style={{ backgroundColor: epic.color }}
      />

      <div className="p-4 pl-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="truncate text-[15px] font-semibold text-[#e6edf3]">
            {epic.name}
          </h3>

          <span
            className="mt-1 h-2 w-2 shrink-0 rounded-full"
            style={{ backgroundColor: epic.color }}
          />
        </div>

        <p className="mt-1.5 line-clamp-2 min-h-[2.5rem] text-xs leading-5 text-[#8b949e]">
          {epic.description || "No description provided."}
        </p>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between border-t border-[#21262d] pt-3">
          <div className="group/user relative">
            <Link to={`/${user.username}`} className="flex items-center gap-2">
              <img
                src={user.avatar}
                alt={user.username}
                className="h-6 w-6 rounded-full object-cover ring-1 ring-[#30363d]"
              />
              <span className="text-xs font-medium text-[#c9d1d9]">
                {user.first_name}
              </span>
            </Link>

            {/* Hover Card */}
            <div className="pointer-events-none absolute bottom-8 left-0 z-20 hidden w-60 rounded-lg border border-[#30363d] bg-[#0d1117] p-3 shadow-2xl group-hover/user:block">
              <div className="flex items-center gap-2.5">
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="h-10 w-10 rounded-full object-cover ring-1 ring-[#30363d]"
                />
                <div className="min-w-0">
                  <h4 className="truncate text-sm font-semibold text-[#e6edf3]">
                    {user.first_name} {user.last_name}
                  </h4>
                  <p className="truncate text-xs text-[#8b949e]">
                    @{user.username}
                  </p>
                </div>
              </div>
              <span className="mt-2.5 inline-block rounded-full bg-[#161b22] px-2 py-0.5 text-[10px] font-medium text-[#c9d1d9] ring-1 ring-[#30363d]">
                {user.role}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-[#6e7681]">
            <Calendar className="h-3 w-3" />
            {createdDate}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EpicCard;
