import {
  MapPin,
  Calendar,
  Users,
  FolderGit2,
  Heart,
  BadgeCheck,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

// Small pill used for both the stat row and the verified/connected badges.
function StatChip({ icon: Icon, label, tone = "muted" }) {
  const toneClass =
    tone === "accent"
      ? "text-[#58a6ff]"
      : tone === "success"
        ? "text-[#3fb950]"
        : "text-[#8b949e]";

  return (
    <span className="flex items-center gap-1.5 text-sm text-[#8b949e]">
      <Icon size={15} className={toneClass} strokeWidth={1.75} />
      <span className="text-[#c9d1d9]">{label}</span>
    </span>
  );
}

function Avatar({ type, details }) {
  if (type === "organization") {
    // If organization has an uploaded avatar/logo link, display it
    if (details?.avatar) {
      return (
        <img
          src={details.avatar}
          alt={details.name}
          className="h-16 w-16 shrink-0 rounded-xl object-cover ring-1 ring-[#30363d]"
          referrerPolicy="no-referrer"
        />
      );
    }

    // Fallback initials generator if no avatar exists
    const initials = (details?.name || "?")
      .split(" ")
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

    return (
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1f6feb] to-[#8957e5] text-lg font-semibold text-white ring-1 ring-[#30363d]">
        {initials}
      </div>
    );
  }

  if (details?.avatar) {
    return (
      <img
        src={details.avatar}
        alt={details.username}
        className="h-28 w-28 shrink-0 rounded-full object-cover ring-1 ring-[#30363d]"
        referrerPolicy="no-referrer"
      />
    );
  }

  const initials = `${details?.first_name?.[0] || ""}${
    details?.last_name?.[0] || ""
  }`.toUpperCase();

  return (
    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#1f6feb] to-[#8957e5] text-lg font-semibold text-white ring-1 ring-[#30363d]">
      {initials || "?"}
    </div>
  );
}

function formatJoined(dateStr) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function SettingsHeader({ type, details }) {
  const isOrg = type === "organization";

  const name = isOrg
    ? details?.name
    : `${details?.first_name || ""} ${details?.last_name || ""}`.trim();

  const handle = isOrg ? details?.slug : details?.username;
  const description = isOrg ? details?.description : details?.bio;
  const joined = formatJoined(details?.created_at);

  return (
    <div className="pb-5 pt-3">
      <p className="mb-5 text-xs font-semibold uppercase tracking-wider text-[#6e7681]">
        Settings
      </p>

      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <Avatar type={type} details={details} />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <h1 className="text-xl font-semibold text-[#e6edf3]">
              {name || (isOrg ? "Untitled organization" : "Unnamed user")}
            </h1>
            {handle && (
              <span className="text-sm text-[#6e7681]">@{handle}</span>
            )}
          </div>

          {description && (
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#8b949e]">
              {description}
            </p>
          )}

          {/* Verified / connected badges — personal accounts only */}
          {!isOrg &&
            (details?.is_email_verified || details?.is_github_connected) && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {details?.is_email_verified && (
                  <span className="flex items-center gap-1.5 rounded-full bg-[#3fb950]/10 px-2.5 py-1 text-xs font-medium text-[#3fb950]">
                    <BadgeCheck size={13} />
                    Email verified
                  </span>
                )}
                {details?.is_github_connected && (
                  <a
                    href={details.github_profile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-full bg-[#161b22] px-2.5 py-1 text-xs font-medium text-[#c9d1d9] ring-1 ring-[#30363d] transition-colors hover:text-[#e6edf3]"
                  >
                    <FaGithub size={12} />
                    {details.github_username}
                  </a>
                )}
              </div>
            )}

          {/* Stat row */}
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
            {isOrg ? (
              <>
                <StatChip
                  icon={Users}
                  label={`${details?.members_count ?? 0} members`}
                />
                <StatChip
                  icon={FolderGit2}
                  label={`${details?.projects_count ?? 0} projects`}
                />
                <StatChip
                  icon={Heart}
                  label={`${details?.followers_count ?? 0} followers`}
                />
              </>
            ) : (
              details?.location && (
                <StatChip icon={MapPin} label={details.location} />
              )
            )}

            {joined && <StatChip icon={Calendar} label={`Joined ${joined}`} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsHeader;
