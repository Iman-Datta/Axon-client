import { Pencil, BookMarked, Users, Activity } from "lucide-react";

function ProfileHeader({ user }) {
  const fullName = `${user.first_name || ""} ${user.last_name || ""}`.trim();

  const stats = [
    {
      label: "Projects",
      value: 0,
      icon: BookMarked,
    },

    {
      label: "Organizations",
      value: 0,
      icon: Users,
    },

    {
      label: "Contributions",
      value: 0,
      icon: Activity,
    },
  ];
  console.log(user.avatar);
  return (
    <section className="relative">
      <div className="relative h-44 md:h-52 overflow-hidden border-b border-[#30363d]">
        <div className="absolute inset-0 bg-[#0d1117]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="relative -mt-14 md:-mt-16 flex justify-between items-end pb-6">
          <div className="flex items-end gap-5">
            <div className="h-56 w-56 overflow-hidden rounded-full border-4 border-[#30363d] bg-[#161b22] shadow-xl shadow-black/30">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.username}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#3b82f6,#1d4ed8)] text-6xl font-bold text-white">
                  {user.username?.[0]?.toUpperCase()}
                </div>
              )}
            </div>

            <div>
              <h1 className="text-3xl font-bold text-[#e6edf3]">
                {fullName || user.username}
              </h1>

              <p className="text-lg text-[#8b949e]">@{user.username}</p>

              <p className="text-sm text-[#8b949e] mt-1">
                {user.bio || "Building with Axon"}
              </p>
            </div>
          </div>

          <button
            className="
            flex
            gap-2
            px-4
            py-2
            rounded-xl
            bg-[#161b22]
            border
            border-[#30363d]
            "
          >
            <Pencil size={15} />
            Edit profile
          </button>
        </div>

        <div className="flex gap-3 pb-6">
          {stats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="
              flex
              gap-2
              px-4
              py-2
              rounded-full
              bg-[#161b22]
              border
              border-[#30363d]
              "
            >
              <Icon size={14} />

              {value}

              <span className="text-[#8b949e]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProfileHeader;
