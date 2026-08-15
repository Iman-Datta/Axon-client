function SectionCard({ icon: Icon, title, count, action, children, className = "" }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-[#30363d] bg-[#161b22] shadow-xl ${className}`}>
      <div className="flex items-center justify-between border-b border-[#21262d] px-6 py-4">
        <div className="flex items-center gap-2.5">
          {Icon && <Icon size={15} className="text-[#58a6ff]" />}
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#c9d1d9]">{title}</h3>
          {typeof count === "number" && (
            <span className="inline-flex items-center rounded-full border border-[#30363d] bg-[#21262d] px-2.5 py-0.5 text-xs font-semibold text-[#8b949e]">
              {count}
            </span>
          )}
        </div>
        {action}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

export default SectionCard;
