function SidebarProfile({ user }) {
  const fullName = `${user.first_name || ""} ${user.last_name || ""}`.trim();

  return (
    <div className="flex items-center gap-4 pb-5">
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border border-[#30363d] bg-[#161b22]">
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
              bg-[#1f6feb]
              text-2xl
              font-semibold
              text-white
            "
          >
            {user.username?.[0]?.toUpperCase()}
          </div>
        )}
      </div>

      <div className="min-w-0">
        <h3 className="text-xl font-semibold text-[#e6edf3] leading-tight">
          {fullName || user.username}
          <span className="font-normal text-[#8b949e]"> ({user.username})</span>
        </h3>

        <p className="mt-1 text-sm text-[#8b949e]">Your personal account</p>
      </div>
    </div>
  );
}

export default SidebarProfile;
