import { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import ForgotPassword from "../components/auth/ForgotPassword";
import AxonLogo from "../components/shared/AxonLogo";

function Auth() {
  const [view, setView] = useState("login");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-[#0d1117]">
      <div
        className="
          w-full
          max-w-4xl
          rounded-2xl
          overflow-hidden
          border
          border-[#30363d]
          shadow-2xl
          shadow-black/50
          grid
          grid-cols-1
          md:grid-cols-2
        "
      >
        {/* LEFT PANEL */}
        <div
          className="
            hidden
            md:flex
            flex-col
            justify-center
            bg-[#0d1117]
            border-r
            border-[#30363d]
            px-10
            py-12
          "
        >
          <div className="space-y-10">
            {/* LOGO */}
            <div className="flex items-center gap-3">
              <AxonLogo />
              <div>
                <h1 className="text-lg font-semibold text-[#c9d1d9]">Axon</h1>
                <p className="text-xs text-[#8b949e]">
                  Developer workflow platform
                </p>
              </div>
            </div>

            {/* TAGLINE */}
            <div className="space-y-3">
              <h2 className="text-4xl font-bold leading-tight text-[#c9d1d9]">
                Build faster.
                <br />
                Ship smarter.
              </h2>
              <p className="text-sm text-[#8b949e] leading-relaxed">
                Manage projects, automate workflows, collaborate with teams, and
                track development in real-time.
              </p>
            </div>

            <p className="text-xs text-[#6e7681]">
              Built for developers &amp; engineering teams.
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="relative flex items-start justify-center p-7 md:p-10 bg-[#161b22]">
          {/* CLOSE */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-5 right-5 text-[#8b949e] hover:text-[#c9d1d9] transition z-10"
          >
            <X size={20} />
          </button>

          <div className="w-full max-w-sm">
            {view === "login" && (
              <Login
                onRegister={() => setView("register")}
                onForgot={() => setView("forgot")}
              />
            )}
            {view === "register" && (
              <Register onLogin={() => setView("login")} />
            )}
            {view === "forgot" && (
              <ForgotPassword onBack={() => setView("login")} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
