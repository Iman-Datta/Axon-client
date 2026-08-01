import {
  Bug,
  Sparkles,
  ListTodo,
  TrendingUp,
  SignalLow,
  SignalMedium,
  SignalHigh,
  AlertTriangle,
} from "lucide-react";

// Status keeps the pill treatment — it's a state indicator, that's the
// one place a badge reads as "status", not decoration.
export const STATUS_STYLES = {
  DRAFT: "bg-[#6e7681]/10 text-[#8b949e] ring-[#6e7681]/30",
  OPEN: "bg-[#238636]/10 text-[#3fb950] ring-[#238636]/30",
  BLOCKED: "bg-red-500/10 text-red-400 ring-red-500/30",
  DONE: "bg-[#388bfd]/10 text-[#58a6ff] ring-[#388bfd]/30",
  CANCELLED: "bg-[#6e7681]/10 text-[#8b949e] ring-[#6e7681]/30",
};

// Type — plain text + icon, colored, no pill. Reads like a Jira/Linear
// issue-type column, not a "tag".
export const TYPE_TEXT_STYLES = {
  TASK: "text-[#8b949e]",
  FEATURE: "text-[#a371f7]",
  IMPROVEMENT: "text-[#3fb950]",
  BUG: "text-[#f85149]",
};

export const TYPE_ICONS = {
  TASK: ListTodo,
  FEATURE: Sparkles,
  IMPROVEMENT: TrendingUp,
  BUG: Bug,
};

// Priority — plain text + signal icon, colored by severity, no pill.
export const PRIORITY_TEXT_STYLES = {
  LOW: "text-[#6e7681]",
  MEDIUM: "text-[#8b949e]",
  HIGH: "text-[#e3b341]",
  URGENT: "text-[#f85149]",
  CRITICAL: "text-[#f85149]",
};

export const PRIORITY_ICONS = {
  LOW: SignalLow,
  MEDIUM: SignalMedium,
  HIGH: SignalHigh,
  URGENT: AlertTriangle,
  CRITICAL: AlertTriangle,
};

const FALLBACK_STYLE = "bg-[#161b22] text-[#8b949e] ring-[#30363d]";
const FALLBACK_TEXT = "text-[#8b949e]";

export const getStatusStyle = (status) =>
  STATUS_STYLES[status] || FALLBACK_STYLE;

export const getTypeTextStyle = (type) =>
  TYPE_TEXT_STYLES[type] || FALLBACK_TEXT;
export const getTypeIcon = (type) => TYPE_ICONS[type] || ListTodo;

export const getPriorityTextStyle = (priority) =>
  PRIORITY_TEXT_STYLES[priority] || FALLBACK_TEXT;
export const getPriorityIcon = (priority) =>
  PRIORITY_ICONS[priority] || SignalMedium;

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
