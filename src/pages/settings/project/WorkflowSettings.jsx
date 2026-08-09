import { useState } from "react";
import {
  Circle,
  Loader2,
  Eye,
  CheckCircle2,
  GitBranch,
  GitPullRequest,
  GitMerge,
  ArrowRight,
  Hash,
} from "lucide-react";

const STAGES = [
  {
    key: "todo",
    name: "Todo",
    icon: Circle,
    accent: "#8b949e",
    accentBg: "rgba(139,148,158,0.12)",
    summary: "Planned, not started",
    detail:
      "The starting point for every new ticket. Work has been planned but no development has begun, tickets here are waiting to be picked up.",
  },
  {
    key: "in-progress",
    name: "In Progress",
    icon: Loader2,
    accent: "#58a6ff",
    accentBg: "rgba(88,166,255,0.12)",
    summary: "Actively being built",
    detail:
      "A developer is actively working the ticket, writing code, fixing bugs, or building the requested feature.",
  },
  {
    key: "review",
    name: "Review",
    icon: Eye,
    accent: "#a371f7",
    accentBg: "rgba(163,113,247,0.12)",
    summary: "Ready for a second look",
    detail:
      "Development is finished and the work is ready for code review, testing, QA, or approval before it merges.",
  },
  {
    key: "done",
    name: "Done",
    icon: CheckCircle2,
    accent: "#3fb950",
    accentBg: "rgba(63,185,80,0.12)",
    summary: "Shipped",
    detail:
      "The work is complete and delivered. Tickets here need no further action unless they're reopened.",
  },
];

const AUTOMATIONS = [
  {
    icon: GitBranch,
    label: "Branch created or linked",
    moves: "in-progress",
  },
  {
    icon: GitPullRequest,
    label: "Pull request opened",
    moves: "review",
  },
  {
    icon: GitMerge,
    label: "Pull request merged",
    moves: "done",
  },
];

export default function WorkflowSettings() {
  const [activeStage, setActiveStage] = useState(null);
  const [hoveredAutomation, setHoveredAutomation] = useState(null);

  return (
    <div className="space-y-8 text-[#f0f6fc]">
      {/* Introduction */}
      <div>
        <h2 className="text-lg font-semibold">Workflow</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-[#8b949e]">
          Every ticket in this project moves through the four stages below, from
          creation to completion. This gives your team a shared, predictable
          picture of where work stands.
        </p>
      </div>

      {/* Pipeline visualization */}
      <div className="rounded-lg border border-[#30363d] bg-[#161b22] p-5">
        <div className="flex items-stretch">
          {STAGES.map((stage, i) => {
            const Icon = stage.icon;
            const isActive = activeStage === stage.key;
            const isLinkedToHover =
              hoveredAutomation != null &&
              AUTOMATIONS[hoveredAutomation].moves === stage.key;
            return (
              <div key={stage.key} className="flex flex-1 items-center">
                <button
                  onClick={() => setActiveStage(isActive ? null : stage.key)}
                  className="group flex w-full flex-col items-center gap-2 rounded-md px-2 py-1 text-center transition"
                  style={{
                    outline: isLinkedToHover
                      ? `1px solid ${stage.accent}`
                      : "1px solid transparent",
                    outlineOffset: "4px",
                  }}
                >
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-full transition"
                    style={{
                      backgroundColor: stage.accentBg,
                      color: stage.accent,
                      boxShadow: isActive
                        ? `0 0 0 2px ${stage.accent}`
                        : "none",
                    }}
                  >
                    <Icon size={18} strokeWidth={2} />
                  </span>
                  <span className="text-sm font-medium">{stage.name}</span>
                  <span className="text-xs text-[#8b949e]">
                    {stage.summary}
                  </span>
                </button>
                {i < STAGES.length - 1 && (
                  <div className="mx-1 flex-1">
                    <div className="h-px w-full bg-[#30363d]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {activeStage && (
          <div className="mt-5 rounded-md border border-[#30363d] bg-[#0d1117] p-4 text-sm leading-6 text-[#8b949e]">
            {STAGES.find((s) => s.key === activeStage).detail}
          </div>
        )}

        {!activeStage && (
          <p className="mt-4 text-center text-xs text-[#8b949e]">
            Select a stage for details
          </p>
        )}
      </div>

      {/* GitHub Integration */}
      <section className="rounded-lg border border-[#30363d] bg-[#161b22] p-5">
        <div className="flex items-center gap-2">
          <Hash size={16} className="text-[#8b949e]" />
          <h3 className="text-base font-semibold">GitHub integration</h3>
        </div>
        <p className="mt-2 text-sm leading-6 text-[#8b949e]">
          When GitHub is connected, repository activity can move tickets through
          the workflow automatically. Reference a ticket in a branch name,
          commit message, or pull request to link the activity to it.
        </p>

        <div className="mt-5 space-y-3">
          {AUTOMATIONS.map((automation, i) => {
            const Icon = automation.icon;
            const targetStage = STAGES.find((s) => s.key === automation.moves);
            const TargetIcon = targetStage.icon;
            return (
              <div
                key={automation.label}
                onMouseEnter={() => setHoveredAutomation(i)}
                onMouseLeave={() => setHoveredAutomation(null)}
                className="flex items-center gap-3 rounded-md border border-[#30363d] bg-[#0d1117] px-4 py-3 transition"
                style={{
                  borderColor:
                    hoveredAutomation === i ? targetStage.accent : "#30363d",
                }}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#161b22] text-[#8b949e]">
                  <Icon size={16} />
                </span>
                <span className="text-sm text-[#f0f6fc]">
                  {automation.label}
                </span>
                <ArrowRight
                  size={14}
                  className="ml-auto shrink-0 text-[#8b949e]"
                />
                <span
                  className="flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium"
                  style={{
                    backgroundColor: targetStage.accentBg,
                    color: targetStage.accent,
                  }}
                >
                  <TargetIcon size={12} />
                  {targetStage.name}
                </span>
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-xs text-[#8b949e]">
          GitHub isn't required - tickets can always be moved between stages
          manually.
        </p>
      </section>

      {/* Footer Note */}
      <div className="rounded-lg border border-dashed border-[#30363d] bg-[#0d1117] p-4">
        <p className="text-sm font-medium text-[#f0f6fc]">Coming soon</p>
        <p className="mt-1 text-sm leading-6 text-[#8b949e]">
          Workflow customization isn't available yet. Future updates will let
          you add custom stages, rename existing ones, reorder the workflow, and
          define your own automation rules.
        </p>
      </div>
    </div>
  );
}
