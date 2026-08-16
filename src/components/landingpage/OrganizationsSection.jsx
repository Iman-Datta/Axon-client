import { Avatar, SectionHeading } from "./primitives";
import { Building2, Folder, Users, KeyRound } from "lucide-react";

const levels = [
  { label: "Organization", icon: Building2, value: "Acme Engineering" },
  { label: "Projects", icon: Folder, value: "Website · Mobile App · Internal Tools" },
  { label: "Project members", icon: Users, value: "9 people across 3 projects" },
  { label: "Roles", icon: KeyRound, value: "Owner · Lead · Developer · Viewer" },
];

const members = [
  { name: "Ankita Rao", role: "Owner" },
  { name: "Rahul Menon", role: "Lead" },
  { name: "Iman Sheikh", role: "Developer" },
  { name: "Devika N", role: "Developer" },
  { name: "Sam Okafor", role: "Viewer" },
];

const projects = [
  { name: "Website", tickets: 18, members: 4 },
  { name: "Mobile App", tickets: 26, members: 5 },
  { name: "Internal Tools", tickets: 11, members: 3 },
];

export function OrganizationsSection() {
  return (
    <section id="about" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <SectionHeading
          label="Organizations"
          title="From a solo repository to an engineering org."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-[300px_minmax(0,1fr)]">
          <div className="panel p-5">
            {levels.map((l, i) => {
              const Icon = l.icon;
              return (
                <div key={l.label} className="relative flex gap-3 pb-5 last:pb-0">
                  {i < levels.length - 1 && (
                    <span className="absolute left-[15px] top-8 bottom-0 w-px bg-border" />
                  )}
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-md border border-border bg-card">
                    <Icon className="size-3.5 text-primary" />
                  </span>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      {l.label}
                    </p>
                    <p className="mt-0.5 text-[12.5px]">{l.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="panel overflow-hidden">
            <div className="flex items-center gap-2 border-b border-border bg-surface-raised px-4 py-2.5">
              <Building2 className="size-3.5 text-primary" />
              <span className="text-[13px] font-medium">Acme Engineering</span>
              <span className="ml-auto font-mono text-[10px] text-muted-foreground">
                3 projects
              </span>
            </div>
            <div className="grid gap-px bg-border sm:grid-cols-3">
              {projects.map((p) => (
                <div key={p.name} className="bg-surface p-4">
                  <p className="text-[13px]">{p.name}</p>
                  <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                    {p.tickets} tickets · {p.members} members
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t border-border p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                Members
              </p>
              <ul className="mt-3 divide-y divide-border">
                {members.map((m, i) => (
                  <li key={m.name} className="flex items-center gap-3 py-2">
                    <Avatar name={m.name} index={i} size={22} />
                    <span className="text-[12.5px]">{m.name}</span>
                    <span className="ml-auto rounded-sm border border-border px-1.5 py-px font-mono text-[10px] text-muted-foreground">
                      {m.role}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
