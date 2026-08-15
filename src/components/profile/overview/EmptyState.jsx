function EmptyState({ icon: Icon, iconClassName = "text-[#3fb950]", title, description }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      {Icon && (
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#21262d] text-[#8b949e]">
          <Icon size={18} className={iconClassName} />
        </div>
      )}
      <h4 className="mt-3 text-sm font-semibold text-[#f0f6fc]">{title}</h4>
      {description && <p className="mt-1 max-w-sm text-xs text-[#8b949e]">{description}</p>}
    </div>
  );
}

export default EmptyState;
