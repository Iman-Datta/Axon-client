import {
  LayoutDashboard,
  FolderGit2,
  UserRound,
  BarChart3,
  Settings,
  Building2,
  ListChecks,
} from "lucide-react";

export const publicNav = [
  { name: "Home", path: "#top" },
  { name: "Manual vs Git-Aware", path: "#comparison" },
  { name: "For Developers", path: "#developers" },
  { name: "Collaboration", path: "#collaboration" },
  { name: "Organizations", path: "#organizations" },
  { name: "Architecture", path: "#architecture" },
];

export const getPrivateNav = (workspaceSlug, workspaceType) => {
  const nav = [
    {
      name: "Overview",
      path: `/${workspaceSlug}`,
      icon: LayoutDashboard,
    },
    {
      name: "Projects",
      path: `/${workspaceSlug}/projects`,
      icon: FolderGit2,
    },
  ];
  if (workspaceType === "organization") {
    nav.push({
      name: "People",
      path: `/${workspaceSlug}/people`,
      icon: UserRound,
    });
  }
  if (workspaceType === "personal") {
    nav.push(
      {
        name: "Organizations",
        path: `/${workspaceSlug}/organizations`,
        icon: Building2,
      },
      {
        name: "My Work",
        path: `/${workspaceSlug}/my-work`,
        icon: ListChecks,
      },
    );
  }
  nav.push(
    {
      name: "Insights",
      path: `/${workspaceSlug}/insights`,
      icon: BarChart3,
    },
    {
      name: "Settings",
      path: `/${workspaceSlug}/settings`,
      icon: Settings,
    },
  );

  return nav;
};
