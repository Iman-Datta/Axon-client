// src/pages/ServerDownPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ServerCrash, Mail, Copy, Check, Home } from "lucide-react";
import { FaLinkedin, FaGithub } from "react-icons/fa6";

const EMAIL = "dattaiman56@gmail.com";

const contactLinks = [
  {
    icon: FaGithub,
    href: "https://github.com/Iman-Datta",
    label: "GitHub",
  },
  {
    icon: FaLinkedin,
    href: "https://www.linkedin.com/in/iman-datta-161615307/",
    label: "LinkedIn",
  },
];

function ServerDownPage() {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#0b0e14] px-6 text-center text-[#f0f6fc]">
      {/* Background Glow Effect */}
      <div className="pointer-events-none absolute -top-40 h-96 w-96 rounded-full bg-[#f85149]/10 blur-[120px]" />

      {/* Container */}
      <div className="relative z-10 flex max-w-md flex-col items-center">
        {/* Animated Icon Badge */}
        <div className="group mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#30363d] bg-[#161b22]/80 backdrop-blur-md shadow-lg transition-transform hover:scale-105">
          <ServerCrash className="h-8 w-8 text-[#f85149] transition-transform duration-300 group-hover:rotate-6" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold tracking-tight text-[#f0f6fc] sm:text-3xl">
          Can't reach the server
        </h1>

        {/* Description */}
        <p className="mt-3 text-sm leading-relaxed text-[#8b949e]">
          Axon's backend is self-hosted on my personal infrastructure and is
          currently unreachable. This is likely due to a temporary network or
          power interruption on my end, not an issue with your account.
        </p>

        {/* Home Action Button */}
        <button
          onClick={() => navigate("/")}
          className="group mt-8 flex items-center gap-2 rounded-full bg-gradient-to-b from-[#2f81f7] to-[#1f6feb] px-6 py-2.5 text-sm font-semibold text-white shadow-[0_1px_0_rgba(255,255,255,0.2)_inset,0_4px_16px_rgba(31,111,235,0.4)] transition-all hover:brightness-110 active:scale-[0.98]"
        >
          <Home className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Home</span>
        </button>

        {/* Contact Footer Block */}
        <div className="mt-12 w-full border-t border-[#21262d] pt-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-[#6e7681]">
            Still need something? Reach out
          </p>

          {/* Email Chip */}
          <div className="mt-4 flex items-center justify-center">
            <div className="flex items-center gap-2.5 rounded-full border border-[#30363d] bg-[#161b22]/60 px-4 py-1.5 shadow-sm backdrop-blur-sm">
              <Mail className="h-3.5 w-3.5 text-[#8b949e]" />
              <span className="font-mono text-xs text-[#c9d1d9]">{EMAIL}</span>
              <button
                onClick={handleCopyEmail}
                title="Copy email"
                className="ml-1 flex h-5 w-5 items-center justify-center rounded text-[#6e7681] transition-colors hover:bg-[#21262d] hover:text-[#f0f6fc]"
              >
                {copied ? (
                  <Check className="h-3 w-3 text-[#3fb950]" />
                ) : (
                  <Copy className="h-3 w-3" />
                )}
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {contactLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="rounded-lg p-2 text-[#6e7681] transition-all hover:bg-[#161b22] hover:text-[#f0f6fc] active:scale-95"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServerDownPage;
