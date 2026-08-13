import {
  ArrowUp,
  BookOpen,
  Bug,
  CheckSquare,
  ChevronsUp,
  Minus,
  Signal,
  Sparkles,
} from "lucide-react";

export const priorityConfig = {
  LOW: { icon: Minus, color: "#8b949e", label: "Low priority" },
  MEDIUM: { icon: Signal, color: "#d29922", label: "Medium priority" },
  HIGH: { icon: ArrowUp, color: "#f0883e", label: "High priority" },
  URGENT: { icon: ChevronsUp, color: "#f85149", label: "Urgent priority" },
};

export const typeConfig = {
  TASK: { icon: CheckSquare, color: "#8b949e", label: "Task" },
  BUG: { icon: Bug, color: "#f85149", label: "Bug" },
  IMPROVEMENT: { icon: BookOpen, color: "#58a6ff", label: "Improvement" },
  FEATURE: { icon: Sparkles, color: "#a855f7", label: "Feature" },
};
