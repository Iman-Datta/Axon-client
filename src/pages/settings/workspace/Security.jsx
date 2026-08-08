import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Loader2,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";

import { fetchWithAuth } from "../../../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;
const UPDATE_PASSWORD_URL = `${API}/auth/profile/password`;

const inputClass =
  "w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 pr-10 text-sm text-[#c9d1d9] placeholder-[#6e7681] outline-none transition-colors focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] disabled:opacity-50";
const labelClass = "block text-sm font-medium text-[#c9d1d9] mb-1.5";

function SectionHeading({ children }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-wider text-[#6e7681]">
      {children}
    </h2>
  );
}

// Password rules checked client-side. The backend should still enforce
// its own rules — this is just to stop obviously-weak submissions and
// give the user immediate feedback instead of a round trip.
const RULES = [
  { key: "length", label: "At least 8 characters", test: (v) => v.length >= 8 },
  { key: "upper", label: "One uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { key: "lower", label: "One lowercase letter", test: (v) => /[a-z]/.test(v) },
  { key: "number", label: "One number", test: (v) => /[0-9]/.test(v) },
  {
    key: "special",
    label: "One special character",
    test: (v) => /[^A-Za-z0-9]/.test(v),
  },
];

function getStrength(value) {
  const passedCount = RULES.filter((rule) => rule.test(value)).length;
  if (!value) return { score: 0, label: "", color: "" };
  if (passedCount <= 2)
    return { score: passedCount, label: "Weak", color: "#f85149" };
  if (passedCount <= 3)
    return { score: passedCount, label: "Fair", color: "#d29922" };
  if (passedCount === 4)
    return { score: passedCount, label: "Good", color: "#58a6ff" };
  return { score: passedCount, label: "Strong", color: "#3fb950" };
}

function PasswordInput({ label, value, onChange, disabled, autoComplete }) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          disabled={disabled}
          autoComplete={autoComplete}
          className={inputClass}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          tabIndex={-1}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#6e7681] transition-colors hover:text-[#c9d1d9]"
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}

function Security() {
  const { details } = useOutletContext();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const hasPassword = Boolean(details?.is_password);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const strength = useMemo(() => getStrength(newPassword), [newPassword]);
  const passedRules = useMemo(
    () => RULES.map((rule) => ({ ...rule, passed: rule.test(newPassword) })),
    [newPassword],
  );

  const meetsAllRules = passedRules.every((rule) => rule.passed);
  const passwordsMatch =
    confirmPassword.length > 0 && newPassword === confirmPassword;
  const isSameAsCurrent =
    hasPassword &&
    currentPassword.length > 0 &&
    currentPassword === newPassword;

  const canSubmit =
    meetsAllRules &&
    passwordsMatch &&
    !isSameAsCurrent &&
    (!hasPassword || currentPassword.length > 0) &&
    !isSaving;

  const resetForm = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!meetsAllRules) {
      setError("Your new password doesn't meet all the requirements below.");
      return;
    }
    if (!passwordsMatch) {
      setError("New password and confirmation don't match.");
      return;
    }
    if (isSameAsCurrent) {
      setError("New password must be different from your current password.");
      return;
    }

    setIsSaving(true);

    try {
      const payload = hasPassword
        ? {
            new_password: newPassword,
          }
        : {
            new_password: newPassword,
          };

      const response = await fetchWithAuth(
        UPDATE_PASSWORD_URL,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
        dispatch,
        accessToken,
      );

      const data = await response.json();

      if (!response.ok || data.success === false) {
        const message = data?.errors
          ? Object.values(data.errors).flat().join(" ")
          : data?.message ||
            "Couldn't update your password. Check your current password and try again.";
        throw new Error(message);
      }

      resetForm();
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div>
        <h1 className="text-base font-semibold text-[#e6edf3]">Security</h1>
        <p className="mt-1 text-sm text-[#8b949e]">
          {hasPassword
            ? "Change the password used to sign in to your account."
            : "You signed up with GitHub and don't have a password yet. Create one to also sign in with your email."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <SectionHeading>
          {hasPassword ? "Change password" : "Create password"}
        </SectionHeading>

        {hasPassword && (
          <PasswordInput
            label="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            disabled={isSaving}
            autoComplete="current-password"
          />
        )}

        <div>
          <PasswordInput
            label="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={isSaving}
            autoComplete="new-password"
          />

          {/* Strength meter */}
          {newPassword && (
            <div className="mt-2">
              <div className="flex gap-1">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-1 flex-1 rounded-full bg-[#21262d]"
                    style={{
                      backgroundColor:
                        i < strength.score ? strength.color : undefined,
                    }}
                  />
                ))}
              </div>
              <p
                className="mt-1.5 text-xs font-medium"
                style={{ color: strength.color }}
              >
                {strength.label}
              </p>
            </div>
          )}

          {/* Requirements checklist */}
          <ul className="mt-3 grid grid-cols-1 gap-1.5 sm:grid-cols-2">
            {passedRules.map((rule) => (
              <li
                key={rule.key}
                className={`flex items-center gap-1.5 text-xs ${
                  rule.passed ? "text-[#3fb950]" : "text-[#6e7681]"
                }`}
              >
                <Check
                  size={13}
                  className={rule.passed ? "opacity-100" : "opacity-30"}
                />
                {rule.label}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <PasswordInput
            label="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isSaving}
            autoComplete="new-password"
          />
          {confirmPassword.length > 0 && !passwordsMatch && (
            <p className="mt-1.5 text-xs text-[#f85149]">
              Passwords don't match.
            </p>
          )}
        </div>

        {error && (
          <div className="flex items-start gap-2 rounded-md border border-[#f85149]/30 bg-[#f85149]/10 px-3 py-2.5 text-sm text-[#f85149]">
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="flex items-center gap-1.5 text-sm text-[#3fb950]">
            <ShieldCheck size={14} />
            {hasPassword
              ? "Password updated successfully."
              : "Password created successfully."}
          </div>
        )}

        <div className="flex justify-end border-t border-[#21262d] pt-6">
          <button
            type="submit"
            disabled={!canSubmit}
            className="flex items-center gap-1.5 rounded-md bg-[#238636] px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#2ea043] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Check size={14} />
            )}
            {isSaving
              ? "Saving…"
              : hasPassword
                ? "Update password"
                : "Create password"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Security;
