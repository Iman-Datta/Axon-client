import { Users, ArrowRight } from "lucide-react";

function getInitials(name = "") {
  return name
    .split(/[\s_.-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
}

const ROLE_STYLES = {
  OWNER: "border-[#30363d] bg-[#21262d] text-[#c9d1d9]",
  LEAD: "border-[#30363d] bg-[#21262d] text-[#c9d1d9]",
  DEVELOPER: "border-[#30363d] bg-[#21262d] text-[#8b949e]",
  VIEWER: "border-[#30363d] bg-[#21262d] text-[#8b949e]",
  DEFAULT: "border-[#30363d] bg-[#21262d] text-[#8b949e]",
};

const VISIBLE_LIMIT = 3;

function TeamMembersSkeleton() {
  return (
    <div className="mt-4 space-y-2.5 animate-pulse">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="flex items-center justify-between rounded-xl border border-[#21262d] bg-[#0d1117]/60 p-2.5"
        >
          <div className="flex items-center gap-2.5">
            {/* Avatar Skeleton */}
            <div className="h-8 w-8 shrink-0 rounded-full bg-[#21262d]" />
            {/* Name & Username Skeleton */}
            <div className="space-y-1.5">
              <div className="h-3 w-24 rounded bg-[#21262d]" />
              <div className="h-2.5 w-16 rounded bg-[#21262d]" />
            </div>
          </div>
          {/* Role Badge Skeleton */}
          <div className="h-5 w-14 rounded-md bg-[#21262d]" />
        </div>
      ))}
    </div>
  );
}

function TeamMembersCard({ members = [], loading = false, onViewAllMembers }) {
  return (
    <div className="rounded-2xl border border-[#30363d] bg-[#161b22] p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#21262d] text-[#58a6ff] ring-1 ring-[#30363d]">
            <Users size={14} />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#c9d1d9]">
            Team Members
          </span>
        </div>

        <button
          type="button"
          onClick={onViewAllMembers}
          disabled={loading}
          className="flex cursor-pointer items-center gap-1 text-xs font-medium text-[#58a6ff] hover:text-white disabled:opacity-50"
        >
          View all ({loading ? "..." : members.length})
          <ArrowRight size={12} />
        </button>
      </div>

      {loading ? (
        <TeamMembersSkeleton />
      ) : (
        <div className="mt-4 space-y-2.5">
          {members.length === 0 && (
            <p className="text-xs text-[#8b949e]">No team members found.</p>
          )}

          {members.slice(0, VISIBLE_LIMIT).map((member) => {
            const roleStyle = ROLE_STYLES[member.role] ?? ROLE_STYLES.DEFAULT;
            const fullName = [member.first_name, member.last_name]
              .filter(Boolean)
              .join(" ");
            const displayName = fullName || member.username;

            return (
              <div
                key={member.id}
                className="flex items-center justify-between rounded-xl border border-[#21262d] bg-[#0d1117]/60 p-2.5"
              >
                <div className="flex min-w-0 items-center gap-2.5">
                  {member.avatar ? (
                    <img
                      src={member.avatar}
                      alt={displayName}
                      className="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-[#30363d]"
                    />
                  ) : (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#21262d] text-xs font-bold text-[#c9d1d9] ring-1 ring-[#30363d]">
                      {getInitials(displayName)}
                    </div>
                  )}

                  <div className="min-w-0 leading-tight">
                    <p className="truncate text-xs font-semibold text-[#f0f6fc]">
                      {displayName}
                    </p>
                    <p className="truncate text-[11px] text-[#8b949e]">
                      @{member.username}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${roleStyle}`}
                >
                  {member.role}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TeamMembersCard;
