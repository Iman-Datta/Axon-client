export const STATUS_ORDER = ["DONE", "IN_PROGRESS", "REVIEW", "DEFAULT"];

export const STATUS_CONFIG = {
  DONE: {
    label: "Done",
    dot: "bg-[#3fb950]",
    text: "text-[#3fb950]",
    border: "border-[#3fb950]/35",
    bg: "bg-[#238636]/10",
    ring: "#3fb950",
  },
  IN_PROGRESS: {
    label: "In Progress",
    dot: "bg-[#58a6ff]",
    text: "text-[#58a6ff]",
    border: "border-[#58a6ff]/35",
    bg: "bg-[#1f6feb]/10",
    ring: "#58a6ff",
  },
  REVIEW: {
    label: "Review",
    dot: "bg-[#e3b341]",
    text: "text-[#e3b341]",
    border: "border-[#d29922]/35",
    bg: "bg-[#d29922]/10",
    ring: "#e3b341",
  },
  DEFAULT: {
    label: "To Do",
    dot: "bg-[#8b949e]",
    text: "text-[#8b949e]",
    border: "border-[#8b949e]/35",
    bg: "bg-[#8b949e]/10",
    ring: "#8b949e",
  },
};

export function getStatusConfig(key) {
  return STATUS_CONFIG[key] ?? STATUS_CONFIG.DEFAULT;
}
