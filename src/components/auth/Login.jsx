import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Login({ onRegister, onForgot }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h2 className="text-3xl font-bold text-[#c9d1d9]">Welcome back</h2>

        <p className="mt-2 text-sm text-[#8b949e]">
          Sign in to continue to Axon
        </p>
      </div>

      {/* GOOGLE BUTTON */}
      <button
        type="button"
        className="w-full border border-[#30363d] bg-[#0d1117] hover:bg-[#21262d] transition-all duration-200 rounded-xl py-3.5 flex items-center justify-center gap-3 text-[#c9d1d9] font-medium"
      >
        <FcGoogle size={20} />
        Continue with Google
      </button>

      {/* DIVIDER */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-[#30363d]" />

        <span className="text-sm text-[#8b949e]">or</span>

        <div className="flex-1 h-px bg-[#30363d]" />
      </div>

      {/* FORM */}
      <form className="space-y-5">
        {/* EMAIL */}
        <div>
          <label className="block mb-2 text-sm text-[#c9d1d9]">Email</label>

          <input
            type="email"
            placeholder="you@example.com"
            className="
              w-full
              bg-[#0d1117]
              border
              border-[#30363d]
              rounded-xl
              px-4
              py-3
              text-[#c9d1d9]
              placeholder:text-[#8b949e]
              focus:outline-none
              focus:ring-2
              focus:ring-[#2f81f7]/40
            "
          />
        </div>

        {/* PASSWORD */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-[#c9d1d9]">Password</label>

            <button
              type="button"
              onClick={onForgot}
              className="text-sm text-[#2f81f7] hover:text-[#58a6ff] transition"
            >
              Forgot password?
            </button>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className="
                w-full
                bg-[#0d1117]
                border
                border-[#30363d]
                rounded-xl
                px-4
                py-3
                pr-12
                text-[#c9d1d9]
                placeholder:text-[#8b949e]
                focus:outline-none
                focus:ring-2
                focus:ring-[#2f81f7]/40
              "
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="
                absolute
                top-1/2
                right-4
                -translate-y-1/2
                text-[#8b949e]
                hover:text-white
                transition
              "
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="
            w-full
            bg-[#2f81f7]
            hover:bg-[#1f6feb]
            text-white
            rounded-xl
            py-3.5
            font-medium
            transition-all
            duration-200
            shadow-lg
            shadow-blue-500/20
          "
        >
          Sign In
        </button>
      </form>

      {/* FOOTER */}
      <div className="text-center text-sm text-[#8b949e]">
        Don’t have an account?{" "}
        <button
          onClick={onRegister}
          className="text-[#2f81f7] hover:text-[#58a6ff] font-medium transition"
        >
          Create one
        </button>
      </div>
    </div>
  );
}

export default Login;
