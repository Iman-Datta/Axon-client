import { ArrowDown } from "lucide-react";

function DropPlaceholder({ variant = "line" }) {
  if (variant === "empty") {
    return (
      <div className="group relative flex h-[120px] items-center justify-center overflow-hidden rounded-2xl border border-dashed border-[#388bfd]/40 bg-gradient-to-br from-[#1f6feb]/10 via-[#388bfd]/5 to-transparent transition-all duration-300">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,139,253,0.12),transparent_70%)]" />
        <div className="relative flex items-center gap-3 rounded-full border border-[#58a6ff]/20 bg-[#161b22]/80 px-4 py-2 backdrop-blur-xl shadow-xl shadow-[#388bfd]/10">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#388bfd]/15">
            <ArrowDown className="h-4 w-4 text-[#79c0ff]" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[#e6edf3]">
              Drop ticket here
            </p>
            <p className="text-[10px] text-[#8b949e]">
              Release to add this ticket
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative my-3 flex h-6 items-center">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#388bfd]/60 to-[#388bfd]" />
      <div className="relative mx-3">
        <div className="absolute inset-0 rounded-full bg-[#388bfd]/15 blur-md" />
        <div className="relative flex items-center gap-1.5 rounded-full border border-[#388bfd]/25 bg-[#161b22]/95 px-3 py-1 shadow-lg shadow-black/30 backdrop-blur">
          <div className="h-1.5 w-1.5 rounded-full bg-[#58a6ff] animate-pulse" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#79c0ff]">
            DROP HERE
          </span>
        </div>
      </div>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#388bfd]/60 to-[#388bfd]" />
    </div>
  );
}

export default DropPlaceholder;
