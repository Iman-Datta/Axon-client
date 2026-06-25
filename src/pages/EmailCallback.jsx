import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import AxonLogo from "../components/shared/AxonLogo";

import { setUser } from "../redux/slices/authSlice";
import { fetchWithAuth } from "../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;

function EmailCallback() {
  const [params] = useSearchParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let mounted = true;

    const restoreUser = async () => {
      try {
        const response = await fetchWithAuth(`${API}/auth/me/`, {}, dispatch);

        const data = await response.json();

        if (!response.ok) {
          throw new Error("Authentication failed");
        }

        dispatch(setUser(data.user));

        setTimeout(() => {
          if (!mounted) return;

          if (!data.user.is_profile_completed) {
            navigate("/onboarding", { replace: true });
          } else {
            navigate(`/${data.user.username}`, { replace: true });
          }
        }, 1000);
      } catch (error) {
        console.log(error);

        if (mounted) {
          setFailed(true);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    const handleCallback = async () => {
      const status = params.get("status");

      if (status === "failed") {
        setFailed(true);

        setLoading(false);

        return;
      }

      await restoreUser();
    };

    handleCallback();

    return () => {
      mounted = false;
    };
  }, [dispatch, navigate, params]);

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#161b22] border border-[#30363d] rounded-2xl p-8 text-center shadow-2xl shadow-black/40">
        <div className="flex justify-center mb-6">
          <AxonLogo />
        </div>

        <div
          className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6 ${failed ? "bg-red-500/10" : "bg-[#238636]/10"}`}
        >
          {loading ? (
            <Loader2 size={34} className="text-[#2f81f7] animate-spin" />
          ) : failed ? (
            <XCircle size={34} className="text-red-400" />
          ) : (
            <CheckCircle size={34} className="text-[#3fb950]" />
          )}
        </div>

        <h1 className="text-2xl font-bold text-[#c9d1d9]">
          {loading
            ? "Signing you in..."
            : failed
              ? "Authentication failed"
              : "Welcome to Axon"}
        </h1>

        <p className="mt-3 text-sm text-[#8b949e]">
          {loading
            ? "Preparing your developer workspace."
            : failed
              ? "Something went wrong. Please login again."
              : "Redirecting you..."}
        </p>

        {failed && (
          <button
            onClick={() => navigate("/auth")}
            className="mt-8 w-full bg-[#2f81f7] hover:bg-[#1f6feb] rounded-xl py-2.5 text-white text-sm transition"
          >
            Back to Login
          </button>
        )}
      </div>
    </div>
  );
}

export default EmailCallback;
