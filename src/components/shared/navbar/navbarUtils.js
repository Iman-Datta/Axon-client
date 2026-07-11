export const isNavItemActive = (pathname, item) => {
  if (item.name === "Overview" || pathname === item.path) {
    return pathname === item.path;
  }

  return pathname.startsWith(item.path);
};
