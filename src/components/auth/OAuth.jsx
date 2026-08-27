import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import {
  checkServerReachable,
  redirectToServerDown,
} from "../../utils/serverStatus";

const API = import.meta.env.VITE_API_URL;

function OAuth() {
  const [checking, setChecking] = useState(null); // null | "google" | "github"

  const handleProviderLogin = async (provider) => {
    setChecking(provider);
    const reachable = await checkServerReachable(API);
    if (!reachable) {
      redirectToServerDown();
      return;
    }
    window.location.href = `${API}/auth/${provider}/`;
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <button
        type="button"
        onClick={() => handleProviderLogin("github")}
        disabled={checking !== null}
        className="
          flex items-center justify-center gap-2
          border border-[#30363d]
          bg-[#0d1117]
          hover:bg-[#21262d]
          disabled:opacity-60 disabled:cursor-not-allowed
          transition-all duration-200
          rounded-xl py-2.5
          text-[#c9d1d9]
          text-xs font-medium
        "
      >
        <FaGithub />
        {checking === "github" ? "Checking..." : "GitHub"}
      </button>

      <button
        type="button"
        onClick={() => handleProviderLogin("google")}
        disabled={checking !== null}
        className="
          flex items-center justify-center gap-2
          border border-[#30363d]
          bg-[#0d1117]
          hover:bg-[#21262d]
          disabled:opacity-60 disabled:cursor-not-allowed
          transition-all duration-200
          rounded-xl py-2.5
          text-[#c9d1d9]
          text-xs font-medium
        "
      >
        <FcGoogle size={16} />
        {checking === "google" ? "Checking..." : "Google"}
      </button>
    </div>
  );
}

export default OAuth;
