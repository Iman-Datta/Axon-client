function SectionCard({
  icon: Icon,
  title,
  count,
  action,
  children,
  className = "",
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-[#30363d] bg-[#161b22] ${className}`}
    >
      <div className="flex items-center justify-between border-b border-[#21262d] px-4 py-2.5">
        <div className="flex items-center gap-2">
          {Icon && <Icon size={13} className="text-[#58a6ff]" />}
          <h3 className="text-[11px] font-semibold uppercase tracking-wide text-[#c9d1d9]">
            {title}
          </h3>
          {typeof count === "number" && (
            <span className="inline-flex items-center rounded-full border border-[#30363d] bg-[#21262d] px-1.5 py-0.5 text-[10px] font-semibold text-[#8b949e]">
              {count}
            </span>
          )}
        </div>
        {action}
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

export default SectionCard;
