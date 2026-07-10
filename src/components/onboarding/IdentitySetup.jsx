import { ArrowRight } from "lucide-react";

import UsernameCard from "./UsernameCard";
import EmailCard from "./EmailCard";
import GithubCard from "./GithubCard";

export default function IdentitySetup({ identity, nextStep }) {
  const requirements = identity.requirements;
  const data = identity.data;

  const needs = {
    username: !requirements.username,
    email: !requirements.email,
  };

  const githubConnected = requirements.github;

  const pendingCount = Object.values(needs).filter(Boolean).length;

  const allDone = pendingCount === 0;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-base font-semibold text-[#c9d1d9]">
          Complete your identity
        </h2>

        <p className="mt-1 text-sm text-[#8b949e]">
          Connect the pieces missing from your account before you continue.
        </p>
      </div>

      {pendingCount > 0 && (
        <div className="mb-5 rounded-lg border border-[#f0883e]/20 bg-[#f0883e]/5 px-4 py-3">
          <p className="text-xs text-[#f0883e]">
            {pendingCount} item
            {pendingCount > 1 ? "s" : ""} need your attention.
          </p>
        </div>
      )}

      <div className="space-y-3">
        <UsernameCard
          status={needs.username ? "pending" : "done"}
          usernameValue={data.username}
        />

        <EmailCard
          status={needs.email ? "pending" : "done"}
          emailValue={data.email}
        />

        <GithubCard
          status={githubConnected ? "done" : "optional"}
          githubUsername={data.github?.username}
          githubAvatar={data.github?.avatar}
        />
      </div>

      <div className="mt-8 space-y-2">
        <button
          onClick={nextStep}
          disabled={!allDone}
          className="
            w-full rounded-lg bg-[#238636]
            py-3 text-sm font-semibold text-white
            hover:bg-[#2ea043]
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <span className="flex items-center justify-center gap-2">
            Continue
            <ArrowRight size={16} />
          </span>
        </button>

        {!allDone && (
          <p className="text-center text-xs text-[#484f58]">
            Complete username and email to continue.
          </p>
        )}
      </div>
    </div>
  );
}
