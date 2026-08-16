import { FaGithub, FaCodeCommit, FaCodePullRequest } from "react-icons/fa6";
import { TbGitBranch } from "react-icons/tb";
import { HiOutlineFolder, HiOutlineTicket } from "react-icons/hi2";
import { BsViewStacked } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";

const left = [
  { label: "Branches", icon: TbGitBranch, note: "feature/ticket-104" },
  { label: "Commits", icon: FaCodeCommit, note: "12 today" },
  { label: "Pull Requests", icon: FaCodePullRequest, note: "#42 · #43 · #44" },
];

const right = [
  { label: "Projects", icon: HiOutlineFolder, note: "Axon Project" },
  { label: "Tickets", icon: HiOutlineTicket, note: "#104 in review" },
  { label: "Kanban", icon: BsViewStacked, note: "sprint 12" },
  { label: "Teams", icon: FiUsers, note: "4 developers" },
];

export function DevelopersSection() {
  return (
    <section className="border-b border-border bg-card/30">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <h2 className="max-w-xl text-2xl font-semibold leading-snug tracking-tight sm:text-[28px]">
          Not just project management.
          <br />
          <span className="text-muted-foreground">
            A workflow built around how developers actually work.
          </span>
        </h2>

        <div className="mt-10 grid items-center gap-4 lg:grid-cols-[minmax(0,1fr)_120px_minmax(0,1fr)]">
          <div className="panel p-4">
            <div className="mb-3 flex items-center gap-2">
              <FaGithub className="size-4" />
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                GitHub
              </span>
            </div>
            <div className="space-y-2">
              {left.map((l) => {
                const Icon = l.icon;
                return (
                  <div
                    key={l.label}
                    className="flex items-center gap-3 rounded-md border border-border bg-card px-3 py-2"
                  >
                    <Icon className="size-3.5 text-muted-foreground" />
                    <span className="text-[12.5px]">{l.label}</span>
                    <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                      {l.note}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-center py-2">
            <svg
              viewBox="0 0 120 60"
              className="h-16 w-full text-primary/60"
              aria-hidden="true"
            >
              <path
                d="M4 18 H116"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 6"
                fill="none"
              />
              <path
                d="M116 42 H4"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 6"
                fill="none"
              />
              <path d="M112 14 l6 4 -6 4" fill="none" stroke="currentColor" />
              <path d="M8 38 l-6 4 6 4" fill="none" stroke="currentColor" />
            </svg>
          </div>

          <div className="panel border-primary/40 p-4">
            <div className="mb-3 flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-primary" />
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
                Axon
              </span>
            </div>
            <div className="space-y-2">
              {right.map((l) => {
                const Icon = l.icon;
                return (
                  <div
                    key={l.label}
                    className="flex items-center gap-3 rounded-md border border-border bg-card px-3 py-2"
                  >
                    <Icon className="size-3.5 text-primary" />
                    <span className="text-[12.5px]">{l.label}</span>
                    <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                      {l.note}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
