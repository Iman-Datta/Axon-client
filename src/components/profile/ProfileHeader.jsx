import { Pencil, BookMarked, Users, Activity } from "lucide-react";

function ProfileHeader({ user }) {
  console.log(user);
  const fullName = `${user.first_name || ""} ${user.last_name || ""}`.trim();

  const initials =
    `${user.first_name?.[0] || ""}${user.last_name?.[0] || ""}`.toUpperCase();

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

  return (
    <section className="relative">
      <div className="relative h-44 md:h-52 overflow-hidden border-b border-[#30363d]">
        <div className="absolute inset-0 bg-[#0d1117]" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/10 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="relative -mt-14 md:-mt-16 flex justify-between items-end pb-6">
          <div className="flex items-end gap-5">
            <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-800 border-4 border-gray-950 flex items-center justify-center overflow-hidden">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.username}
                  referrerPolicy="no-referrer"
                  className="
                  w-full
                  h-full
                  object-cover
                  "
                />
              ) : (
                <span className="text-4xl font-bold text-white">
                  {initials || user.username[0].toUpperCase()}
                </span>
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
