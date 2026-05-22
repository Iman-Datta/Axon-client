import { X } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-6 relative overflow-hidden">
      
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-blue-500/10 blur-[180px]" />
      </div>

      {/* MAIN CARD */}
      <div className="relative w-full max-w-6xl border border-[#30363d] rounded-3xl overflow-hidden bg-[#161b22]/80 backdrop-blur-xl shadow-2xl shadow-black/40 grid md:grid-cols-2">
        
        {/* LEFT PANEL */}
        <div className="hidden md:flex flex-col justify-between p-10 border-r border-[#30363d] bg-[#0d1117]">
          
          <div>
            
            {/* LOGO */}
            <div className="flex items-center gap-3">
              
              <div className="w-11 h-11 rounded-xl bg-[#2f81f7] flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="text-white font-semibold text-lg">
                  A
                </span>
              </div>

              <div>
                <h1 className="text-[#c9d1d9] text-2xl font-semibold">
                  Axon
                </h1>

                <p className="text-sm text-[#8b949e]">
                  Developer Workflow Platform
                </p>
              </div>
            </div>

            {/* TEXT */}
            <div className="mt-16">
              
              <span className="text-xs border border-[#30363d] bg-[#161b22] px-3 py-1 rounded-full text-[#8b949e]">
                Git-aware collaboration
              </span>

              <h2 className="mt-6 text-4xl font-bold text-[#c9d1d9] leading-tight">
                Build projects.
                <br />
                Track tickets.
                <br />
                Automate workflows.
              </h2>

              <p className="mt-5 text-[#8b949e] leading-relaxed">
                A modern collaborative workspace built for developers
                with Git-powered automation, Kanban workflows,
                organizations, and real-time updates.
              </p>
            </div>
          </div>

          {/* FOOTER */}
          <div className="text-sm text-[#8b949e]">
            Built for developers and engineering teams.
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="relative p-8 md:p-12 bg-[#161b22]/70">
          
          {/* CLOSE BUTTON */}
          <button className="absolute top-5 right-5 w-10 h-10 rounded-xl border border-[#30363d] bg-[#0d1117] hover:bg-[#21262d] flex items-center justify-center text-[#8b949e] hover:text-white transition-all duration-200">
            <X size={18} />
          </button>

          {/* FORM CONTAINER */}
          <div className="max-w-md mx-auto pt-10">
            
            {/* HEADER */}
            <div>
              
              <h2 className="text-3xl font-bold text-[#c9d1d9]">
                {isLogin ? "Welcome back" : "Create account"}
              </h2>

              <p className="mt-2 text-[#8b949e]">
                {isLogin
                  ? "Sign in to continue to Axon"
                  : "Start managing projects with Axon"}
              </p>
            </div>

            {/* GOOGLE BUTTON */}
            <button className="mt-8 w-full border border-[#30363d] bg-[#0d1117] hover:bg-[#21262d] transition-all duration-200 rounded-xl py-3.5 flex items-center justify-center gap-3 text-[#c9d1d9] font-medium">
              
              <FcGoogle size={20} />

              Continue with Google
            </button>

            {/* DIVIDER */}
            <div className="flex items-center gap-4 my-8">
              
              <div className="flex-1 h-px bg-[#30363d]" />

              <span className="text-sm text-[#8b949e]">
                or
              </span>

              <div className="flex-1 h-px bg-[#30363d]" />
            </div>

            {/* FORM */}
            <form className="space-y-5">
              
              {/* USERNAME */}
              {!isLogin && (
                <div>
                  <label className="block mb-2 text-sm text-[#c9d1d9]">
                    Username
                  </label>

                  <input
                    type="text"
                    placeholder="iman-datta"
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl px-4 py-3 text-[#c9d1d9] placeholder:text-[#8b949e] focus:outline-none focus:ring-2 focus:ring-[#2f81f7]/40"
                  />
                </div>
              )}

              {/* EMAIL */}
              <div>
                <label className="block mb-2 text-sm text-[#c9d1d9]">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl px-4 py-3 text-[#c9d1d9] placeholder:text-[#8b949e] focus:outline-none focus:ring-2 focus:ring-[#2f81f7]/40"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block mb-2 text-sm text-[#c9d1d9]">
                  Password
                </label>

                <div className="relative">
                  
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl px-4 py-3 pr-12 text-[#c9d1d9] placeholder:text-[#8b949e] focus:outline-none focus:ring-2 focus:ring-[#2f81f7]/40"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute top-1/2 right-4 -translate-y-1/2 text-[#8b949e] hover:text-white transition"
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible size={20} />
                    ) : (
                      <AiOutlineEye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              {!isLogin && (
                <div>
                  <label className="block mb-2 text-sm text-[#c9d1d9]">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl px-4 py-3 text-[#c9d1d9] placeholder:text-[#8b949e] focus:outline-none focus:ring-2 focus:ring-[#2f81f7]/40"
                  />
                </div>
              )}

              {/* FORGOT PASSWORD */}
              {isLogin && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-sm text-[#2f81f7] hover:text-[#58a6ff] transition"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                className="w-full bg-[#2f81f7] hover:bg-[#1f6feb] text-white rounded-xl py-3.5 font-medium transition-all duration-200 shadow-lg shadow-blue-500/20"
              >
                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </form>

            {/* SWITCH AUTH */}
            <div className="mt-8 text-center text-sm text-[#8b949e]">
              
              {isLogin ? (
                <>
                  Don’t have an account?{" "}
                  <button
                    onClick={() => setIsLogin(false)}
                    className="text-[#2f81f7] hover:text-[#58a6ff] font-medium transition"
                  >
                    Create one
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setIsLogin(true)}
                    className="text-[#2f81f7] hover:text-[#58a6ff] font-medium transition"
                  >
                    Sign In
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;