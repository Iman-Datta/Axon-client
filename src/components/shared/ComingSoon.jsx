import { Clock3, Sparkles } from "lucide-react";

function ComingSoon({
  title = "Coming soon",
  description = "This setting is currently under development and will be available in a future update.",
  requirements = [],
}) {
  return (
    <div className="max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#161b22] ring-1 ring-[#30363d]">
            <Clock3 size={20} className="text-[#8b949e]" />
          </div>

          <div>
            <h1 className="text-xl font-semibold text-[#e6edf3]">{title}</h1>

            <span className="text-xs font-medium uppercase tracking-wider text-[#6e7681]">
              Planned
            </span>
          </div>
        </div>

        <p className="mt-4 max-w-2xl text-sm leading-6 text-[#8b949e]">
          {description}
        </p>
      </div>

      {/* Planned requirements */}
      {requirements.length > 0 && (
        <div className="rounded-lg border border-[#30363d] bg-[#0d1117]">
          <div className="border-b border-[#21262d] px-5 py-4">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[#8b949e]" />

              <h2 className="text-sm font-semibold text-[#c9d1d9]">
                Planned for this section
              </h2>
            </div>
          </div>

          <div className="divide-y divide-[#21262d]">
            {requirements.map((item, index) => (
              <div key={index} className="flex items-start gap-3 px-5 py-4">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#6e7681]" />

                <p className="text-sm leading-5 text-[#8b949e]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Footer message */}
      <p className="mt-6 text-xs text-[#6e7681]">
        Axon is actively being developed. This section will be updated as the
        feature becomes available.
      </p>
    </div>
  );
}

export default ComingSoon;
