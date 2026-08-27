import { useState } from "react";
import { ArrowLeft } from "lucide-react";

function ForgotPassword({ onBack, onSendOtp, onResetPassword }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); // 1: Send OTP, 2: Verify & Reset
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const data = await onSendOtp(email);
      setStep(2);
      setMessage({
        type: "success",
        text: data.message || "OTP sent to your email.",
      });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Something went wrong. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const data = await onResetPassword(email, otp, newPassword);
      setMessage({
        type: "success",
        text: data.message || "Password reset successfully!",
      });
      setTimeout(() => onBack(), 2000);
    } catch (err) {
      setMessage({
        type: "error",
        text: err.message || "Something went wrong. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs text-[#8b949e] hover:text-[#c9d1d9] transition"
      >
        <ArrowLeft size={14} />
        Back to sign in
      </button>

      <div>
        <h2 className="text-2xl font-bold text-[#c9d1d9]">
          {step === 1 ? "Reset password" : "Enter OTP & New Password"}
        </h2>
        <p className="mt-1 text-xs text-[#8b949e]">
          {step === 1
            ? "Enter your email to receive a verification OTP."
            : `Enter the OTP sent to ${email} and your new password.`}
        </p>
      </div>

      {message.text && (
        <div
          className={`px-4 py-3 rounded-xl text-xs border ${
            message.type === "success"
              ? "bg-green-500/10 border-green-500/25 text-green-400"
              : "bg-red-500/10 border-red-500/25 text-red-400"
          }`}
        >
          {message.text}
        </div>
      )}

      {step === 1 ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <label className="block mb-1.5 text-xs text-[#c9d1d9]">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl px-3 py-2.5 text-sm text-[#c9d1d9] placeholder:text-[#484f58] focus:outline-none focus:ring-2 focus:ring-[#2f81f7]/40 focus:border-[#2f81f7]/60 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2f81f7] hover:bg-[#1f6feb] text-white rounded-xl py-2.5 text-sm font-medium transition-all duration-200 shadow-md shadow-blue-500/20 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label className="block mb-1.5 text-xs text-[#c9d1d9]">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="6-digit code"
              required
              maxLength={6}
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl px-3 py-2.5 text-sm text-[#c9d1d9] placeholder:text-[#484f58] focus:outline-none focus:ring-2 focus:ring-[#2f81f7]/40 focus:border-[#2f81f7]/60 transition tracking-widest"
            />
          </div>

          <div>
            <label className="block mb-1.5 text-xs text-[#c9d1d9]">
              New Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-xl px-3 py-2.5 text-sm text-[#c9d1d9] placeholder:text-[#484f58] focus:outline-none focus:ring-2 focus:ring-[#2f81f7]/40 focus:border-[#2f81f7]/60 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#2f81f7] hover:bg-[#1f6feb] text-white rounded-xl py-2.5 text-sm font-medium transition-all duration-200 shadow-md shadow-blue-500/20 disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      )}
    </div>
  );
}

export default ForgotPassword;
