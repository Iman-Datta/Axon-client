import { Link } from "react-router-dom";

function MemberRow({ member }) {
  console.log(member);
  console.log(member.username, member.avatar);
  return (
    <div className="flex items-center justify-between p-5 border-b border-[#30363d] hover:bg-[#161b22] transition-colors">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        <img
          src={member.avatar || "/default-avatar.png"}
          alt={member.username}
          className="w-12 h-12 rounded-full object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";
          }}
        />

        <div>
          <Link
            to={`/${member.username}`}
            className="font-semibold text-[#e6edf3] hover:text-[#58a6ff] hover:underline"
          >
            {member.github_username || member.username}
          </Link>

          <p className="text-sm text-[#8b949e]">@{member.username}</p>

          {member.bio && (
            <p className="text-sm text-[#8b949e] mt-1">{member.bio}</p>
          )}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        <span
          className="
            rounded-full
            border
            border-[#30363d]
            px-3
            py-1
            text-xs
            font-medium
            text-[#8b949e]
          "
        >
          {member.role}
        </span>
      </div>
    </div>
  );
}

export default MemberRow;
