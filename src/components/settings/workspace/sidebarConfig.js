import {
  UserRound,
  UserCog,
  Shield,
  Link2,
  TriangleAlert,
  Settings,
  ShieldCheck,
  Plug,
} from "lucide-react";

export const personalItems = [
  { label: "Profile", path: "", icon: UserRound },
  { label: "Account", path: "account", icon: UserCog },
  { label: "Security", path: "security", icon: Shield },
  { label: "Connections", path: "connections", icon: Link2 },
  { label: "Danger Zone", path: "danger", icon: TriangleAlert, isDanger: true },
];

export const organizationItems = [
  { label: "General", path: "", icon: Settings },
  { label: "Permissions", path: "permissions", icon: ShieldCheck },
  { label: "Integrations", path: "integrations", icon: Plug },
  { label: "Danger Zone", path: "danger", icon: TriangleAlert, isDanger: true },
];
