import {
  MapPin,
  Calendar,
  Code2,
  Link as LinkIcon,
  Mail,
  Globe,
  ArrowUpRight,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function ProfileSidebar() {
  const badge = "Axon Founder";

  const bio =
    "Building Axon: a Git-aware developer collaboration platform with tickets, projects, teams and automation.";

  // Plain facts — not clickable
  const metaDetails = [
    { icon: MapPin, label: "Location", value: "Kolkata, India" },
    { icon: Calendar, label: "Joined", value: "June 2026" },
    { icon: Code2, label: "Stack", value: "Django • React • DRF" },
  ];

  // Clickable — every entry renders as a real <a href>
  const socialLinks = [
    { icon: Mail, label: "Email", href: "mailto:iman@axon.dev" },
    { icon: LinkIcon, label: "Website", href: "https://iman.dev" },
    { icon: FaGithub, label: "GitHub", href: "https://github.com/iman" },
    {
      icon: FaLinkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/iman",
    },
  ];

  const portfolioUrl = "https://iman.dev";

  return (
    <div className="border border-[#30363d] bg-[#161b22] rounded-2xl p-6 shadow-sm">
      {/* Badge */}
      <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-[#2f81f7]/10 border border-[#2f81f7]/20 text-[#2f81f7] text-xs font-semibold">
        {badge}
      </span>

      {/* Bio */}
      <p className="mt-4 text-[15px] leading-relaxed text-[#c9d1d9]">{bio}</p>

      {/* Meta facts — refined, minimal layout */}
      <dl className="mt-6 flex flex-col gap-3.5">
        {metaDetails.map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3">
            <Icon size={16} className="text-[#8b949e]" />
            <div className="flex flex-col">
              <dt className="sr-only">{label}</dt>
              <dd className="text-sm font-medium text-[#c9d1d9]">{value}</dd>
            </div>
          </div>
        ))}
      </dl>

      {/* Social icon row — sleek hover transitions */}
      <div className="mt-6 pt-6 border-t border-[#30363d] flex flex-wrap gap-3">
        {socialLinks.map(({ icon: Icon, label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={label}
            aria-label={label}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#21262d] text-[#8b949e] hover:bg-[#30363d] hover:text-[#c9d1d9] transition-all"
          >
            <Icon size={16} />
          </a>
        ))}
      </div>

      {/* Portfolio CTA — Unboxed, clean text link */}
      <a
        href={portfolioUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-[#2f81f7] hover:text-[#58a6ff] hover:underline transition-all w-fit"
      >
        <Globe size={15} />
        View Portfolio
        <ArrowUpRight size={14} className="ml-0.5" />
      </a>
    </div>
  );
}

export default ProfileSidebar;
