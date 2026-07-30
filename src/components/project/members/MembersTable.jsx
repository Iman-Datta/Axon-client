import MemberRow from "./MemberRow";

function MembersTable({ members }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#30363d] bg-[#0d1117] ">
      <table className="w-full">
        <thead className="bg-[#161b22]">
          <tr className="border-b border-[#30363d] text-left text-xs uppercase tracking-wider text-[#8b949e]">
            <th className="px-6 py-4 font-medium">
              Member
              <span className="ml-2 rounded-full bg-[#21262d] px-2 py-0.5 text-[10px] font-medium text-[#c9d1d9]">
                {members.length}
              </span>
            </th>

            <th className="px-6 py-4 font-medium">Role</th>

            <th className="px-6 py-4 font-medium">Joined</th>

            <th className="w-14 px-6 py-4"></th>
          </tr>
        </thead>

        <tbody>
          {members.map((member) => (
            <MemberRow key={member.id} member={member} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MembersTable;
