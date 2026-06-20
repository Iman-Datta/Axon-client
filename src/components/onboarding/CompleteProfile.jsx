// Pure step content — no header, no page wrapper.
// Onboarding.jsx owns all layout chrome.

import ProfileForm from "./ProfileForm";

export default function CompleteProfile() {
  return (
    <div>
      {/* Section label */}
      <div className="mb-6">
        <h2 className="text-base font-semibold text-[#c9d1d9]">
          Set up your profile
        </h2>
        <p className="mt-1 text-sm text-[#8b949e]">
          Optional — but a complete profile helps teammates recognize you
          instantly.
        </p>
      </div>

      {/* Form card */}
      <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-6">
        <ProfileForm />
      </div>

      {/* Actions */}
      <div className="mt-6 space-y-2">
        <button
          className="
            w-full rounded-lg bg-[#238636] py-3 text-sm font-semibold text-white
            hover:bg-[#2ea043] active:bg-[#1a7f37]
            transition-colors
          "
        >
          Finish setup →
        </button>

        <button className="w-full text-center text-xs text-[#484f58] hover:text-[#8b949e] transition-colors py-1">
          Skip for now
        </button>
      </div>
    </div>
  );
}
