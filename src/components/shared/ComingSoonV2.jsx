import { Link } from "react-router-dom";
import { Sparkles, ArrowLeft, Bell } from "lucide-react";

function ComingSoonV2({
  title = "This feature isn't live yet",
  description = "We're still building this out. It's on the roadmap and arriving in a future update.",
  backTo = "/",
  backLabel = "Back",
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#161b22] ring-1 ring-[#30363d]">
          <Sparkles size={22} className="text-[#58a6ff]" strokeWidth={1.75} />
        </div>

        <h1 className="mt-6 text-xl font-semibold tracking-tight text-[#e6edf3]">
          {title}
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#8b949e]">{description}</p>

        <div className="mx-auto mt-5 inline-flex items-center gap-2 rounded-full bg-[#388bfd]/10 px-3 py-1.5 text-xs font-medium text-[#58a6ff] ring-1 ring-[#388bfd]/30">
          <Bell size={12} />
          Planned for Version 2
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            to={backTo}
            className="flex items-center gap-1.5 rounded-lg border border-[#30363d] bg-[#161b22] px-4 py-2 text-sm font-medium text-[#c9d1d9] transition hover:bg-[#21262d]"
          >
            <ArrowLeft size={15} />
            {backLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ComingSoonV2;
