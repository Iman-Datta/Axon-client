import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Building2 } from "lucide-react";
import SectionCard from "./SectionCard";

const VISIBLE_LIMIT = 3;

function OrganizationsCard({ organizations, username }) {
  const navigate = useNavigate();
  const visibleOrgs = organizations.slice(0, VISIBLE_LIMIT);

  return (
    <SectionCard
      icon={Building2}
      title="Organizations"
      count={organizations.length}
    >
      {organizations.length === 0 ? (
        <p className="py-3 text-center text-xs text-[#8b949e]">
          No organizations connected yet.
        </p>
      ) : (
        <div className="space-y-1.5">
          {visibleOrgs.map((org) => (
            <div
              key={org.id}
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/${org.slug}`)}
              onKeyDown={(e) => e.key === "Enter" && navigate(`/${org.slug}`)}
              className="group flex cursor-pointer items-center justify-between gap-2 rounded-lg border border-transparent px-2 py-1.5 transition-colors hover:border-[#21262d] hover:bg-[#0d1117]/60"
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-[#30363d] bg-[#21262d] text-[#58a6ff] transition-colors group-hover:border-[#388bfd]">
                  <Building2 size={13} />
                </div>
                <div className="min-w-0">
                  <h4 className="truncate text-xs font-medium text-[#f0f6fc] transition-colors group-hover:text-[#58a6ff]">
                    {org.name}
                  </h4>
                  <p className="truncate text-[10.5px] text-[#8b949e]">
                    {org.description || "Workspace organization"}
                  </p>
                </div>
              </div>

              <ArrowUpRight
                size={13}
                className="shrink-0 text-[#8b949e] opacity-0 transition-all group-hover:text-[#58a6ff] group-hover:opacity-100"
              />
            </div>
          ))}

          {organizations.length > VISIBLE_LIMIT && (
            <button
              type="button"
              onClick={() => navigate(`/${username}/organizations`)}
              className="mt-1 w-full py-1.5 text-center text-[11px] font-medium text-[#58a6ff] transition-colors hover:text-white"
            >
              View all organizations ({organizations.length})
            </button>
          )}
        </div>
      )}
    </SectionCard>
  );
}

export default OrganizationsCard;
