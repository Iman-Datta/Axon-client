import { Building2, ShieldCheck } from "lucide-react";

function ProfileOrganizations() {
  const organizations = [
    {
      name: "Axon Labs",
      role: "Owner",
    },

    {
      name: "IEM Developers",
      role: "Maintainer",
    },

    {
      name: "Open Source Hub",
      role: "Member",
    },
  ];

  return (
    <div
      className="
border
border-[#30363d]
bg-[#161b22]/70
rounded-2xl
p-5
mt-5
"
    >
      <div
        className="
flex
justify-between
mb-4
"
      >
        <h3
          className="
text-sm
font-medium
"
        >
          Organizations
        </h3>

        <span
          className="
text-xs
text-[#8b949e]
"
        >
          {organizations.length}
        </span>
      </div>

      <div
        className="
space-y-3
"
      >
        {organizations.map((org) => (
          <div
            key={org.name}
            className="
flex
items-center
justify-between
border
border-[#30363d]
bg-[#0d1117]
rounded-xl
p-3
"
          >
            <div
              className="
flex
gap-3
items-center
"
            >
              <Building2 size={18} className="text-[#2f81f7]" />

              <span className="text-sm">{org.name}</span>
            </div>

            <div
              className="
flex
gap-1
items-center
text-xs
text-green-400
"
            >
              <ShieldCheck size={13} />

              {org.role}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileOrganizations;
