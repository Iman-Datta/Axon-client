function WebhookCard() {
  return (
    <div className="rounded-xl border border-yellow-500 bg-[#161b22] p-6">
      <h2 className="text-xl font-semibold text-yellow-300">
        Webhook Required
      </h2>

      <p className="mt-2 text-sm text-gray-400">
        Your repository is connected but no webhook exists.
      </p>

      <button className="mt-6 rounded-lg bg-yellow-600 px-4 py-2 text-white hover:bg-yellow-500">
        Create Webhook
      </button>
    </div>
  );
}

export default WebhookCard;
