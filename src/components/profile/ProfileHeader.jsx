import { Pencil, FolderGit2, Users, Activity } from "lucide-react";

function ProfileHeader() {
  const stats = [
    {
      label: "Projects",
      value: 12,
      icon: FolderGit2,
    },

    {
      label: "Organizations",
      value: 3,
      icon: Users,
    },

    {
      label: "Contributions",
      value: "847",
      icon: Activity,
    },
  ];

  return (
    <section>
      <div
        className="
relative h-52
overflow-hidden
border-b border-[#30363d]
bg-[#0d1117]
"
      >
        <div
          className="
absolute left-1/2
-translate-x-1/2
w-[800px]
h-[500px]
bg-blue-600/20
blur-[160px]
"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div
          className="
relative -mt-16
flex justify-between
items-end
pb-6
"
        >
          <div className="flex gap-5 items-end">
            <div
              className="
w-32 h-32 rounded-3xl
bg-gradient-to-br
from-blue-500 to-purple-600
border-4 border-[#0d1117]
flex items-center justify-center
text-white text-4xl font-bold
"
            >
              ID
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white">Iman Datta</h1>

              <p className="text-[#8b949e]">@iman-datta</p>

              <p className="text-sm text-[#8b949e]">
                Building Axon • Full Stack Developer
              </p>
            </div>
          </div>

          <button
            className="
px-4 py-2
rounded-xl
bg-[#161b22]
border border-[#30363d]
flex gap-2
hover:bg-[#21262d]
"
          >
            <Pencil size={16} />
            Edit Profile
          </button>
        </div>

        <div className="flex gap-3 pb-6">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="
px-4 py-2 rounded-full
bg-[#161b22]
border border-[#30363d]
flex items-center gap-2
"
            >
              <Icon size={15} className="text-blue-400" />

              <b>{value}</b>

              <span className="text-[#8b949e] text-sm">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProfileHeader;
