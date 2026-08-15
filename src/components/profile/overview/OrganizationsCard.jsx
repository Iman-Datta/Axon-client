import { useNavigate } from "react-router-dom";
import { ArrowRight, Building2 } from "lucide-react";
import SectionCard from "./SectionCard";

const VISIBLE_LIMIT = 3;

function OrganizationsCard({ organizations, username }) {
  const navigate = useNavigate();
  const visibleOrgs = organizations.slice(0, VISIBLE_LIMIT);

  return (
    <SectionCard icon={Building2} title="Organizations" count={organizations.length}>
      {organizations.length === 0 ? (
        <p className="py-4 text-center text-xs text-[#8b949e]">No organizations connected yet.</p>
      ) : (
        <div className="space-y-3">
          {visibleOrgs.map((org) => (
            <div
              key={org.id}
              role="button"
              tabIndex={0}
              onClick={() => navigate(`/${org.slug}`)}
              onKeyDown={(e) => e.key === "Enter" && navigate(`/${org.slug}`)}
              className="group flex cursor-pointer items-center justify-between rounded-xl border border-[#21262d] bg-[#0d1117]/40 p-3 transition-all hover:border-[#388bfd]/50 hover:bg-[#0d1117]"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#30363d] bg-[#21262d] text-[#58a6ff] transition-colors group-hover:border-[#388bfd]">
                  <Building2 size={16} />
                </div>
                <div className="min-w-0">
                  <h4 className="truncate text-xs font-semibold text-[#f0f6fc] transition-colors group-hover:text-[#58a6ff]">
                    {org.name}
                  </h4>
                  <p className="truncate text-[11px] text-[#8b949e]">
                    {org.description || "Workspace organization"}
                  </p>
                </div>
              </div>

              <ArrowRight
                size={14}
                className="shrink-0 text-[#58a6ff] opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
              />
            </div>
          ))}

          {organizations.length > VISIBLE_LIMIT && (
            <button
              type="button"
              onClick={() => navigate(`/${username}/organizations`)}
              className="mt-2 w-full py-2 text-center text-xs font-semibold text-[#58a6ff] transition-colors hover:text-white"
            >
              View all organizations ({organizations.length}) →
            </button>
          )}
        </div>
      )}
    </SectionCard>
  );
}

export default OrganizationsCard;
