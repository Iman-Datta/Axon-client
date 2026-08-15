import { getStatusConfig } from "./statusConfig";

function StatusBadge({ column, status }) {
  const config = getStatusConfig(column || status);

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${config.border} ${config.bg} px-2.5 py-0.5 text-xs font-medium ${config.text}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}

export default StatusBadge;
