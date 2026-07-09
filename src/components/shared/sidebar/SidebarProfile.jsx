function SidebarProfile({ user }) {
  const fullName = `${user.first_name || ""} ${user.last_name || ""}`.trim();

  return (
    <div className="flex flex-col items-center text-center">
      <div className="h-20 w-20 overflow-hidden rounded-full border border-[#30363d] bg-[#161b22]">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.username}
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div
            className="
              flex
              h-full
              w-full
              items-center
              justify-center
              bg-blue-600
              text-2xl
              font-bold
              text-white
            "
          >
            {user.username?.[0]?.toUpperCase()}
          </div>
        )}
      </div>

      <p className="mt-4 text-sm text-gray-400">Profile</p>

      <h3 className="mt-1 text-lg font-semibold">
        {fullName || user.username}
        <span className="text-gray-400 font-normal"> ({user.username})</span>
      </h3>
    </div>
  );
}

export default SidebarProfile;
