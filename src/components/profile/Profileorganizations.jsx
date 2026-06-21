import { Building2, Shield } from "lucide-react";

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
rounded-2xl
border border-[#30363d]
bg-[#161b22]/70
p-5
"
    >
      <h3 className="mb-4 font-medium">Organizations</h3>

      <div className="space-y-3">
        {organizations.map((org) => (
          <div
            key={org.name}
            className="
flex justify-between
items-center
p-3
rounded-xl
bg-[#0d1117]
border border-[#30363d]
"
          >
            <div className="flex gap-3 items-center">
              <Building2 size={18} className="text-blue-400" />

              <span>{org.name}</span>
            </div>

            <span
              className="
text-xs
text-green-400
flex gap-1
"
            >
              <Shield size={13} />

              {org.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfileOrganizations;
