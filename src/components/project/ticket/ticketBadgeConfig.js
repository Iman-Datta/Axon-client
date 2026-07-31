// components/project/ticket/ticketBadgeConfig.js
export const TYPE_STYLES = {
  FEATURE: "bg-purple-500/10 text-purple-400 ring-purple-500/30",
  BUG: "bg-red-500/10 text-red-400 ring-red-500/30",
  TASK: "bg-blue-500/10 text-blue-400 ring-blue-500/30",
  IMPROVEMENT: "bg-teal-500/10 text-teal-400 ring-teal-500/30",
};

export const STATUS_STYLES = {
  OPEN: "bg-[#238636]/10 text-[#3fb950] ring-[#238636]/30",
  IN_PROGRESS: "bg-[#388bfd]/10 text-[#58a6ff] ring-[#388bfd]/30",
  IN_REVIEW: "bg-yellow-500/10 text-yellow-400 ring-yellow-500/30",
  RESOLVED: "bg-[#238636]/10 text-[#3fb950] ring-[#238636]/30",
  CLOSED: "bg-[#6e7681]/10 text-[#8b949e] ring-[#6e7681]/30",
};

export const PRIORITY_STYLES = {
  LOW: "bg-[#6e7681]/10 text-[#8b949e] ring-[#6e7681]/30",
  MEDIUM: "bg-yellow-500/10 text-yellow-400 ring-yellow-500/30",
  HIGH: "bg-orange-500/10 text-orange-400 ring-orange-500/30",
  URGENT: "bg-red-500/10 text-red-400 ring-red-500/30",
  CRITICAL: "bg-red-500/10 text-red-400 ring-red-500/30",
};

const FALLBACK_STYLE = "bg-[#6e7681]/10 text-[#8b949e] ring-[#6e7681]/30";

export const getTypeStyle = (type) => TYPE_STYLES[type] || FALLBACK_STYLE;
export const getStatusStyle = (status) =>
  STATUS_STYLES[status] || FALLBACK_STYLE;
export const getPriorityStyle = (priority) =>
  PRIORITY_STYLES[priority] || FALLBACK_STYLE;

export const formatLabel = (value) => {
  if (!value) return "-";
  return value
    .toLowerCase()
    .split("_")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
};

export const formatRelativeTime = (dateString) => {
  if (!dateString) return "-";

  const date = new Date(dateString);
  const diffMs = Date.now() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);

  const units = [
    { label: "y", secs: 31536000 },
    { label: "mo", secs: 2592000 },
    { label: "d", secs: 86400 },
    { label: "h", secs: 3600 },
    { label: "m", secs: 60 },
  ];

  for (const unit of units) {
    const value = Math.floor(diffSec / unit.secs);
    if (value >= 1) return `${value}${unit.label} ago`;
  }

  return "just now";
};
