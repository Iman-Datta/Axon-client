import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import IdentitySetup from "../components/onboarding/IdentitySetup";
import CompleteProfile from "../components/onboarding/CompleteProfile";

import { useOnboarding } from "../hooks/useOnboarding";

const STEPS = [
  { id: 1, key: "identity", label: "Identity" },
  { id: 2, key: "profile", label: "Profile" },
];

export default function Onboarding() {
  const { status, loading, refresh } = useOnboarding();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [step, setStep] = useState(1);

  useEffect(() => {
    if (step === 3 && user?.username) {
      navigate(`/${user.username}`, {
        replace: true,
      });
    }
  }, [step, user, navigate]);

  if (loading || step === null) {
    return <div className="min-h-screen bg-[#0d1117]" />;
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      <main className="mx-auto w-full max-w-3xl px-4 pt-26 pb-12">
        <div className="rounded-2xl border border-[#30363d] bg-[#111820] shadow-2xl shadow-black/30 px-8 py-10">
          <div className="mb-8">
            <p className="mb-1.5 text-xs font-medium uppercase tracking-widest text-[#388bfd]">
              Workspace setup
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-[#e6edf3]">
              Set up your developer workspace
            </h1>

            <p className="mt-1.5 text-sm text-[#8b949e]">
              Complete a few steps before entering your dashboard.
            </p>
          </div>

          {/* STEP INDICATOR */}
          <div className="mb-10 flex items-center">
            {STEPS.map((s, i) => (
              <div
                key={s.id}
                className="flex items-center flex-1 last:flex-none"
              >
                {/* Dot + label */}
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`
            flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold
            transition-all duration-300
            ${
              step > s.id
                ? "bg-[#238636] text-white"
                : step === s.id
                  ? "bg-[#388bfd] text-white ring-4 ring-[#388bfd]/15"
                  : "border border-[#30363d] bg-transparent text-[#484f58]"
            }`}
                  >
                    {step > s.id ? (
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      s.id
                    )}
                  </div>

                  <span
                    className={`
            text-xs font-medium whitespace-nowrap transition-colors duration-300
            ${step > s.id ? "text-[#3fb950]" : step === s.id ? "text-[#c9d1d9]" : "text-[#484f58]"}
          `}
                  >
                    {s.label}
                  </span>
                </div>

                {/* Connector line — not rendered after last step */}
                {i < STEPS.length - 1 && (
                  <div
                    className={`
            mx-3 mb-5 h-px flex-1 rounded-full transition-all duration-500
            ${step > s.id ? "bg-[#238636]" : "bg-[#21262d]"}
          `}
                  />
                )}
              </div>
            ))}
          </div>

          {/* STEP CONTENT */}
          <div>
            {step === 1 && (
              <IdentitySetup
                identity={status.identity}
                refresh={refresh}
                nextStep={() => setStep(2)}
              />
            )}

            {step === 2 && (
              <CompleteProfile
                key={
                  status.profile?.data?.id ||
                  status.profile?.data?.username ||
                  "profile"
                }
                profile={status.profile}
                refresh={refresh}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
