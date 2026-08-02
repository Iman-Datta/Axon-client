import { useEffect, useRef, useState } from "react";
import { HelpCircle } from "lucide-react";
import { priorityConfig, typeConfig } from "../../components/kanban/ticketmeta";

const TicketLegend = () => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Show icon legend"
        aria-expanded={open}
        className="group flex h-8 w-8 items-center justify-center rounded-md border border-transparent text-[#8b949e] transition-all duration-200 hover:border-[#30363d] hover:bg-[#161b22] hover:text-[#e6edf3]"
      >
        <HelpCircle
          strokeWidth={2}
          className={`h-4 w-4 transition-all duration-200 ${
            open
              ? "text-[#58a6ff] drop-shadow-[0_0_4px_rgba(88,166,255,0.55)]"
              : "group-hover:text-[#e6edf3] group-hover:rotate-6"
          }`}
        />
      </button>
      {open && (
        <div
          role="dialog"
          aria-label="Icon legend"
          className="absolute right-0 top-full z-50 mt-2 w-64 origin-top-right rounded-lg border border-[#30363d] bg-[#161b22] p-3 shadow-xl animate-in fade-in zoom-in-95 duration-150"
        >
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#6e7681]">
            Type
          </p>
          <div className="mb-3 flex flex-col gap-1.5">
            {Object.values(typeConfig).map(({ icon: Icon, color, label }) => (
              <div key={label} className="flex items-center gap-2.5">
                <Icon
                  className="h-3.5 w-3.5 shrink-0"
                  style={{ color }}
                  strokeWidth={2.25}
                />
                <span className="text-[12px] text-[#c9d1d9]">{label}</span>
              </div>
            ))}
          </div>

          <div className="mb-3 border-t border-[#21262d]" />

          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[#6e7681]">
            Priority
          </p>
          <div className="flex flex-col gap-1.5">
            {Object.values(priorityConfig).map(
              ({ icon: Icon, color, label }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <Icon
                    className="h-3.5 w-3.5 shrink-0"
                    style={{ color }}
                    strokeWidth={2.5}
                  />
                  <span className="text-[12px] text-[#c9d1d9]">{label}</span>
                </div>
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketLegend;
