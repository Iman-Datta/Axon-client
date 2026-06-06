import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import OAuth from "./OAuth";

function Login({ onLogin, onRegister, onForgot }) {
  const [formData, setFormData] = useState({ identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await onLogin(formData.identifier, formData.password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Detect whether user is typing an email or username
  const isEmail = formData.identifier.includes("@");

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-[#c9d1d9]">Welcome back</h2>
        <p className="mt-1 text-xs text-[#8b949e]">
          Sign in to continue to Axon
        </p>
      </div>

      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 px-3 py-2 rounded-lg">
          {error}
        </div>
      )}

      {/* OAUTH BUTTONS */}
      <OAuth />

      {/* DIVIDER */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-[#30363d]" />
        <span className="text-xs text-[#8b949e]">or</span>
        <div className="flex-1 h-px bg-[#30363d]" />
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label>Email or username</label>

            {formData.identifier.length > 0 && (
              <span className="text-xs text-[#484f58]">
                {isEmail ? "signing in with email" : "signing in with username"}
              </span>
            )}
          </div>
          <input
            type="text"
            name="identifier"
            value={formData.identifier}
            onChange={handleChange}
            placeholder="username or email"
            required
            autoComplete="username"
            className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl px-3 py-2.5 text-sm text-[#c9d1d9] placeholder:text-[#484f58] focus:outline-none focus:ring-2 focus:ring-[#2f81f7]/40 focus:border-[#2f81f7]/60 transition"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs text-[#c9d1d9]">Password</label>
            <button
              type="button"
              onClick={onForgot}
              className="text-xs text-[#2f81f7] hover:text-[#58a6ff] transition"
            >
              Forgot password?
            </button>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl px-3 py-2.5 pr-10 text-sm text-[#c9d1d9] placeholder:text-[#484f58] focus:outline-none focus:ring-2 focus:ring-[#2f81f7]/40 focus:border-[#2f81f7]/60 transition"
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-[#8b949e] hover:text-[#c9d1d9] transition"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={17} />
              ) : (
                <AiOutlineEye size={17} />
              )}
            </button>
          </div>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#2f81f7] hover:bg-[#1f6feb] disabled:opacity-60 disabled:hover:bg-[#2f81f7] text-white rounded-xl py-2.5 text-sm font-medium transition-all duration-200 shadow-md shadow-blue-500/20 mt-1"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      {/* FOOTER */}
      <p className="text-center text-xs text-[#8b949e]">
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={onRegister}
          className="text-[#2f81f7] hover:text-[#58a6ff] font-medium transition"
        >
          Create one
        </button>
      </p>
    </div>
  );
}

export default Login;
