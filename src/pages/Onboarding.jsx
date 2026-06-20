import { useState } from "react";

import IdentitySetup from "../components/onboarding/IdentitySetup";
import CompleteProfile from "../components/onboarding/CompleteProfile";

const STEPS = [
  { id: 1, key: "identity", label: "Identity" },
  { id: 2, key: "profile", label: "Profile" },
];

export default function Onboarding() {
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      {/* TOP BAR */}
      <header className="border-b border-[#21262d] px-6 py-4">
        <div className="flex items-center gap-2.5">
          {/* Axon Logo */}
          <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
            <path
              d="M12 2L2 19h20L12 2z"
              stroke="#388bfd"
              strokeWidth="1.8"
              strokeLinejoin="round"
            />

            <circle cx="12" cy="8" r="1.5" fill="#388bfd" />

            <circle cx="7" cy="16" r="1.5" fill="#58a6ff" />

            <circle cx="17" cy="16" r="1.5" fill="#58a6ff" />

            <line
              x1="12"
              y1="8"
              x2="7"
              y2="16"
              stroke="#388bfd"
              strokeWidth="1"
              opacity="0.5"
            />

            <line
              x1="12"
              y1="8"
              x2="17"
              y2="16"
              stroke="#388bfd"
              strokeWidth="1"
              opacity="0.5"
            />
          </svg>

          <span className="text-sm font-semibold text-[#c9d1d9]">Axon</span>
        </div>
      </header>

      {/* PAGE SHELL */}
      <main className="mx-auto w-full max-w-3xl px-4 py-12">
        {/* OUTER CONTAINER */}
        <div
          className="
          rounded-2xl
          border border-[#30363d]
          bg-[#111820]
          shadow-2xl shadow-black/30
          px-8 py-10
          "
        >
          {/* PAGE HEADING */}
          <div className="mb-8">
            <p
              className="
              mb-1.5
              text-xs
              font-medium
              uppercase
              tracking-widest
              text-[#388bfd]
            "
            >
              Workspace setup
            </p>

            <h1
              className="
              text-2xl
              font-bold
              tracking-tight
              text-[#e6edf3]
            "
            >
              Set up your developer workspace
            </h1>

            <p
              className="
              mt-1.5
              text-sm
              text-[#8b949e]
            "
            >
              Complete a few steps before entering your dashboard.
            </p>
          </div>

          {/* PROGRESS BAR */}
          <div className="mb-10">
            <div className="mb-2.5 flex justify-between">
              {STEPS.map((s) => (
                <span
                  key={s.id}
                  className={`
                  text-xs
                  font-medium
                  transition-colors

                  ${
                    step === s.id
                      ? "text-[#c9d1d9]"
                      : step > s.id
                        ? "text-[#238636]"
                        : "text-[#484f58]"
                  }

                  `}
                >
                  {s.label}
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              {STEPS.map((s) => (
                <div
                  key={s.id}
                  className={`
                  h-[3px]
                  flex-1
                  rounded-full
                  transition-all
                  duration-500


                  ${
                    step > s.id
                      ? "bg-[#238636]"
                      : step === s.id
                        ? "bg-[#388bfd]"
                        : "bg-[#21262d]"
                  }

                  `}
                />
              ))}
            </div>
          </div>

          {/* STEP CONTENT */}
          <div>
            {step === 1 && <IdentitySetup onNext={() => setStep(2)} />}

            {step === 2 && <CompleteProfile />}
          </div>
        </div>
      </main>
    </div>
  );
}
