import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  CircleCheck,
  ListChecks,
  ChevronRight,
  MoreHorizontal,
  Pencil,
  Copy,
  Archive,
  Trash2,
} from "lucide-react";

function EpicCard({ epic, can_edit, onClick, active, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const createdDate = new Date(epic.created_at).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const user = epic.created_by;
  const hasTickets = epic.ticket_count > 0;

  useEffect(() => {
    function close() {
      setMenuOpen(false);
    }

    window.addEventListener("click", close);

    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <div
      onClick={() => onClick(epic)}
      className={`group relative cursor-pointer overflow-hidden rounded-xl border bg-[#161b22]
          transition-all duration-300 ease-out
          active:scale-[0.99]
          hover:-translate-y-1
          hover:shadow-[0_18px_45px_rgba(0,0,0,0.35)]
          ${
            active
              ? "border-[#3d444d] ring-1 ring-[#3d444d]"
              : "border-[#30363d] hover:border-[#4a515b]"
          }`}
    >
      <div
        className="absolute bottom-0 left-0 top-0 w-1 rounded-l-xl"
        style={{ backgroundColor: epic.color }}
      />

      <div className="absolute right-3 top-3 flex items-center gap-1">
        {/* Conditionally render the options trigger and menu based on can_edit */}
        {can_edit && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((v) => !v);
              }}
              className="rounded-md p-1.5 text-[#8b949e] opacity-0 transition-all duration-200 hover:bg-[#21262d] group-hover:opacity-100"
            >
              <MoreHorizontal size={16} />
            </button>

            {menuOpen && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 top-10 z-50 w-52 overflow-hidden rounded-xl border border-[#30363d] bg-[#161b22] shadow-2xl animate-in fade-in zoom-in-95"
              >
                <button
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[#c9d1d9] transition hover:bg-[#21262d]"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(epic);
                    setMenuOpen(false);
                  }}
                >
                  <Pencil size={15} />
                  Edit Epic
                </button>

                <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[#c9d1d9] transition hover:bg-[#21262d]">
                  <Copy size={15} />
                  Duplicate
                </button>

                <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[#c9d1d9] transition hover:bg-[#21262d]">
                  <Archive size={15} />
                  Archive
                </button>

                <div className="mx-2 my-1 border-t border-[#30363d]" />

                <button
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(epic);
                    setMenuOpen(false);
                  }}
                >
                  <Trash2 size={15} />
                  Delete Epic
                </button>
              </div>
            )}
          </>
        )}

        <ChevronRight className="h-4 w-4 text-[#6e7681] opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100" />
      </div>

      <div className="p-4 pl-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pr-4">
          <h3 className="truncate text-[15px] font-semibold text-[#e6edf3]">
            {epic.name}
          </h3>
        </div>

        <p className="mt-1.5 line-clamp-2 min-h-[2.5rem] text-xs leading-5 text-[#8b949e]">
          {epic.description || "No description provided."}
        </p>

        {/* Progress */}
        <div className="mt-3.5">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-[#8b949e]">
              {hasTickets ? (
                <>
                  <ListChecks className="h-3.5 w-3.5" />
                  {epic.completed_count}/{epic.ticket_count} tickets done
                </>
              ) : (
                <span className="text-[#6e7681]">No tickets yet</span>
              )}
            </div>
            {hasTickets && (
              <span className="font-semibold text-[#e6edf3]">
                {epic.progress}%
              </span>
            )}
          </div>

          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-[#21262d]">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${epic.progress}%`,
                backgroundColor: epic.progress === 100 ? "#22C55E" : epic.color,
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between border-t border-[#21262d] pt-3">
          <div
            className="group/user relative"
            onClick={(e) => e.stopPropagation()}
          >
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
            {epic.progress === 100 && hasTickets ? (
              <CircleCheck className="h-3 w-3 text-green-400" />
            ) : (
              <Calendar className="h-3 w-3" />
            )}
            {createdDate}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EpicCard;
