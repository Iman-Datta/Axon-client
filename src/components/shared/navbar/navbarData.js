import {
  LayoutDashboard,
  FolderGit2,
  Users,
  UserRound,
  BarChart3,
  Settings,
  Building2,
} from "lucide-react";

export const publicNav = ["Features", "Pricing", "About"];

export const getPrivateNav = (
  workspaceSlug,
  workspaceType,
  projectCount = 0,
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
      count: projectCount,
    },
  ];

  if (workspaceType === "organization") {
    nav.push(
      {
        name: "Teams",
        path: `/${workspaceSlug}/teams`,
        icon: Users,
      },
      {
        name: "People",
        path: `/${workspaceSlug}/people`,
        icon: UserRound,
        count: peopleCount,
      },
    );
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
