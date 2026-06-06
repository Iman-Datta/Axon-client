import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import OAuth from "./OAuth";

function PasswordInput({ name, value, onChange, placeholder }) {
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
        className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl px-3 py-2.5 pr-10 text-sm text-[#c9d1d9] placeholder:text-[#484f58] focus:outline-none focus:ring-2 focus:ring-[#2f81f7]/40"
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8b949e] hover:text-white"
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

function Register({ onLogin, onRegister }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const username = formData.username.trim();
    const email = formData.email.trim().toLowerCase();

    if (!username) return setError("Username required");

    if (!email) return setError("Email required");

    if (formData.password.length < 8)
      return setError("Password must be at least 8 characters");

    if (formData.password !== formData.confirmPassword)
      return setError("Passwords do not match");

    setLoading(true);

    try {
      await onRegister(username, email, formData.password);
    } catch (err) {
      setError(err?.message || "Unable to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold text-[#c9d1d9]">Create account</h2>

        <p className="text-xs text-[#8b949e] mt-1">Start building with Axon</p>
      </div>

      {error && (
        <div
          className="
          text-sm text-red-400
          bg-red-950/30
          border border-red-900
          px-3 py-2 rounded-lg
        "
        >
          {error}
        </div>
      )}

      <OAuth />

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl px-3 py-2.5"
        />

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl px-3 py-2.5"
        />

        <PasswordInput
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
        />

        <PasswordInput
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
        />

        <button
          disabled={loading}
          className="
            w-full
            bg-[#2f81f7]
            disabled:opacity-60
            rounded-xl
            py-2.5
            text-white
          "
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="text-center text-xs text-[#8b949e]">
        Already have an account?{" "}
        <button onClick={onLogin} className="text-[#2f81f7]">
          Sign in
        </button>
      </p>
    </div>
  );
}

export default Register;
