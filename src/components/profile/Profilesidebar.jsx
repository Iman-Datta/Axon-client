import {
  MapPin,
  Calendar,
  Code2,
  Mail,
  Globe,
  ArrowUpRight,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function ProfileSidebar() {
  const bio =
    "Building Axon: a Git-aware developer collaboration platform with tickets, projects, teams and automation.";

  const metaDetails = [
    { icon: MapPin, label: "Location", value: "Kolkata, India" },
    { icon: Calendar, label: "Joined", value: "June 2026" },
    { icon: Code2, label: "Stack", value: "Django · React · DRF" },
  ];

  const socialLinks = [
    {
      icon: FaGithub,
      label: "GitHub",
      handle: "Iman-Datta",
      href: "https://github.com/Iman-Datta",
    },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      handle: "iman",
      href: "https://linkedin.com/in/iman",
    },
    {
      icon: Globe,
      label: "Website",
      handle: "iman.dev",
      href: "https://iman.dev",
    },
    {
      icon: Mail,
      label: "Email",
      handle: "iman@axon.dev",
      href: "mailto:iman@axon.dev",
    },
  ];

  return (
    <aside className="relative pr-5">
      <div className="pointer-events-none absolute right-0 top-1 bottom-1 w-px bg-gradient-to-b from-transparent via-[#30363d] to-transparent" />

      {/* Identity */}

      {/* About */}
      <div className="mt-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8b949e]">
          About
        </h2>
        <p className="mt-3 text-[14px] leading-relaxed text-[#c9d1d9]">{bio}</p>
      </div>

      {/* Profile details */}
      <div className="mt-6 border-t border-[#21262d] pt-6">
        <dl className="space-y-3.5">
          {metaDetails.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#161b22] ring-1 ring-[#21262d]">
                <Icon size={14} className="text-[#8b949e]" />
              </span>
              <div className="min-w-0 leading-tight">
                <dt className="text-[11px] text-[#6e7681]">{label}</dt>
                <dd className="truncate text-sm text-[#c9d1d9]">{value}</dd>
              </div>
            </div>
          ))}
        </dl>
      </div>

      {/* Links */}
      <div className="mt-6 border-t border-[#21262d] pt-6">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8b949e]">
          Links
        </h2>

        <div className="mt-3 space-y-1">
          {socialLinks.map(({ icon: Icon, label, handle, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="group -mx-2 flex items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-[#161b22]"
            >
              <Icon
                size={16}
                className="shrink-0 text-[#8b949e] transition-colors group-hover:text-[#e6edf3]"
              />
              <span className="min-w-0 flex-1">
                <span className="block text-sm text-[#c9d1d9] group-hover:text-[#e6edf3]">
                  {label}
                </span>
                <span className="block truncate text-xs text-[#6e7681]">
                  {handle}
                </span>
              </span>
              <ArrowUpRight
                size={13}
                className="shrink-0 text-[#6e7681] opacity-0 transition-opacity group-hover:opacity-100"
              />
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default ProfileSidebar;
