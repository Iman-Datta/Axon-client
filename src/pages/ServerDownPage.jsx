// src/pages/ServerDownPage.jsx
import { ServerCrash, Mail, RefreshCw } from "lucide-react";

function ServerDownPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-[#0d1117] px-6 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#30363d] bg-[#161b22]">
        <ServerCrash className="h-8 w-8 text-[#f85149]" />
      </div>

      <h1 className="text-2xl font-semibold text-[#f0f6fc]">
        Can't reach the server
      </h1>

      <p className="mt-3 max-w-md text-sm leading-relaxed text-[#8b949e]">
        Axon's backend is self-hosted on my personal infrastructure, and it's
        currently unreachable: likely a network or power interruption on my
        end, not an issue with your account or data.
      </p>

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 rounded-full bg-gradient-to-b from-[#2f81f7] to-[#1f6feb] px-5 py-2 text-sm font-medium text-white shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,0_4px_12px_rgba(31,111,235,0.35)] transition-all hover:brightness-110 active:scale-[0.98]"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>

        <a
          href="mailto:dattaiman56@gmail.com"
          className="flex items-center gap-2 rounded-full border border-[#30363d] px-5 py-2 text-sm font-medium text-[#c9d1d9] transition-colors hover:bg-[#161b22]"
        >
          <Mail className="h-4 w-4" />
          dattaiman56@gmail.com
        </a>
      </div>

      <p className="mt-10 text-xs text-[#6e7681]">
        Sorry for the inconvenience — this should resolve shortly.
      </p>
    </div>
  );
}

export default ServerDownPage;
