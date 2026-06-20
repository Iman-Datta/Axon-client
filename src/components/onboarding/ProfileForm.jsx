// UI only – no logic. Wire up state/handlers in CompleteProfile.jsx

export default function ProfileForm() {
  return (
    <div className="space-y-5">
      {/* Avatar upload */}
      <div className="flex items-center gap-5">
        <div className="relative">
          <div className="h-20 w-20 rounded-full border-2 border-dashed border-[#30363d] bg-[#0d1117] flex items-center justify-center text-[#484f58] hover:border-[#388bfd]/50 hover:text-[#388bfd] transition-all cursor-pointer group">
            <svg
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>
          </div>
        </div>
        <div>
          <p className="text-sm font-medium text-[#c9d1d9]">Profile picture</p>
          <p className="mt-0.5 text-xs text-[#8b949e]">PNG, JPG up to 2MB.</p>
          <button className="mt-2 text-xs text-[#388bfd] hover:underline">
            Upload photo
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#21262d]" />

      {/* Display name */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-[#c9d1d9]">
          Display name
        </label>
        <input
          type="text"
          placeholder="Iman Datta"
          className="
            w-full rounded-lg border border-[#30363d] bg-[#0d1117]
            px-3 py-2.5 text-sm text-[#c9d1d9] placeholder-[#484f58]
            outline-none transition-all
            focus:border-[#388bfd] focus:ring-1 focus:ring-[#388bfd]/30
          "
        />
        <p className="text-[11px] text-[#484f58]">
          This is shown on your public profile and in comments.
        </p>
      </div>

      {/* Bio */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-[#c9d1d9]">
          Bio
          <span className="ml-2 text-xs font-normal text-[#484f58]">
            optional
          </span>
        </label>
        <textarea
          rows={3}
          placeholder="Tell the community a bit about yourself…"
          className="
            w-full resize-none rounded-lg border border-[#30363d] bg-[#0d1117]
            px-3 py-2.5 text-sm text-[#c9d1d9] placeholder-[#484f58]
            outline-none transition-all
            focus:border-[#388bfd] focus:ring-1 focus:ring-[#388bfd]/30
          "
        />
        <p className="text-right text-[11px] text-[#484f58]">0 / 160</p>
      </div>

      {/* Role + Stack — 2-col */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-[#c9d1d9]">
            Role
            <span className="ml-2 text-xs font-normal text-[#484f58]">
              optional
            </span>
          </label>
          <select
            className="
              w-full rounded-lg border border-[#30363d] bg-[#0d1117]
              px-3 py-2.5 text-sm text-[#c9d1d9]
              outline-none transition-all appearance-none
              focus:border-[#388bfd] focus:ring-1 focus:ring-[#388bfd]/30
            "
          >
            <option value="" className="text-[#484f58]">
              Select role
            </option>
            <option>Full-stack Developer</option>
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>DevOps Engineer</option>
            <option>ML / AI Engineer</option>
            <option>Student</option>
            <option>Other</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-[#c9d1d9]">
            Primary stack
            <span className="ml-2 text-xs font-normal text-[#484f58]">
              optional
            </span>
          </label>
          <input
            type="text"
            placeholder="React, Node, Python…"
            className="
              w-full rounded-lg border border-[#30363d] bg-[#0d1117]
              px-3 py-2.5 text-sm text-[#c9d1d9] placeholder-[#484f58]
              outline-none transition-all
              focus:border-[#388bfd] focus:ring-1 focus:ring-[#388bfd]/30
            "
          />
        </div>
      </div>

      {/* Website */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-[#c9d1d9]">
          Website
          <span className="ml-2 text-xs font-normal text-[#484f58]">
            optional
          </span>
        </label>
        <div className="flex items-center rounded-lg border border-[#30363d] bg-[#0d1117] focus-within:border-[#388bfd] focus-within:ring-1 focus-within:ring-[#388bfd]/30 transition-all">
          <span className="select-none border-r border-[#30363d] px-3 py-2.5 text-sm text-[#484f58]">
            https://
          </span>
          <input
            type="text"
            placeholder="yoursite.dev"
            className="flex-1 bg-transparent px-3 py-2.5 text-sm text-[#c9d1d9] placeholder-[#484f58] outline-none"
          />
        </div>
      </div>
    </div>
  );
}