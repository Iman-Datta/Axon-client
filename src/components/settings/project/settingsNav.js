import {
  Settings,
  Workflow,
  Tags,
  TriangleAlert,
  User,
  Shield,
  Bell,
  Users,
} from "lucide-react";

export const SETTINGS_NAV = {
  project: [
    { name: "General", icon: Settings, path: "" },
    { name: "Workflow", icon: Workflow, path: "workflow" },
    { name: "Labels", icon: Tags, path: "labels" },
    {
      name: "Manage & Delete",
      icon: TriangleAlert,
      path: "danger",
      danger: true,
    },
  ],

  organization: [
    { name: "General", icon: Settings, path: "general" },
    { name: "Members", icon: Users, path: "members" },
    { name: "Roles", icon: Shield, path: "roles" },
    {
      name: "Manage & Delete",
      icon: TriangleAlert,
      path: "danger",
      danger: true,
    },
  ],

  account: [
    { name: "Profile", icon: User, path: "profile" },
    { name: "Security", icon: Shield, path: "security" },
    { name: "Notifications", icon: Bell, path: "notifications" },
    {
      name: "Manage & Delete",
      icon: TriangleAlert,
      path: "danger",
      danger: true,
    },
  ],
};
