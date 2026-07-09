import SidebarItem from "./SidebarItem";
import SidebarProfile from "./SidebarProfile";

function Sidebar({ items, title = "Navigation", user }) {
  return (
    <aside className="w-72 h-fit">
      {user && (
        <>
          <SidebarProfile user={user} />
          <div className="border-t border-[#30363d] my-5" />
        </>
      )}

      <h2 className="text-sm font-semibold text-[#8b949e] mb-4">{title}</h2>

      <div className="space-y-1">
        {items.map((item) => (
          <SidebarItem key={item.id} item={item} />
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
