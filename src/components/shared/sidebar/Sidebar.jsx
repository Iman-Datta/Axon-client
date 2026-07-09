import SidebarItem from "./SidebarItem";

function Sidebar({ items, title = "Navigation" }) {
  return (
    <aside
      className="
        w-72
        bg-[#07111f]
        border
        border-slate-800
        rounded-2xl
        p-5
      "
    >
      <h2 className="text-lg font-semibold mb-5">{title}</h2>

      <div className="space-y-2">
        {items.map((item) => (
          <SidebarItem key={item.id} item={item} />
        ))}
      </div>
    </aside>
  );
}

export default Sidebar;
