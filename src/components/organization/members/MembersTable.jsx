import MemberRow from "./MemberRow";

function MembersTable({ members, can_edit, orgSlug, refetch }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117]">
      {/* Header */}
      <div className="grid grid-cols-[1fr_150px_110px_44px] items-center gap-3 border-b border-[#21262d] bg-[#161b22] px-5 py-2.5 text-[10.5px] font-semibold uppercase tracking-wide text-[#8b949e]">
        <div>Member</div>
        <div>Membership via</div>
        <div>Role</div>
        <div />
      </div>

      {/* Rows */}
      <div>
        {members.map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            orgSlug={orgSlug}
            can_edit={can_edit}
            refetch={refetch}
          />
        ))}
      </div>
    </div>
  );
}

export default MembersTable;
