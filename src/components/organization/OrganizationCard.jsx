import { Link } from "react-router-dom";
import { Building2 } from "lucide-react";

function OrganizationCard({ organization }) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        px-5
        py-4
        border-b
        border-[#30363d]
        last:border-b-0
      "
    >
      <div className="flex items-center gap-4 min-w-0">
        {/* Logo */}
        <div
          className="
            h-10
            w-10
            shrink-0
            rounded-md
            border
            border-[#30363d]
            bg-[#161b22]
            overflow-hidden
            flex
            items-center
            justify-center
          "
        >
          {organization.logo ? (
            <img
              src={organization.logo}
              alt={organization.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <Building2 size={20} className="text-[#8b949e]" />
          )}
        </div>

        {/* Name + Description */}
        <div className="min-w-0">
          <Link
            to={`/${organization.slug}`}
            className="
              text-base
              font-semibold
              text-[#58a6ff]
              hover:underline
            "
          >
            {organization.name}
          </Link>

          {organization.description && (
            <p className="mt-1 text-sm text-[#8b949e] truncate">
              {organization.description}
            </p>
          )}
        </div>
      </div>

      <button
        className="
          shrink-0
          px-3
          py-2
          rounded-md
          border
          border-[#30363d]
          bg-[#21262d]
          text-red-400
          text-sm
          font-medium
          hover:bg-red-500/10
          transition-colors
        "
      >
        Leave
      </button>
    </div>
  );
}

export default OrganizationCard;
