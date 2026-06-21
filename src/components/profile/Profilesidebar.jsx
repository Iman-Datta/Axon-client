import { MapPin, Calendar, Link, Mail, Code2, Globe } from "lucide-react";

function ProfileSidebar() {
  const details = [
    {
      icon: MapPin,
      label: "Kolkata, India",
    },

    {
      icon: Calendar,
      label: "Joined June 2026",
    },

    {
      icon: Code2,
      label: "Django • React • DRF",
    },

    {
      icon: Link,
      label: "iman.dev",
    },

    {
      icon: Mail,
      label: "iman@axon.dev",
    },
  ];

  return (
    <div
      className="
border
border-[#30363d]
bg-[#161b22]/70
rounded-2xl
p-5
"
    >
      <div
        className="
inline-flex
items-center
px-3
py-1
rounded-full
bg-[#2f81f7]/10
text-[#2f81f7]
text-xs
font-medium
mb-4
"
      >
        Axon Founder
      </div>

      <p
        className="
text-sm
leading-relaxed
text-[#c9d1d9]
"
      >
        Building Axon 🚀 — a Git-aware developer collaboration platform with
        tickets, projects, teams and automation.
      </p>

      <div
        className="
mt-5
space-y-3
"
      >
        {details.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="
flex
items-center
gap-2.5
"
          >
            <Icon size={15} className="text-[#8b949e]" />

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

      <div
        className="
mt-5
pt-5
border-t
border-[#30363d]
"
      >
        <button
          className="
w-full
flex
gap-2
items-center
justify-center
rounded-xl
border
border-[#30363d]
py-2
hover:bg-[#21262d]
transition
"
        >
          <Globe size={16} />
          Portfolio
        </button>
      </div>
    </div>
  );
}

export default ProfileSidebar;
