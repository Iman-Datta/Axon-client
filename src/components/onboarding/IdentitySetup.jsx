import { ArrowRight } from "lucide-react";

import UsernameCard from "./UsernameCard";
import EmailCard from "./EmailCard";
import GithubCard from "./GithubCard";

export default function IdentitySetup({ identity, refresh, nextStep }) {
  const requirements = identity.requirements;
  const data = identity.data;

  const needs = {
    // Convert completed requirements into missing requirements
    username: !requirements.username,
    email: !requirements.email,
    github: !requirements.github,
  };

  const pendingCount = Object.values(needs).filter(Boolean).length;
  const allDone = pendingCount === 0;

  return (
    <div>
      {/* Section label */}
      <div className="mb-6">
        <h2 className="text-base font-semibold text-[#c9d1d9]">
          Complete your identity
        </h2>
        <p className="mt-1 text-sm text-[#8b949e]">
          Connect the pieces missing from your account before you continue.
        </p>
      </div>

      {/* Pending notice */}
      {pendingCount > 0 && (
        <div className="mb-5 flex items-start gap-3 rounded-lg border border-[#f0883e]/20 bg-[#f0883e]/5 px-4 py-3">
          <svg
            className="mt-0.5 h-4 w-4 shrink-0 text-[#f0883e]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
          <p className="text-xs text-[#f0883e]">
            {pendingCount} item{pendingCount > 1 ? "s" : ""} need
            {pendingCount === 1 ? "s" : ""} your attention before you can
            continue.
          </p>
        </div>
      )}

      {/* Cards — always render all 3, status drives appearance */}
      <div className="space-y-3">
        <UsernameCard
          status={needs.username ? "pending" : "done"}
          usernameValue={data.username}
          refresh={refresh}
        />

        <EmailCard
          status={needs.email ? "pending" : "done"}
          emailValue={data.email}
          refresh={refresh}
        />

        <GithubCard
          status={needs.github ? "pending" : "done"}
          githubUsername={data.github?.username}
          githubAvatar={data.github?.avatar}
        />
      </div>

      {/* Continue */}
      <div className="mt-8 space-y-2">
        <button
          onClick={nextStep}
          disabled={!allDone}
          className="
            w-full rounded-lg bg-[#238636] py-3 text-sm font-semibold text-white
            hover:bg-[#2ea043] active:bg-[#1a7f37]
            transition-colors
            disabled:cursor-not-allowed disabled:opacity-40
          "
        >
          <span className="flex items-center justify-center gap-2">
            Continue
            <ArrowRight size={16} />
          </span>
        </button>

        {!allDone && (
          <p className="text-center text-xs text-[#484f58]">
            Complete the fields above to continue.
          </p>
        )}
      </div>
    </div>
  );
}
