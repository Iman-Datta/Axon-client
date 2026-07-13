import MemberRow from "./MemberRow";

function MembersTable({ members }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-lg">
      {members.map((member) => (
        <MemberRow key={member.id} member={member} />
      ))}
    </div>
  );
}

export default MembersTable;
