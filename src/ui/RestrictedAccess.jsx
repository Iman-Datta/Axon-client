import { ShieldAlert, Lock } from "lucide-react";

function RestrictedAccess({
  message = "You don't have permission to access this page.",
  requiredRoles = [],
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="rounded-xl border border-[#30363d] bg-[#161b22] shadow-2xl overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-red-500/60 via-red-500/30 to-transparent" />

          <div className="p-8 flex flex-col items-center text-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400 ring-1 ring-red-500/20 mb-5">
              <ShieldAlert size={22} strokeWidth={2} />
            </div>

            <h2 className="text-base font-semibold text-[#e6edf3] tracking-tight">
              Restricted Access
            </h2>

            <p className="mt-2 text-sm text-[#8b949e] leading-relaxed max-w-sm">
              {message}
            </p>

            {requiredRoles.length > 0 && (
              <div className="mt-6 flex items-center gap-2 text-xs text-[#6e7681] bg-[#0d1117] border border-[#21262d] rounded-lg px-3 py-2">
                <Lock size={12} />
                <span>
                  Requires{" "}
                  {requiredRoles.map((role, i) => (
                    <span key={role}>
                      <span className="text-[#8b949e] font-medium">{role}</span>
                      {i < requiredRoles.length - 1 ? " or " : ""}
                    </span>
                  ))}{" "}
                  role
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestrictedAccess;
