import { useState, useEffect, useRef } from "react";
import { Search, X, UserRound } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWithAuth } from "../../../../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;

export default function MemberSelect({
  slug,
  projectSlug,
  value,
  onChange,
  initialMembers = [],
  labelClass = "text-sm font-medium text-[#8b949e]",
  inputClass = "mt-2 w-full rounded-xl border border-[#30363d] bg-[#0d1117] px-4 py-3 text-sm text-[#e6edf3] placeholder:text-[#6e7681] outline-none transition-all focus:border-[#58a6ff] focus:ring-2 focus:ring-[#58a6ff]/20",
}) {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [memberOptions, setMemberOptions] = useState(initialMembers);
  const [memberQuery, setMemberQuery] = useState("");
  const [membersLoading, setMembersLoading] = useState(false);
  const [membersError, setMembersError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    if (!slug || !projectSlug) return;
    let cancelled = false;

    async function fetchMembers() {
      setMembersLoading(true);
      try {
        const res = await fetchWithAuth(
          `${API}/projects/${slug}/${projectSlug}/members/`,
          {},
          dispatch,
          accessToken,
        );
        if (!res.ok) throw new Error("Failed to load members");
        const data = await res.json();
        if (!cancelled && data?.success) {
          setMemberOptions(data.members || []);
        }
      } catch (err) {
        if (!cancelled) setMembersError(err.message || "Failed to load");
      } finally {
        if (!cancelled) setMembersLoading(false);
      }
    }

    fetchMembers();
    return () => {
      cancelled = true;
    };
  }, [slug, projectSlug, accessToken, dispatch]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedMember = memberOptions.find(
    (m) => String(m.id) === String(value),
  );

  const filteredMembers = memberOptions
    .filter((m) => {
      const q = memberQuery.trim().toLowerCase();
      if (!q) return true;
      const fullName =
        `${m.first_name || ""} ${m.last_name || ""}`.toLowerCase();
      return m.username?.toLowerCase().includes(q) || fullName.includes(q);
    })
    .slice(0, 3);

  const handleSelect = (member) => {
    onChange(member ? String(member.id) : "");
    setMemberQuery("");
    setShowDropdown(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <label className={labelClass}>Assignee</label>
      <div className="relative mt-2">
        {selectedMember ? (
          <div className="flex items-center justify-between rounded-xl border border-[#30363d] bg-[#0d1117] px-3.5 py-2.5">
            <div className="flex min-w-0 items-center gap-2.5">
              <img
                src={selectedMember.avatar}
                alt=""
                className="h-6 w-6 shrink-0 rounded-full ring-1 ring-[#30363d]"
              />
              <div className="min-w-0 leading-tight">
                <p className="truncate text-sm text-[#e6edf3]">
                  {selectedMember.first_name} {selectedMember.last_name}
                </p>
                <p className="truncate text-xs text-[#6e7681]">
                  @{selectedMember.username}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleSelect(null)}
              className="ml-2 shrink-0 rounded-md p-1 text-[#8b949e] transition-colors hover:bg-[#21262d] hover:text-[#e6edf3]"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ) : (
          <div className="relative">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6e7681]" />
            <input
              type="text"
              value={memberQuery}
              onChange={(e) => {
                setMemberQuery(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Search members..."
              className={`${inputClass} pl-10`}
              autoComplete="off"
            />
          </div>
        )}

        {showDropdown && !selectedMember && (
          <div className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-xl border border-[#30363d] bg-[#161b22] shadow-2xl">
            {membersLoading ? (
              <div className="px-4 py-3 text-sm text-[#8b949e]">
                Loading members...
              </div>
            ) : membersError ? (
              <div className="px-4 py-3 text-sm text-red-400">
                {membersError}
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => handleSelect(null)}
                  className="flex w-full items-center gap-2.5 border-b border-[#21262d] px-4 py-2.5 text-left text-sm text-[#8b949e] transition-colors hover:bg-[#21262d]"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0d1117] ring-1 ring-[#30363d]">
                    <UserRound className="h-3.5 w-3.5" />
                  </span>
                  Unassigned
                </button>
                {filteredMembers.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-[#6e7681]">
                    No members found
                  </div>
                ) : (
                  filteredMembers.map((member) => (
                    <button
                      key={member.id}
                      type="button"
                      onClick={() => handleSelect(member)}
                      className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left transition-colors hover:bg-[#21262d]"
                    >
                      <img
                        src={member.avatar}
                        alt=""
                        className="h-6 w-6 shrink-0 rounded-full ring-1 ring-[#30363d]"
                      />
                      <div className="min-w-0 flex-1 leading-tight">
                        <p className="truncate text-sm text-[#e6edf3]">
                          {member.first_name} {member.last_name}
                        </p>
                        <p className="truncate text-xs text-[#6e7681]">
                          @{member.username} · {member.role}
                        </p>
                      </div>
                    </button>
                  ))
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
