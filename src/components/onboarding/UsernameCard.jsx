import { useEffect, useState } from "react";
import { Check, Loader2 } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;
export default function UsernameCard({
  status = "pending",
  usernameValue = "",
  refresh,
}) {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const isDone = status === "done";
  const isActive = status === "active";

  const [username, setUsername] = useState(usernameValue || "");
  const [available, setAvailable] = useState(null);
  const [checking, setChecking] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleUsernameChange = (e) => {
    const value = e.target.value;

    setUsername(value);
    setError("");
    setAvailable(null);
  };

  useEffect(() => {
    setUsername(usernameValue || "");
  }, [usernameValue]);

  useEffect(() => {
    if (username.trim().length < 3) {
      setAvailable(null);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setChecking(true);

        const res = await fetchWithAuth(
          `${API}/auth/profile/check-username/?username=${encodeURIComponent(
            username.trim(),
          )}`,
          {},
          dispatch,
          accessToken,
        );

        const data = await res.json();

        if (!res.ok) {
          setAvailable(false);
          setError(
            data.message || "Only letters, numbers and underscore allowed",
          );
          return;
        }

        setAvailable(data.available);

        if (!data.available) {
          setError("Username already taken");
        } else {
          setError("");
        }
      } catch (err) {
        console.log(err);
      } finally {
        setChecking(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [username, dispatch, accessToken]);

  const saveUsername = async () => {
    if (!available) return;
    try {
      setSaving(true);
      setError("");

      const res = await fetchWithAuth(
        `${API}/auth/profile/username/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username.trim(),
          }),
        },
        dispatch,
        accessToken,
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Username update failed");
      }

      refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className={`
        rounded-xl border bg-[#161b22] p-5 transition-all duration-200
        ${isDone ? "border-green-500/40" : isActive ? "border-[#388bfd]/50" : "border-[#30363d]"}
      `}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-4">
        {/* Icon + Info */}
        <div className="flex items-start gap-4">
          <div
            className={`
              mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border
              ${isDone ? "border-green-500/30 bg-green-500/10 text-green-400" : "border-[#30363d] bg-[#0d1117] text-[#8b949e]"}
            `}
          >
            {isDone ? (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-[#c9d1d9]">Username</h3>
              <span className="rounded-full border border-[#388bfd]/30 bg-[#388bfd]/10 px-2 py-0.5 text-[10px] font-medium text-[#388bfd]">
                Required
              </span>
            </div>
            <p className="mt-0.5 text-xs text-[#8b949e]">
              Your unique handle on Axon, used for mentions and your public
              profile.
            </p>
          </div>
        </div>

        {/* Done badge */}
        {isDone && (
          <span className="shrink-0 rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-400">
            Set ✓
          </span>
        )}
      </div>

      {/* Input area shown when not done */}
      {!isDone && (
        <div className="mt-4">
          <div className="flex items-center rounded-lg border border-[#30363d] bg-[#0d1117] ring-0 focus-within:border-[#388bfd] focus-within:ring-1 focus-within:ring-[#388bfd]/30 transition-all">
            <span className="select-none border-r border-[#30363d] px-3 py-2.5 text-sm text-[#8b949e]">
              @
            </span>
            <input
              type="text"
              value={username}
              placeholder="your-username"
              onChange={handleUsernameChange}
              className="w-full bg-transparent px-3 py-2.5 text-sm text-[#c9d1d9] placeholder-[#484f58] outline-none"
            />
            <button
              onClick={saveUsername}
              disabled={!available || saving}
              className="px-3 text-xs text-[#388bfd] disabled:text-[#484f58]"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : "Save"}
            </button>
          </div>
          <p className="mt-1.5 text-[11px] text-[#484f58]">
            Only letters, numbers, and hyphens. Min 3 characters.
          </p>
          {checking && (
            <p className="mt-1 text-xs text-[#8b949e]">Checking...</p>
          )}

          {available === true && (
            <p className="mt-1 flex items-center gap-1 text-xs text-green-400">
              <Check size={12} />
              Username available
            </p>
          )}

          {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
        </div>
      )}

      {/* Done state show chosen username TODO*/}
      {isDone && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-[#30363d] bg-[#0d1117] px-3 py-2.5">
          <span className="text-sm text-[#8b949e]">@</span>
          <span className="text-sm text-[#c9d1d9]">{usernameValue}</span>
        </div>
      )}
    </div>
  );
}
