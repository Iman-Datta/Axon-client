import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { FaLinkedin, FaGithub, FaInstagram, FaFacebook } from "react-icons/fa6";

const navigationColumns = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "#top" },
      { label: "Manual vs Git-Aware", href: "#comparison" },
      { label: "For Developers", href: "#developers" },
      { label: "Collaboration", href: "#collaboration" },
      { label: "Organizations", href: "#organizations" },
      { label: "System Overview", href: "#architecture" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Get Started", href: "#get-started" },
      {
        label: "Source Code",
        href: "https://github.com/Iman-Datta/Axon-Server",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/iman-datta-161615307/",
      },
      { label: "Email", href: "mailto:dattaiman56@gmail.com" },
    ],
  },
];

const socialLinks = [
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/iman-datta-161615307/",
    label: "LinkedIn",
  },
  {
    icon: FaGithub,
    href: "https://github.com/Iman-Datta",
    label: "GitHub",
  },
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/i_datta_/",
    label: "Instagram",
  },
  {
    icon: FaFacebook,
    href: "https://www.facebook.com/iman.datta.756",
    label: "Facebook",
  },
];

export function Footer() {
  const [copied, setCopied] = useState(false);
  const email = "dattaiman56@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="border-t border-border/60 bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand & Creator Info */}
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <img
                src="/Logo.png"
                alt="Axon"
                className="h-9 w-9 object-contain"
              />
              <span className="font-mono text-sm font-semibold">Axon</span>
            </div>
            <p className="font-mono text-xs text-muted-foreground">
              Git-aware project management
            </p>

            {/* Developed By Section */}
            <div className="flex items-center gap-2.5 pt-2">
              <span className="text-xs text-muted-foreground">
                Developed by{" "}
                <span className="font-medium text-foreground">Iman Datta</span>
              </span>
            </div>

            {/* Email with Copy Button */}
            <div className="flex items-center gap-2 pt-1">
              <span className="font-mono text-xs text-muted-foreground">
                {email}
              </span>
              <button
                onClick={handleCopyEmail}
                className="inline-flex size-6 items-center justify-center rounded border border-border bg-card hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                title="Copy Email"
              >
                {copied ? (
                  <Check className="size-3 text-emerald-500" />
                ) : (
                  <Copy className="size-3" />
                )}
              </button>
            </div>

            {/* Social Links using react-icons/fa6 */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          {navigationColumns.map((col) => (
            <div key={col.title} className="space-y-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {col.title}
              </p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={
                        link.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        link.href.startsWith("http") ? "noreferrer" : undefined
                      }
                      className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
