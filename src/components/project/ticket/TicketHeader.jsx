import { Ticket as TicketIcon, Plus } from "lucide-react";

function TicketHeader({ onCreateTicket, count }) {
  return (
    <div className="border-b border-[#21262d] pt-5 pb-2">
      <div className="flex items-start justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#388bfd]/15 to-[#238636]/10 ring-1 ring-[#30363d]">
            <TicketIcon
              className="h-5.5 w-5.5 text-[#58a6ff]"
              strokeWidth={1.75}
            />
          </div>

          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-semibold tracking-tight text-[#e6edf3]">
                Tickets
              </h1>
              {typeof count === "number" && (
                <span className="rounded-full bg-[#161b22] px-2 py-0.5 text-xs font-medium text-[#8b949e] ring-1 ring-[#30363d]">
                  {count}
                </span>
              )}
            </div>

            <p className="mt-1.5 text-sm text-[#8b949e]">
              Track and manage all work items in this project.
            </p>
          </div>
        </div>

        <button
          onClick={onCreateTicket}
          className="flex shrink-0 items-center gap-2 rounded-lg bg-[#238636] px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-[#2ea043] active:bg-[#238636]"
        >
          <Plus className="h-4 w-4" strokeWidth={2.25} />
          New ticket
        </button>
      </div>
    </div>
  );
}

export default TicketHeader;
