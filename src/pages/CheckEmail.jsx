import { MailCheck } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import AxonLogo from "../components/shared/AxonLogo";

function CheckEmail() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "your email";

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4">
      <div
        className="
          w-full
          max-w-md
          bg-[#161b22]
          border
          border-[#30363d]
          rounded-2xl
          shadow-2xl
          shadow-black/40
          p-8
          text-center
        "
      >
        {/* LOGO */}
        <div className="flex justify-center mb-6">
          <AxonLogo />
        </div>

        <div
          className="
            mx-auto
            w-16
            h-16
            rounded-full
            bg-[#238636]/10
            flex
            items-center
            justify-center
            mb-6
          "
        >
          <MailCheck size={32} className="text-[#3fb950]" />
        </div>

        <h1 className="text-2xl font-bold text-[#c9d1d9]">Check your email</h1>

        <p className="mt-3 text-sm text-[#8b949e] leading-relaxed">
          We sent a verification link to
          <br />
          <span className="text-[#58a6ff]">{email}</span>
          <br />
          Click the link to activate your Axon account.
        </p>

        <button
          onClick={() => navigate("/auth")}
          className="
            mt-8
            w-full
            bg-[#2f81f7]
            hover:bg-[#1f6feb]
            rounded-xl
            py-2.5
            text-white
            text-sm
            transition
          "
        >
          Back to sign in
        </button>

        <p className="mt-5 text-xs text-[#6e7681]">
          Didn't receive it? Check your spam folder.
        </p>
      </div>
    </div>
  );
}

export default CheckEmail;