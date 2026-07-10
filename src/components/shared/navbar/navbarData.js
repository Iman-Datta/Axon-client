import { User, FolderGit2, Building2, Activity, Star } from "lucide-react";

export const publicNav = ["Features", "Workflow", "About", "Contact"];

export const getPrivateNav = (
  username,
  projectCount,
  organizationCount,
  activityCount,
  starCount,
) => [
  {
    name: "Overview",
    path: `/${username}`,
    icon: User,
  },
  {
    name: "Projects",
    path: `/${username}/projects`,
    icon: FolderGit2,
    count: projectCount,
  },
  {
    name: "Organizations",
    path: `/${username}/organizations`,
    icon: Building2,
    count: organizationCount,
  },
  {
    name: "Activity",
    path: `/${username}/activity`,
    icon: Activity,
    count: activityCount,
  },
  {
    name: "Stars",
    path: `/${username}/stars`,
    icon: Star,
    count: starCount,
  },
];
