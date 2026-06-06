import { CheckCircle, XCircle } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import AxonLogo from "../components/shared/AxonLogo";

function EmailCallback() {
  const [params] = useSearchParams();

  const navigate = useNavigate();

  const status = params.get("status");

  const success = status === "success";

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4">
      <div
        className="
          max-w-md
          w-full
          bg-[#161b22]
          border
          border-[#30363d]
          rounded-2xl
          p-8
          text-center
          shadow-2xl
          shadow-black/40
        "
      >
        <div className="flex justify-center mb-6">
          <AxonLogo />
        </div>

        <div
          className={`
            mx-auto
            w-16
            h-16
            rounded-full
            flex
            items-center
            justify-center
            mb-6

            ${success ? "bg-[#238636]/10" : "bg-red-500/10"}
          `}
        >
          {success ? (
            <CheckCircle size={34} className="text-[#3fb950]" />
          ) : (
            <XCircle size={34} className="text-red-400" />
          )}
        </div>

        <h1 className="text-2xl font-bold text-[#c9d1d9]">
          {success ? "Email verified" : "Verification failed"}
        </h1>

        <p className="mt-3 text-sm text-[#8b949e]">
          {success
            ? "Your account is active now. Continue to your dashboard."
            : "Your verification link is invalid or expired."}
        </p>

        <button
          onClick={() => navigate(success ? "/dashboard" : "/auth")}
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
          {success ? "Go to Dashboard" : "Back to Register"}
        </button>
      </div>
    </div>
  );
}

export default EmailCallback;