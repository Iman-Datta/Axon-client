import { AxonMark } from "./primitives";

const columns = [
  { title: "Product", links: ["Features", "How it works", "Git integration"] },
  { title: "Project", links: ["About", "GitHub", "Documentation"] },
];

export function Footer() {
  return (
    <footer className="bg-background">
      <div className="mx-auto flex max-w-6xl flex-wrap gap-10 px-5 py-12">
        <div className="min-w-[180px]">
          <div className="flex items-center gap-2">
            <AxonMark />
            <span className="text-sm font-semibold">Axon</span>
          </div>
          <p className="mt-2 font-mono text-[11px] text-muted-foreground">
            Git-aware project management
          </p>
        </div>
        {columns.map((c) => (
          <div key={c.title} className="min-w-[140px]">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {c.title}
            </p>
            <ul className="mt-3 space-y-2">
              {c.links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}
