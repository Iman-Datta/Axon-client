import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

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

  const statusKey = loading ? "loading" : failed ? "failed" : "success";

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center px-4 relative overflow-hidden">
      {/* Ambient background glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ duration: 1.5 }}
        className={`absolute w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none ${
          failed ? "bg-red-500" : "bg-[#2f81f7]"
        }`}
      />

      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full bg-[#161b22]/90 backdrop-blur-xl border border-[#30363d] rounded-2xl p-8 text-center shadow-2xl shadow-black/40 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex justify-center mb-6"
        >
          <AxonLogo />
        </motion.div>

        <div className="relative mx-auto w-16 h-16 mb-6">
          {/* Pulsing ring while loading */}
          {loading && (
            <motion.span
              initial={{ opacity: 0.5, scale: 1 }}
              animate={{ opacity: 0, scale: 1.6 }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className="absolute inset-0 rounded-full bg-[#2f81f7]/30"
            />
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={statusKey}
              initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={`relative w-16 h-16 rounded-full flex items-center justify-center ${
                failed ? "bg-red-500/10" : "bg-[#238636]/10"
              }`}
            >
              {loading ? (
                <Loader2 size={34} className="text-[#2f81f7] animate-spin" />
              ) : failed ? (
                <XCircle size={34} className="text-red-400" />
              ) : (
                <CheckCircle size={34} className="text-[#3fb950]" />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={statusKey + "-text"}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
          >
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
          </motion.div>
        </AnimatePresence>

        {/* Loading progress bar */}
        {loading && (
          <motion.div className="mt-6 h-1 w-full bg-[#30363d] rounded-full overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 1.1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="h-full w-1/2 bg-[#2f81f7] rounded-full"
            />
          </motion.div>
        )}

        <AnimatePresence>
          {failed && (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/auth")}
              className="mt-8 w-full bg-[#2f81f7] hover:bg-[#1f6feb] rounded-xl py-2.5 text-white text-sm transition-colors"
            >
              Back to Login
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default EmailCallback;