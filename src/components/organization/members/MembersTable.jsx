import MemberRow from "./MemberRow";

function MembersTable({ members }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117]">
      {/* Header */}
      <div className="grid grid-cols-[1fr_180px_140px_60px] items-center border-b border-[#30363d] bg-[#161b22] px-6 py-4 text-sm font-medium text-[#8b949e]">
        <div>Members</div>

        <div>Membership Via</div>

        <div>Role</div>

        <div />
      </div>

      {/* Rows */}
      <div>
        {members.map((member) => (
          <MemberRow key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}

export default MembersTable;
