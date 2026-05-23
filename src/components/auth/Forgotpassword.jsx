import { useState } from "react";
import { ArrowLeft } from "lucide-react";

function ForgotPassword({ onBack }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // no api call — UI only, just show success state
    setSent(true);
  };

  return (
    <div className="space-y-5">
      {/* BACK */}
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs text-[#8b949e] hover:text-[#c9d1d9] transition"
      >
        <ArrowLeft size={14} />
        Back to sign in
      </button>

      {/* HEADER */}
      <div>
        <h2 className="text-2xl font-bold text-[#c9d1d9]">Reset password</h2>
        <p className="mt-1 text-xs text-[#8b949e]">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

      {sent ? (
        <div className="bg-green-500/10 border border-green-500/25 text-green-400 text-xs rounded-xl px-4 py-4 space-y-1">
          <p className="font-medium text-sm">Check your inbox</p>
          <p className="text-green-400/70">
            If an account exists for <strong>{email}</strong>, a reset link has
            been sent.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1.5 text-xs text-[#c9d1d9]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <button
            type="submit"
            className="
              w-full bg-[#2f81f7] hover:bg-[#1f6feb]
              text-white rounded-xl py-2.5
              text-sm font-medium
              transition-all duration-200
              shadow-md shadow-blue-500/20
            "
          >
            Send Reset Link
          </button>
        </form>
      )}
    </div>
  );
}

export default ForgotPassword;