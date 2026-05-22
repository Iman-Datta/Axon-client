import { Link } from "react-router-dom";
import AxonLogo from "./AxonLogo";

function Navbar() {
  const navItems = ["Features", "Workflow", "About", "Contact"];

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-[#30363d]/60 bg-[#0d1117]/90 backdrop-blur-xl">
      <div className="w-full px-6 lg:px-10">
        <div className="h-20 flex items-center justify-between">
          {/* LEFT SECTION */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3.5 group">
              <div className="transition-transform duration-500 group-hover:scale-105">
                <AxonLogo />
              </div>
              {/* Logo name */}
              <div className="flex items-baseline gap-2.5">
                <span
                  className="text-[22px] font-semibold tracking-tight"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    background: "linear-gradient(135deg, #e2e8f0, #94a3b8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Axon
                </span>
              </div>
            </Link>

            {/* Navigation */}
            <nav
              className="hidden md:flex items-center gap-9 ml-16"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-[13px] font-medium text-[#6b7280] hover:text-[#c9d1d9] tracking-[0.2px] transition-colors duration-200"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* RIGHT SECTION */}
          <Link
            to="/auth"
            className="text-[13px] font-medium text-[#c9d1d9] hover:text-white border border-[#30363d] hover:border-[#4b5563] hover:bg-[#161b22] px-5 py-2 rounded-[10px] tracking-[0.3px] transition-all duration-200"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
