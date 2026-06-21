import { Pencil, BookMarked, Users, Activity } from "lucide-react";

function ProfileHeader() {
  const user = {
    name: "Iman Datta",
    username: "iman-datta",
    initials: "ID",
    joined: "Joined June 2026",
  };

  const stats = [
    {
      label: "Projects",
      value: 12,
      icon: BookMarked,
    },

    {
      label: "Organizations",
      value: 3,
      icon: Users,
    },

    {
      label: "Contributions",
      value: 847,
      icon: Activity,
    },
  ];

  return (
    <section className="relative">
      {/* HERO BACKGROUND */}

      <div
        className="
relative
h-44
md:h-52
overflow-hidden
border-b
border-[#30363d]
"
      >
        <div
          className="
absolute inset-0
bg-[#0d1117]
"
        />

        <div
          className="
absolute
top-0
left-1/2
-translate-x-1/2
w-[700px]
h-[700px]
bg-blue-500/10
blur-[180px]
"
        />

        <div
          className="
absolute inset-0
opacity-[0.07]
"
          style={{
            backgroundImage:
              "linear-gradient(#30363d 1px, transparent 1px),linear-gradient(90deg,#30363d 1px,transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div
        className="
max-w-7xl
mx-auto
px-6
"
      >
        <div
          className="
relative
-mt-14
md:-mt-16
flex
flex-col
md:flex-row
md:items-end
justify-between
gap-5
pb-6
"
        >
          {/* AVATAR */}

          <div
            className="
flex
items-end
gap-5
"
          >
            <div
              className="
w-28 h-28
md:w-32 md:h-32
rounded-2xl
border-4
border-[#0d1117]
bg-gradient-to-br
from-[#2f81f7]
to-[#1f4fa8]
flex
items-center
justify-center
shadow-2xl
"
            >
              <span
                className="
text-4xl
font-bold
text-white
"
              >
                {user.initials}
              </span>
            </div>

            <div>
              <h1
                className="
text-3xl
font-bold
text-[#e6edf3]
"
              >
                {user.name}
              </h1>

              <p
                className="
text-lg
text-[#8b949e]
"
              >
                @{user.username}
              </p>

              <p
                className="
text-sm
text-[#8b949e]
mt-1
"
              >
                Building Axon • {user.joined}
              </p>
            </div>
          </div>

          <button
            className="
flex
items-center
gap-2
px-4 py-2.5
rounded-xl
border
border-[#30363d]
bg-[#161b22]
hover:bg-[#21262d]
text-sm
"
          >
            <Pencil size={15} />
            Edit profile
          </button>
        </div>

        <div
          className="
flex
gap-3
pb-6
flex-wrap
"
        >
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="
flex
items-center
gap-2
px-3.5
py-1.5
rounded-full
border
border-[#30363d]
bg-[#161b22]/70
"
            >
              <Icon size={14} className="text-[#2f81f7]" />

              <span className="font-semibold">{value}</span>

              <span
                className="
text-sm
text-[#8b949e]
"
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProfileHeader;
