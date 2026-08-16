import { cn } from "../../lib/utils";

export function AxonMark({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-5 text-primary", className)}
      aria-hidden="true"
    >
      <path
        d="M12 2.5 3.5 21h4l1.7-4h5.6l1.7 4h4L12 2.5Zm-1.5 11 1.5-3.6 1.5 3.6h-3Z"
        fill="currentColor"
      />
      <circle
        cx="12"
        cy="12"
        r="10.2"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.35"
      />
    </svg>
  );
}

export function SectionLabel({ children }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
      {children}
    </span>
  );
}

export function SectionHeading({ label, title, description, className }) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {label ? <SectionLabel>{label}</SectionLabel> : null}
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-[28px]">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}

const avatarPalette = [
  "bg-primary/20 text-primary",
  "bg-done/15 text-done",
  "bg-review/15 text-review",
  "bg-danger/15 text-danger",
  "bg-secondary text-muted-foreground",
];

export function Avatar({ name, size = 22, index = 0, ring }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <span
      title={name}
      style={{ width: size, height: size, fontSize: size * 0.4 }}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full font-mono font-medium uppercase",
        avatarPalette[index % avatarPalette.length],
        ring && "ring-2 ring-background",
      )}
    >
      {initials}
    </span>
  );
}

// Status is one of: "todo" | "dev" | "review" | "done"
export const statusMeta = {
  todo: { label: "Todo", color: "text-todo", dot: "bg-todo" },
  dev: { label: "Development", color: "text-dev", dot: "bg-dev" },
  review: { label: "Review", color: "text-review", dot: "bg-review" },
  done: { label: "Done", color: "text-done", dot: "bg-done" },
};

export function ColumnHeader({ status, count }) {
  const meta = statusMeta[status];
  return (
    <div className="flex items-center gap-2 px-1 pb-2">
      <span className={cn("size-1.5 rounded-full", meta.dot)} />
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        {meta.label}
      </span>
      <span className="ml-auto font-mono text-[10px] text-muted-foreground/70">
        {count}
      </span>
    </div>
  );
}

// level is one of: "high" | "medium" | "low"
export function Priority({ level }) {
  const map = {
    high: "text-danger border-danger/30",
    medium: "text-review border-review/30",
    low: "text-muted-foreground border-border",
  };
  return (
    <span
      className={cn(
        "rounded-sm border px-1.5 py-px font-mono text-[9px] uppercase tracking-wider",
        map[level],
      )}
    >
      {level}
    </span>
  );
}
