import { MapPin, Calendar, Link, Mail, Code2, Globe } from "lucide-react";

function ProfileSidebar() {
  const details = [
    {
      icon: MapPin,
      text: "Kolkata, India",
    },

    {
      icon: Calendar,
      text: "Joined June 2026",
    },

    {
      icon: Code2,
      text: "Django • React • DRF",
    },

    {
      icon: Link,
      text: "iman.dev",
    },

    {
      icon: Mail,
      text: "iman@axon.dev",
    },
  ];

  const socials = [
    {
      icon: Globe,
      label: "Portfolio",
    },

    {
      icon: Link,
      label: "Website",
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
      <div
        className="
        inline-block
        px-3 py-1
        rounded-full
        bg-blue-500/10
        text-blue-400
        text-xs
        mb-4
        "
      >
        Founder
      </div>

      <p
        className="
        text-sm
        leading-relaxed
        text-[#c9d1d9]
        "
      >
        Building Axon 🚀 — a Git aware developer collaboration platform with
        projects, tickets and automation.
      </p>

      <div className="mt-5 space-y-3">
        {details.map(({ icon: Icon, text }) => (
          <div
            key={text}
            className="
              flex gap-3 items-center
              "
          >
            <Icon size={16} className="text-[#8b949e]" />

            <span
              className="
                text-sm
                text-[#8b949e]
                "
            >
              {text}
            </span>
          </div>
        ))}
      </div>

      <div
        className="
        flex gap-2
        mt-5 pt-5
        border-t
        border-[#30363d]
        "
      >
        {socials.map(({ icon: Icon, label }) => (
          <button
            key={label}
            title={label}
            className="
              w-9 h-9
              rounded-lg
              border border-[#30363d]
              flex
              items-center
              justify-center
              hover:bg-[#21262d]
              transition
              "
          >
            <Icon size={16} />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProfileSidebar;
