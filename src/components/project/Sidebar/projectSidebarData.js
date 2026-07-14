import {
  LayoutDashboard,
  KanbanSquare,
  Ticket,
  BookOpen,
  Users,
  Activity,
  Settings,
  Link2,
  Rocket,
  Command,
  Bell,
  ChartNoAxesCombined,
} from "lucide-react";

export const projectItems = [
  {
    name: "Overview",
    icon: LayoutDashboard,
    path: "",
  },
  {
    name: "Board",
    icon: KanbanSquare,
    path: "board",
  },
  {
    name: "Tickets",
    icon: Ticket,
    path: "tickets",
  },
  {
    name: "Epics",
    icon: BookOpen,
    path: "epics",
  },
  {
    name: "Members",
    icon: Users,
    path: "members",
  },
  {
    name: "Activity",
    icon: Activity,
    path: "activity",
  },
];

export const toolItems = [
  {
    name: "Integrations",
    icon: Link2,
    path: "integrations",
    soon: true,
  },
  {
    name: "Development Feed",
    icon: Rocket,
    path: "feed",
    soon: true,
  },
  {
    name: "Command Palette",
    icon: Command,
    path: "command",
    soon: true,
  },
  {
    name: "Notifications",
    icon: Bell,
    path: "notifications",
    soon: true,
  },
  {
    name: "Analytics",
    icon: ChartNoAxesCombined,
    path: "analytics",
    soon: true,
  },
  {
    name: "Settings",
    icon: Settings,
    path: "settings",
  },
];
