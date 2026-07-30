import { MoreHorizontal } from "lucide-react";

const ROLE_STYLES = {
  OWNER: { dot: "bg-purple-400", text: "text-purple-400" },
  LEAD: { dot: "bg-blue-400", text: "text-blue-400" },
  DEVELOPER: { dot: "bg-green-400", text: "text-green-400" },
  VIEWER: { dot: "bg-gray-400", text: "text-gray-400" },
};

function MemberRow({ member }) {
  const joinedDate = new Date(member.joined_at).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const role = ROLE_STYLES[member.role] || ROLE_STYLES.VIEWER;

  return (
    <tr className="group border-b border-[#21262d] last:border-b-0 transition-colors hover:bg-[#161b22]">
      {/* Member */}
      <td className="px-5 py-3">
        <div className="flex items-center gap-3">
          <img
            src={member.avatar}
            alt={member.username}
            className="h-9 w-9 rounded-full object-cover ring-1 ring-[#30363d]"
            onError={(e) => {
              e.currentTarget.src = "/default-avatar.png";
            }}
          />

          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[#e6edf3]">
              {member.first_name} {member.last_name}
            </p>

            <div className="mt-0.5 flex items-center gap-1.5 text-xs text-[#8b949e]">
              <span className="truncate">@{member.username}</span>

              {member.github_username && (
                <>
                  <span className="text-[#30363d]">•</span>
                  <a
                    href={`https://github.com/${member.github_username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate text-[#58a6ff] hover:underline"
                  >
                    {member.github_username}
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </td>

      {/* Role */}
      <td className="px-5 py-3">
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-medium ${role.text}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${role.dot}`} />
          {member.role.charAt(0) + member.role.slice(1).toLowerCase()}
        </span>
      </td>

      {/* Joined */}
      <td className="px-5 py-3 text-xs text-[#8b949e]">{joinedDate}</td>

      {/* Actions */}
      <td className="px-5 py-3 text-right">
        <button className="rounded-md p-1.5 text-[#8b949e] opacity-0 transition group-hover:opacity-100 hover:bg-[#21262d] hover:text-[#e6edf3]">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </td>
    </tr>
  );
}

export default MemberRow;
