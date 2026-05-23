import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const GitHubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

function PasswordInput({ name, value, onChange, placeholder, autoComplete }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        autoComplete={autoComplete}
        className="
          w-full
          bg-[#0d1117] border border-[#30363d]
          rounded-xl px-3 py-2.5 pr-10
          text-sm text-[#c9d1d9]
          placeholder:text-[#484f58]
          focus:outline-none focus:ring-2 focus:ring-[#2f81f7]/40
          focus:border-[#2f81f7]/60 transition
        "
      />
      <button
        type="button"
        onClick={() => setShow((p) => !p)}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute top-1/2 right-3 -translate-y-1/2 text-[#8b949e] hover:text-[#c9d1d9] transition"
      >
        {show ? (
          <AiOutlineEyeInvisible size={17} />
        ) : (
          <AiOutlineEye size={17} />
        )}
      </button>
    </div>
  );
}

function Register({ onLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // no api call — UI only
  };

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-[#c9d1d9]">Create account</h2>
        <p className="mt-1 text-xs text-[#8b949e]">Start building with Axon</p>
      </div>

      {/* OAUTH BUTTONS */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          className="
            flex items-center justify-center gap-2
            border border-[#30363d]
            bg-[#0d1117] hover:bg-[#21262d]
            transition-all duration-200
            rounded-xl py-2.5
            text-[#c9d1d9] text-xs font-medium
          "
        >
          <GitHubIcon />
          GitHub
        </button>

        <button
          type="button"
          className="
            flex items-center justify-center gap-2
            border border-[#30363d]
            bg-[#0d1117] hover:bg-[#21262d]
            transition-all duration-200
            rounded-xl py-2.5
            text-[#c9d1d9] text-xs font-medium
          "
        >
          <FcGoogle size={16} />
          Google
        </button>
      </div>

      {/* DIVIDER */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-[#30363d]" />
        <span className="text-xs text-[#8b949e]">or</span>
        <div className="flex-1 h-px bg-[#30363d]" />
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* USERNAME + EMAIL ROW */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block mb-1.5 text-xs text-[#c9d1d9]">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="iman-datta"
              required
              autoComplete="username"
              className="
                w-full
                bg-[#0d1117] border border-[#30363d]
                rounded-xl px-3 py-2.5
                text-sm text-[#c9d1d9]
                placeholder:text-[#484f58]
                focus:outline-none focus:ring-2 focus:ring-[#2f81f7]/40
                focus:border-[#2f81f7]/60 transition
              "
            />
          </div>

          <div>
            <label className="block mb-1.5 text-xs text-[#c9d1d9]">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              autoComplete="email"
              className="
                w-full
                bg-[#0d1117] border border-[#30363d]
                rounded-xl px-3 py-2.5
                text-sm text-[#c9d1d9]
                placeholder:text-[#484f58]
                focus:outline-none focus:ring-2 focus:ring-[#2f81f7]/40
                focus:border-[#2f81f7]/60 transition
              "
            />
          </div>
        </div>

        {/* PASSWORD + CONFIRM ROW */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block mb-1.5 text-xs text-[#c9d1d9]">
              Password
            </label>
            <PasswordInput
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>

          <div>
            <label className="block mb-1.5 text-xs text-[#c9d1d9]">
              Confirm password
            </label>
            <PasswordInput
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="new-password"
            />
          </div>
        </div>

        {/* SUBMIT */}
        <button
          type="submit"
          className="
            w-full bg-[#2f81f7] hover:bg-[#1f6feb]
            text-white rounded-xl py-2.5
            text-sm font-medium
            transition-all duration-200
            shadow-md shadow-blue-500/20
            mt-1
          "
        >
          Create Account
        </button>
      </form>

      {/* FOOTER */}
      <p className="text-center text-xs text-[#8b949e]">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onLogin}
          className="text-[#2f81f7] hover:text-[#58a6ff] font-medium transition"
        >
          Sign in
        </button>
      </p>
    </div>
  );
}

export default Register;