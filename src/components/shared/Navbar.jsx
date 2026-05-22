import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-[#30363d]/60 bg-[#0d1117]/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="h-20 flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="w-10 h-10 rounded-xl bg-[#2f81f7] flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white font-semibold text-lg">A</span>
            </div>

            {/* App Name */}
            <div className="flex items-center gap-3">
              <h1 className="text-[#c9d1d9] text-xl font-semibold tracking-tight">
                Axon
              </h1>

              <span className="text-xs text-[#8b949e] border border-[#30363d] px-2 py-1 rounded-full">
                v1.0
              </span>
            </div>
          </div>

          {/* CENTER NAVIGATION */}
          <nav className="hidden md:flex items-center gap-10">
            <a
              href="#features"
              className="text-[#8b949e] hover:text-[#c9d1d9] transition-colors duration-200 text-sm font-medium"
            >
              Features
            </a>

            <a
              href="#workflow"
              className="text-[#8b949e] hover:text-[#c9d1d9] transition-colors duration-200 text-sm font-medium"
            >
              Workflow
            </a>

            <a
              href="#about"
              className="text-[#8b949e] hover:text-[#c9d1d9] transition-colors duration-200 text-sm font-medium"
            >
              About
            </a>

            <a
              href="#contact"
              className="text-[#8b949e] hover:text-[#c9d1d9] transition-colors duration-200 text-sm font-medium"
            >
              Contact
            </a>
          </nav>

          {/* RIGHT */}
          <div className="flex items-center">
            <Link
              to="/auth"
              className="border border-[#30363d] bg-[#161b22] hover:bg-[#21262d] px-5 py-2.5 rounded-xl text-[#c9d1d9] hover:text-white transition-all duration-200 text-sm font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
