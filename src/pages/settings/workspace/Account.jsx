import { useEffect, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Loader2,
  Check,
  X,
  AlertCircle,
  Lock,
  Mail,
  BadgeCheck,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

import { fetchWithAuth } from "../../../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;
const CHECK_USERNAME_URL = `${API}/auth/profile/check-username/`;
const UPDATE_USERNAME_URL = `${API}/auth/profile/username/`;

const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,30}$/;
const DEBOUNCE_MS = 450;

const inputClass =
  "w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 pr-9 text-sm text-[#c9d1d9] placeholder-[#6e7681] outline-none transition-colors focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] disabled:opacity-50";
const labelClass = "block text-sm font-medium text-[#c9d1d9] mb-1.5";
const hintClass = "mt-1.5 text-xs";

function SectionHeading({ children }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-wider text-[#6e7681]">
      {children}
    </h2>
  );
}

// "Coming soon" style card for account fields that can't be edited yet.
function LockedField({ icon: Icon, label, children, note }) {
  return (
    <div className="rounded-md border border-[#21262d] bg-[#161b22]/40 p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 text-xs text-[#6e7681]">
            <Icon size={13} />
            {label}
          </div>
          <div className="mt-1.5">{children}</div>
        </div>
        <span className="flex shrink-0 items-center gap-1 rounded-full bg-[#21262d] px-2 py-1 text-[11px] font-medium text-[#8b949e]">
          <Lock size={11} />
          Locked
        </span>
      </div>
      {note && <p className="mt-3 text-xs text-[#6e7681]">{note}</p>}
    </div>
  );
}

function Account() {
  const { details, onUpdate } = useOutletContext();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const savedUsername = details?.username || "";

  const [username, setUsername] = useState(savedUsername);
  // status: "idle" | "checking" | "available" | "taken" | "invalid" | "same" | "error"
  const [status, setStatus] = useState("idle");
  const [checkMessage, setCheckMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const debounceRef = useRef(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    setSaveSuccess(false);
    setSaveError(null);

    const trimmed = username.trim();

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (trimmed === savedUsername) {
      setStatus("same");
      setCheckMessage("");
      return;
    }

    if (!trimmed) {
      setStatus("idle");
      setCheckMessage("");
      return;
    }

    if (!USERNAME_REGEX.test(trimmed)) {
      setStatus("invalid");
      setCheckMessage(
        "3–30 characters, letters, numbers, and underscores only.",
      );
      return;
    }

    setStatus("checking");
    setCheckMessage("");

    const currentRequestId = ++requestIdRef.current;

    debounceRef.current = setTimeout(async () => {
      try {
        const response = await fetchWithAuth(
          `${CHECK_USERNAME_URL}?username=${encodeURIComponent(trimmed)}`,
          {},
          dispatch,
          accessToken,
        );

        const data = await response.json();

        // Ignore stale responses from an earlier keystroke.
        if (currentRequestId !== requestIdRef.current) return;

        if (!response.ok) {
          throw new Error(data?.message || "Couldn't check that username.");
        }

        const available = data.available ?? data.is_available;

        if (available) {
          setStatus("available");
          setCheckMessage("Username is available.");
        } else {
          setStatus("taken");
          setCheckMessage(data?.message || "That username is already taken.");
        }
      } catch (err) {
        if (currentRequestId !== requestIdRef.current) return;
        setStatus("error");
        setCheckMessage(err.message || "Couldn't check that username.");
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(debounceRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, savedUsername]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (status !== "available") return;

    setIsSaving(true);
    setSaveError(null);

    try {
      const response = await fetchWithAuth(
        UPDATE_USERNAME_URL,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: username.trim() }),
        },
        dispatch,
        accessToken,
      );

      const data = await response.json();

      if (!response.ok || data.success === false) {
        const message = data?.errors
          ? Object.values(data.errors).flat().join(" ")
          : data?.message || "Couldn't update username. Try again.";
        throw new Error(message);
      }

      const updatedUsername = data?.user?.username || username.trim();
      onUpdate?.({ ...details, username: updatedUsername });
      setUsername(updatedUsername);
      setStatus("same");
      setSaveSuccess(true);
    } catch (err) {
      setSaveError(err.message || "Something went wrong. Try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const statusIcon = {
    checking: <Loader2 size={15} className="animate-spin text-[#8b949e]" />,
    available: <Check size={15} className="text-[#3fb950]" />,
    taken: <X size={15} className="text-[#f85149]" />,
    invalid: <AlertCircle size={15} className="text-[#f85149]" />,
    error: <AlertCircle size={15} className="text-[#f85149]" />,
  }[status];

  const messageColor =
    status === "available"
      ? "text-[#3fb950]"
      : status === "taken" || status === "invalid" || status === "error"
        ? "text-[#f85149]"
        : "text-[#6e7681]";

  return (
    <div className="max-w-2xl">
      <div>
        <h1 className="text-base font-semibold text-[#e6edf3]">Account</h1>
        <p className="mt-1 text-sm text-[#8b949e]">
          Manage your username and connected services.
        </p>
      </div>

      <form onSubmit={handleSave} className="mt-8 space-y-5">
        <SectionHeading>Username</SectionHeading>

        <div>
          <label className={labelClass}>Username</label>
          <div className="relative">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isSaving}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              className={inputClass}
            />
            {statusIcon && (
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                {statusIcon}
              </span>
            )}
          </div>
          {checkMessage && (
            <p className={`${hintClass} ${messageColor}`}>{checkMessage}</p>
          )}
          {!checkMessage && (
            <p className={`${hintClass} text-[#6e7681]`}>
              This is your unique handle across Axon, used in your profile URL
              and @mentions.
            </p>
          )}
        </div>

        {saveError && (
          <div className="flex items-start gap-2 rounded-md border border-[#f85149]/30 bg-[#f85149]/10 px-3 py-2.5 text-sm text-[#f85149]">
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            <span>{saveError}</span>
          </div>
        )}

        {saveSuccess && (
          <div className="flex items-center gap-1.5 text-sm text-[#3fb950]">
            <Check size={14} />
            Username updated.
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={status !== "available" || isSaving}
            className="flex items-center gap-1.5 rounded-md bg-[#238636] px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#2ea043] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Check size={14} />
            )}
            {isSaving ? "Saving…" : "Save username"}
          </button>
        </div>
      </form>

      {/* read-only for now */}
      <div className="mt-10 space-y-5 border-t border-[#21262d] pt-8">
        <SectionHeading>Connected services</SectionHeading>

        <LockedField
          icon={FaGithub}
          label="GitHub"
          note="Changing your connected GitHub account isn't available yet, support for this is planned in a future update."
        >
          {details?.is_github_connected ? (
            <a
              href={details.github_profile}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[#c9d1d9] transition-colors hover:text-[#e6edf3]"
            >
              @{details.github_username}
            </a>
          ) : (
            <span className="text-sm text-[#6e7681]">Not connected</span>
          )}
        </LockedField>

        <LockedField
          icon={Mail}
          label="Email"
          note="Changing your email address isn't available yet, support for this is planned in a future update."
        >
          <div className="flex items-center gap-2">
            <span className="truncate text-sm font-medium text-[#c9d1d9]">
              {details?.email || "—"}
            </span>
            {details?.is_email_verified && (
              <span className="flex shrink-0 items-center gap-1 rounded-full bg-[#3fb950]/10 px-2 py-0.5 text-[11px] font-medium text-[#3fb950]">
                <BadgeCheck size={11} />
                Verified
              </span>
            )}
          </div>
        </LockedField>
      </div>
    </div>
  );
}

export default Account;
