function SidebarItem({ item }) {
  const Icon = item.icon;

  return (
    <button
      className="
        w-full
        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-xl
        text-gray-300
        hover:bg-slate-800
        hover:text-white
        transition-all
        duration-200
      "
    >
      <Icon size={18} />

      <span className="font-medium">{item.title}</span>
    </button>
  );
}

export default SidebarItem;
