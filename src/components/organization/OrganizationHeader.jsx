import { Users, MapPin, Mail, Building2 } from "lucide-react";

function OrganizationHeader({ organization }) {
  return (
    <div className="border-b border-[#30363d] pb-10">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
        {/* Left */}
        <div className="flex gap-8">
          {/* Avatar */}
          <div
            className="
              h-32
              w-32
              rounded-2xl
              bg-[#161b22]
              border
              border-[#30363d]
              flex
              items-center
              justify-center
              shrink-0
            "
          >
            <Building2 size={60} className="text-[#58a6ff]" />
          </div>

          {/* Details */}
          <div>
            <h1 className="text-5xl font-bold text-white">
              {organization.name}
            </h1>

            <p className="mt-4 text-lg text-[#8b949e] max-w-4xl">
              {organization.description}
            </p>

            <div className="flex flex-wrap gap-8 mt-6 text-[#8b949e]">
              <div className="flex items-center gap-2">
                <Users size={18} />
                <span>{organization.followers} follower</span>
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>{organization.location}</span>
              </div>

              <div className="flex items-center gap-2">
                <Mail size={18} />
                <span>{organization.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Follow Button */}
        <button
          className="
            px-5
            py-3
            rounded-lg
            bg-[#21262d]
            border
            border-[#30363d]
            text-white
            font-medium
            hover:bg-[#30363d]
            transition
          "
        >
          Follow
        </button>
      </div>
    </div>
  );
}

export default OrganizationHeader;
