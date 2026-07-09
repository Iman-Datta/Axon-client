function SidebarItem({ item }) {
  const Icon = item.icon;

  return (
    <button
      className="
        w-full
        flex
        items-center
        gap-3
        px-3
        py-2
        rounded-md
        text-[#e6edf3]
        hover:bg-[#21262d]
        transition-colors
      "
    >
      <Icon size={18} className="text-[#8b949e]" />

      <span>{item.title}</span>
    </button>
  );
}

export default SidebarItem;
