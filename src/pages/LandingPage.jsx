import { ArrowRight } from "lucide-react";

function LandingPage() {
  return (
    <main className="overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative pt-40 pb-28 px-6">
        {/* Background Glow */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-500/10 blur-[180px]" />
        </div>

        <div className="relative max-w-6xl mx-auto flex flex-col items-center text-center">
          {/* SMALL BADGE */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 border border-[#30363d] bg-[#161b22]/70 px-4 py-2 rounded-full">
              <div className="w-2 h-2 rounded-full bg-[#2f81f7]" />

              <span className="text-sm text-[#8b949e]">
                Git-aware collaborative workflow platform
              </span>
            </div>
          </div>

          {/* HERO HEADING */}
          <h1 className="max-w-5xl text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05]">
            Build projects.
            <br />
            Track tickets.
            <br />
            <span className="text-[#d2e4ff]">Automate workflows.</span>
          </h1>

          {/* SUBTEXT */}
          <p className="mt-8 max-w-3xl text-lg md:text-xl text-[#8b949e] leading-relaxed">
            A collaborative workspace built for developers Git-powered
            automation, Kanban workflows, organizations, and real-time project
            tracking.
          </p>

          {/* CTA BUTTONS */}
          <div className="mt-12 flex items-center gap-4">
            {/* PRIMARY BUTTON */}
            <button className="group bg-[#2f81f7] hover:bg-[#1f6feb] px-7 py-4 rounded-xl font-medium text-white flex items-center gap-2 transition-all duration-200 shadow-lg shadow-blue-500/20">
              Get Started
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </button>

            {/* SECONDARY BUTTON */}
            <button className="border border-[#30363d] bg-[#161b22] hover:bg-[#21262d] px-7 py-4 rounded-xl font-medium text-[#c9d1d9] transition-all duration-200">
              Explore Features
            </button>
          </div>

          {/* SMALL FOOT TEXT */}
          <div className="mt-8 flex items-center gap-3 text-sm text-[#8b949e]">
            <span className="text-[#238636]">✓</span>
            <span>Free for individual developers</span>

            <span className="text-[#30363d]">•</span>

            <span>No credit card required</span>
          </div>
        </div>
      </section>

      {/* DASHBOARD PREVIEW */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="border border-[#30363d] bg-[#161b22]/70 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">
            {/* TOP BAR */}
            <div className="border-b border-[#30363d] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>

              <div className="border border-[#30363d] bg-[#0d1117] px-4 py-2 rounded-lg text-sm text-[#8b949e]">
                axon.dev / acme-eng / sprint-24
              </div>

              <div />
            </div>

            {/* CONTENT */}
            <div className="grid grid-cols-12 min-h-[500px]">
              {/* SIDEBAR */}
              <div className="col-span-2 border-r border-[#30363d] p-5">
                <h3 className="text-sm text-[#8b949e] mb-4 uppercase tracking-wider">
                  Organizations
                </h3>

                <div className="space-y-3">
                  <div className="bg-[#21262d] border border-[#30363d] px-3 py-2 rounded-lg">
                    acme-eng
                  </div>

                  <div className="px-3 py-2 text-[#8b949e]">os</div>

                  <div className="px-3 py-2 text-[#8b949e]">side-quest</div>
                </div>
              </div>

              {/* KANBAN */}
              <div className="col-span-8 p-5">
                <div className="grid grid-cols-3 gap-5">
                  {/* COLUMN */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">In Progress</h3>

                      <span className="text-xs text-[#8b949e]">3</span>
                    </div>

                    <div className="space-y-4">
                      {/* CARD */}
                      <div className="border border-[#30363d] bg-[#0d1117] rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-[#8b949e]">AX-101</span>

                          <span className="text-xs px-2 py-1 rounded-full bg-[#2f81f7]/10 text-[#2f81f7]">
                            Open
                          </span>
                        </div>

                        <h4 className="mt-3 font-medium">
                          Implement OAuth flow
                        </h4>

                        <p className="mt-2 text-sm text-[#8b949e]">
                          feat/oauth-device
                        </p>
                      </div>

                      <div className="border border-[#30363d] bg-[#0d1117] rounded-xl p-4">
                        <span className="text-xs text-[#8b949e]">AX-104</span>

                        <h4 className="mt-3 font-medium">
                          Refactor webhook signer
                        </h4>

                        <p className="mt-2 text-sm text-[#8b949e]">
                          chore/webhook-sig
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* COLUMN */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">In Review</h3>

                      <span className="text-xs text-[#8b949e]">2</span>
                    </div>

                    <div className="border border-[#30363d] bg-[#0d1117] rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#8b949e]">AX-098</span>

                        <span className="text-xs px-2 py-1 rounded-full bg-[#2f81f7]/10 text-[#2f81f7]">
                          #482
                        </span>
                      </div>

                      <h4 className="mt-3 font-medium">
                        Add Kanban persistence
                      </h4>

                      <p className="mt-2 text-sm text-[#8b949e]">
                        feat/kanban-dnd
                      </p>
                    </div>
                  </div>

                  {/* COLUMN */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Merged</h3>

                      <span className="text-xs text-[#8b949e]">1</span>
                    </div>

                    <div className="border border-[#30363d] bg-[#0d1117] rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#8b949e]">AX-088</span>

                        <span className="text-xs px-2 py-1 rounded-full bg-[#238636]/10 text-[#238636]">
                          Merged
                        </span>
                      </div>

                      <h4 className="mt-3 font-medium">
                        Activity stream realtime
                      </h4>

                      <p className="mt-2 text-sm text-[#8b949e]">
                        feat/activity-rt
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ACTIVITY */}
              <div className="col-span-2 border-l border-[#30363d] p-5">
                <h3 className="text-sm uppercase tracking-wider text-[#8b949e] mb-5">
                  Activity
                </h3>

                <div className="space-y-4 text-sm">
                  <div>
                    <p>JS merged feat/activity-rt</p>
                    <span className="text-[#8b949e] text-xs">2m ago</span>
                  </div>

                  <div>
                    <p>AM opened PR #482</p>
                    <span className="text-[#8b949e] text-xs">8m ago</span>
                  </div>

                  <div>
                    <p>CI passed on feat/oauth</p>
                    <span className="text-[#8b949e] text-xs">21m ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;
