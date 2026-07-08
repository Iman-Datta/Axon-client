import { useState } from "react";
import {
  ArrowRight,
  Loader2,
  ChevronDown,
  ChevronUp,
  Upload,
  Code2,
  Briefcase,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchWithAuth } from "../../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;

const DEVELOPER_TYPES = [
  "Backend",
  "Frontend",
  "AI/ML",
  "DevOps",
  "Mobile",
  "Student",
];

const LEVELS = [
  {
    value: "beginner",
    label: "Beginner",
  },
  {
    value: "intermediate",
    label: "Intermediate",
  },
  {
    value: "professional",
    label: "Professional",
  },
  {
    value: "expert",
    label: "Expert",
  },
];

export default function CompleteProfile({ profile, refresh }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { accessToken, user } = useSelector((state) => state.auth);

  const initialData = profile?.data || user || {};

  const [form, setForm] = useState({
    first_name: initialData.first_name || "",
    last_name: initialData.last_name || "",
    bio: initialData.bio || "",
    linkedin_profile: initialData.linkedin_profile || "",
    portfolio_website: initialData.portfolio_website || "",
  });

  // UI only
  const [developerTypes, setDeveloperTypes] = useState([]);
  const [level, setLevel] = useState("");
  const [showSocials, setShowSocials] = useState(false);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const toggleDeveloperType = (type) => {
    if (developerTypes.includes(type)) {
      setDeveloperTypes((prev) => prev.filter((item) => item !== type));
      return;
    }

    if (developerTypes.length >= 3) return;

    setDeveloperTypes((prev) => [...prev, type]);
  };

  const handleCompleteProfile = async () => {
    try {
      setSaving(true);
      setError("");

      const res = await fetchWithAuth(
        `${API}/auth/profile/complete/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: form.first_name.trim(),
            last_name: form.last_name.trim(),
            bio: form.bio.trim(),
            linkedin_profile: form.linkedin_profile.trim(),
            portfolio_website: form.portfolio_website.trim(),
          }),
        },
        dispatch,
        accessToken,
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Profile update failed");
      }

      await refresh();

      if (user?.username) {
        navigate(`/${user.username}`, {
          replace: true,
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-base font-semibold text-[#c9d1d9]">
          Set up your profile
        </h2>

        <p className="mt-1 text-sm text-[#8b949e]">
          Complete your developer profile.
        </p>
      </div>

      <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-6">
        <div className="space-y-8">
          {/* Names */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#c9d1d9]">
                First name
                <span className="ml-1 text-red-400">*</span>
              </label>

              <input
                value={form.first_name}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    first_name: e.target.value,
                  }))
                }
                placeholder="First name"
                className="
                  w-full rounded-xl
                  border border-[#30363d]
                  bg-[#0d1117]
                  px-4 py-3
                  text-sm text-[#c9d1d9]
                  outline-none
                  focus:border-[#388bfd]
                "
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#c9d1d9]">
                Last name
                <span className="ml-1 text-red-400">*</span>
              </label>

              <input
                value={form.last_name}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    last_name: e.target.value,
                  }))
                }
                placeholder="Last name"
                className="
                  w-full rounded-xl
                  border border-[#30363d]
                  bg-[#0d1117]
                  px-4 py-3
                  text-sm text-[#c9d1d9]
                  outline-none
                  focus:border-[#388bfd]
                "
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-[#c9d1d9]">
                About you
              </label>

              <span className="text-xs text-[#8b949e]">
                {form.bio.length}/60
              </span>
            </div>

            <textarea
              rows={3}
              maxLength={60}
              value={form.bio}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  bio: e.target.value,
                }))
              }
              placeholder="Backend developer focused on scalable systems."
              className="
                w-full resize-none
                rounded-xl
                border border-[#30363d]
                bg-[#0d1117]
                px-4 py-3
                text-sm text-[#c9d1d9]
                outline-none
                focus:border-[#388bfd]
              "
            />
          </div>

          {/* Developer Type */}
          <div>
            <div className="flex items-center gap-2">
              <Code2 size={16} className="text-[#8b949e]" />

              <h3 className="text-sm font-medium text-[#c9d1d9]">
                Developer type
              </h3>
            </div>

            <p className="mt-1 text-xs text-[#8b949e]">Select up to 3.</p>

            <div className="mt-4 flex flex-wrap gap-3">
              {DEVELOPER_TYPES.map((type) => {
                const selected = developerTypes.includes(type);

                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleDeveloperType(type)}
                    className={`
                        rounded-full
                        border
                        px-4 py-2
                        text-sm
                        font-medium
                        transition-all
                        ${
                          selected
                            ? "border-[#238636] bg-[#238636] text-white"
                            : "border-[#30363d] bg-[#0d1117] text-[#8b949e] hover:border-[#388bfd]"
                        }
                      `}
                  >
                    {type}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Experience */}
          <div>
            <div className="flex items-center gap-2">
              <Briefcase size={16} className="text-[#8b949e]" />

              <h3 className="text-sm font-medium text-[#c9d1d9]">
                Experience level
              </h3>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {LEVELS.map((item) => {
                const selected = level === item.value;

                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setLevel(item.value)}
                    className={`
                      rounded-xl
                      border
                      p-4
                      text-left
                      transition-all
                      ${
                        selected
                          ? "border-[#388bfd] bg-[#388bfd]/10 text-[#58a6ff]"
                          : "border-[#30363d] bg-[#0d1117] text-[#8b949e]"
                      }
                    `}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Social Links */}
          <div className="rounded-xl border border-[#30363d] bg-[#0d1117]">
            <button
              type="button"
              onClick={() => setShowSocials((prev) => !prev)}
              className="flex w-full items-center justify-between px-4 py-4"
            >
              <div>
                <h3 className="text-left text-sm font-medium text-[#c9d1d9]">
                  Social links
                </h3>

                <p className="text-left text-xs text-[#8b949e]">Optional</p>
              </div>

              {showSocials ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>

            {showSocials && (
              <div className="space-y-3 border-t border-[#30363d] p-4">
                <input
                  value={form.linkedin_profile}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      linkedin_profile: e.target.value,
                    }))
                  }
                  placeholder="LinkedIn profile URL"
                  className="
                    w-full rounded-xl
                    border border-[#30363d]
                    bg-[#161b22]
                    px-4 py-3
                    text-sm text-[#c9d1d9]
                    outline-none
                    focus:border-[#388bfd]
                  "
                />

                <input
                  value={form.portfolio_website}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      portfolio_website: e.target.value,
                    }))
                  }
                  placeholder="Portfolio website URL"
                  className="
                    w-full rounded-xl
                    border border-[#30363d]
                    bg-[#161b22]
                    px-4 py-3
                    text-sm text-[#c9d1d9]
                    outline-none
                    focus:border-[#388bfd]
                  "
                />
              </div>
            )}
          </div>

          {/* Avatar */}
          <div>
            <h3 className="mb-3 text-sm font-medium text-[#c9d1d9]">
              Profile picture
            </h3>

            <button
              type="button"
              className="
                flex items-center gap-2
                rounded-xl
                border border-dashed border-[#30363d]
                bg-[#0d1117]
                px-4 py-3
                text-sm text-[#8b949e]
                hover:border-[#388bfd]
              "
            >
              <Upload size={16} />
              Upload avatar
            </button>
          </div>
        </div>
      </div>

      {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

      <div className="mt-6">
        <button
          onClick={handleCompleteProfile}
          disabled={saving || !form.first_name.trim() || !form.last_name.trim()}
          className="
            flex w-full items-center
            justify-center gap-2
            rounded-lg bg-[#238636]
            py-3 text-sm font-semibold
            text-white
            hover:bg-[#2ea043]
            disabled:cursor-not-allowed
            disabled:opacity-50
            transition-colors
          "
        >
          {saving ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              Finish setup
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
