import { cn } from "../../lib/utils";
import {
  Monitor,
  Cloud,
  Shield,
  Server,
  HardDrive,
  Database,
  Radio,
  Box,
} from "lucide-react";

import { FaGithub } from "react-icons/fa6";

const flow = [
  {
    icon: Monitor,
    title: "React + Vite",
    tag: "Frontend",
    desc: "SPA client, built and bundled with Vite",
  },
  {
    icon: Cloud,
    title: "Vercel",
    tag: "Hosting",
    desc: "Static frontend deployment & edge delivery",
  },
  {
    icon: Shield,
    title: "Cloudflare Tunnel",
    tag: "Ingress",
    desc: "Secure tunnel into the home network — no exposed ports",
  },
  {
    icon: Server,
    title: "Django REST Framework",
    tag: "API layer",
    desc: "Auth, business logic, and REST endpoints",
    branches: [
      { icon: Radio, label: "Django Channels", note: "real-time (WebSockets)" },
      {
        icon: FaGithub,
        label: "GitHub API / Webhooks",
        note: "git-aware automation",
      },
    ],
  },
  {
    icon: HardDrive,
    title: "Mini PC · Home Server",
    tag: "Compute",
    desc: "Self-hosted Debian linux running the Django backend",
  },
  {
    icon: Database,
    title: "Supabase PostgreSQL",
    tag: "Database",
    desc: "Managed relational database",
    branches: [
      { icon: Box, label: "Cloudflare R2", note: "object / file storage" },
    ],
  },
];

const stack = [
  {
    label: "Frontend",
    items: [
      "React 19",
      "Vite",
      "Tailwind CSS",
      "Redux Toolkit",
      "React Router",
      "dnd-kit",
      "Framer Motion",
      "Lucide React",
    ],
  },
  {
    label: "Backend",
    items: [
      "Django 6",
      "Django REST Framework",
      "Django Channels",
      "SimpleJWT",
      "PostgreSQL",
      "django-cors-headers",
      "django-storages",
      "boto3",
      "Pillow",
      "Resend",
    ],
  },
  {
    label: "Infrastructure / Deployment",
    items: [
      "Vercel",
      "Mini PC / Home Server",
      "Docker",
      "Cloudflare Tunnel",
      "Supabase",
      "Cloudflare R2",
    ],
  },
  {
    label: "Integration",
    items: ["GitHub API", "GitHub Webhooks"],
  },
];

function FlowNode({ node, isLast }) {
  const Icon = node.icon;
  return (
    <div className="relative flex gap-4 sm:gap-5">
      {/* connector line */}
      <div className="flex flex-col items-center">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-primary sm:size-11">
          <Icon className="size-4.5 sm:size-5" strokeWidth={1.75} />
        </div>
        {!isLast && <div className="my-1 w-px flex-1 bg-border" />}
      </div>

      <div className={cn("flex-1", !isLast && "pb-8")}>
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-[15px] font-semibold text-foreground">
            {node.title}
          </h3>
          <span className="rounded-sm border border-border px-1.5 py-px font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
            {node.tag}
          </span>
        </div>
        <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
          {node.desc}
        </p>

        {node.branches && (
          <div className="mt-3 flex flex-col gap-2 border-l border-dashed border-border pl-4 sm:flex-row sm:flex-wrap sm:gap-3 sm:border-l-0 sm:pl-0">
            {node.branches.map((b) => {
              const BIcon = b.icon;
              return (
                <div
                  key={b.label}
                  className="flex items-center gap-2 rounded-md border border-border bg-card/60 px-2.5 py-1.5 sm:w-fit"
                >
                  <BIcon className="size-3.5 text-review" strokeWidth={1.75} />
                  <span className="text-[12px] font-medium text-foreground">
                    {b.label}
                  </span>
                  <span className="hidden font-mono text-[10px] text-muted-foreground sm:inline">
                    · {b.note}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function StackColumn({ group }) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="size-1.5 rounded-full bg-primary" />
        <h4 className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          {group.label}
        </h4>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {group.items.map((item) => (
          <span
            key={item}
            className="rounded-md border border-border bg-card px-2.5 py-1 text-[12px] text-foreground/90 transition-colors hover:border-primary/50 hover:text-primary"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ArchitectureSection() {
  return (
    <section className="relative border-b border-border py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
            System Overview
          </span>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-[28px]">
            Not just UI and API calls. A system, end to end.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Frontend and backend are fully decoupled, talking over a REST API,
            with a self-hosted server, a real-time layer, and GitHub events
            wired directly into the workflow.
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Flow diagram */}
          <div className="panel rounded-lg border border-border bg-surface/50 p-6 sm:p-8">
            {flow.map((node, i) => (
              <FlowNode
                key={node.title}
                node={node}
                isLast={i === flow.length - 1}
              />
            ))}
          </div>

          {/* Tech stack */}
          <div className="flex flex-col gap-8">
            {stack.map((group) => (
              <StackColumn key={group.label} group={group} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
