import { Webhook, AlertTriangle, ArrowRight } from "lucide-react";

function WebhookCard() {
  return (
    <div className="rounded-xl border border-[#30363d] bg-[#161b22]">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10">
            <Webhook className="h-6 w-6 text-yellow-400" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-[#e6edf3]">
                GitHub Webhook
              </h2>

              <span className="inline-flex items-center gap-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-2 py-1 text-xs font-medium text-yellow-400">
                <AlertTriangle className="h-3.5 w-3.5" />
                Action Required
              </span>
            </div>

            <p className="mt-3 text-sm leading-6 text-[#8b949e]">
              Your repository is connected, but no webhook has been configured.
              Create a webhook to receive real-time GitHub events such as
              commits, pull requests, and branch updates.
            </p>

            <div className="mt-6 rounded-lg border border-[#30363d] bg-[#0d1117] p-4">
              <p className="mb-2 text-sm font-medium text-[#e6edf3]">
                Without a webhook
              </p>

              <ul className="space-y-2 text-sm text-[#8b949e]">
                <li>Ticket status won't update automatically</li>
                <li>Pull requests won't sync with Axon</li>
                <li>Commit activity won't be tracked</li>
              </ul>
            </div>

            <button className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#238636] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#2ea043]">
              <Webhook className="h-4 w-4" />
              Create Webhook
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WebhookCard;
