import { Link } from "react-router-dom";
import MemberActions from "./MemberActions";

function MemberRow({ member }) {
  return (
    <div className="grid grid-cols-[1fr_180px_140px_60px] items-center border-b border-[#21262d] px-6 py-5 transition-colors hover:bg-[#161b22]">
      {/* User */}
      <div className="flex items-center gap-4">
        <img
          src={member.avatar || "/default-avatar.png"}
          alt={member.username}
          className="h-12 w-12 rounded-full object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";
          }}
        />

        <div>
          <Link
            to={`/${member.username}`}
            className="text-lg font-medium text-[#58a6ff] hover:underline"
          >
            {member.github_username || member.username}
          </Link>

          <p className="text-[#8b949e]">@{member.username}</p>

          {member.bio && (
            <p className="mt-1 text-sm text-[#8b949e]">{member.bio}</p>
          )}
        </div>
      </div>

      {/* Membership */}
      <div>
        <span className="rounded-md border border-[#30363d] bg-[#161b22] px-3 py-1 text-xs font-medium text-[#c9d1d9]">
          direct assignment
        </span>
      </div>

      {/* Role */}
      <div>
        <span className="rounded-full border border-[#30363d] px-3 py-1 text-xs font-medium text-[#8b949e]">
          {member.role}
        </span>
      </div>

      {/* Actions */}
      <MemberActions
        onChangeRole={() => {
          console.log("change role", member);
        }}
        onRemove={() => {
          console.log("remove", member);
        }}
      />
    </div>
  );
}

export default MemberRow;
