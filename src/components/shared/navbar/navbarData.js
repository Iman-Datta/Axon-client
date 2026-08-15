import {
  LayoutDashboard,
  FolderGit2,
  UserRound,
  BarChart3,
  Settings,
  Building2,
  ListChecks,
} from "lucide-react";

export const publicNav = ["Features", "Pricing", "About"];

export const getPrivateNav = (
  workspaceSlug,
  workspaceType,
  peopleCount = 0,
) => {
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
    {
      name: "My work",
      path: `/${workspaceSlug}/my-work`,
      icon: ListChecks,
    },
  ];

  if (workspaceType === "organization") {
    nav.push({
      name: "People",
      path: `/${workspaceSlug}/people`,
      icon: UserRound,
      count: peopleCount,
    });
  }
  if (workspaceType === "personal") {
    nav.push({
      name: "organizations",
      path: `/${workspaceSlug}/organizations`,
      icon: Building2,
    });
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
