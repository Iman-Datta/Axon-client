export const isNavItemActive = (pathname, item, username) => {
  if (item.name === "Overview") {
    return pathname === `/${username}`;
  }

  return pathname.startsWith(item.path);
};
