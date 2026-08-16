import { useState } from "react";
import {
  ArrowRight,
  Loader2,
  ChevronDown,
  ChevronUp,
  Code2,
  Briefcase,
  Check,
  User,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";
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
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "professional", label: "Professional" },
  { value: "expert", label: "Expert" },
];

export default function CompleteProfile({ profile }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();

  const { accessToken, user } = useSelector((state) => state.auth);
  const initialData = profile?.data || user || {};

  const [form, setForm] = useState({
    first_name: initialData.first_name || "",
    last_name: initialData.last_name || "",
    bio: initialData.bio || "",
    linkedin_profile: initialData.linkedin_profile || "",
    portfolio_website: initialData.portfolio_website || "",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(initialData.avatar || "");
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

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleCompleteProfile = async () => {
    try {
      setSaving(true);
      setError("");

      // 1. Call main profile setup API
      const res = await fetchWithAuth(
        `${API}/auth/profile/complete/`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
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
      if (!res.ok) throw new Error(data.message || "Profile update failed");

      let updatedAvatar = initialData.avatar;

      // 2. Conditionally call separate avatar update endpoint ONLY if an image file was provided
      if (avatarFile) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);

        const avatarRes = await fetchWithAuth(
          `${API}/auth/${slug}/avtar/update/`,
          {
            method: "PATCH",
            body: formData,
          },
          dispatch,
          accessToken,
        );

        const avatarData = await avatarRes.json();
        if (avatarRes.ok && avatarData.avatar) {
          updatedAvatar = avatarData.avatar;
        } else {
          throw new Error(
            avatarData.message || "Failed to update avatar image",
          );
        }
      }

      // 3. Sync Redux state with final user payload
      dispatch(
        setUser({
          ...user,
          first_name: form.first_name.trim(),
          last_name: form.last_name.trim(),
          bio: form.bio.trim(),
          linkedin_profile: form.linkedin_profile.trim(),
          portfolio_website: form.portfolio_website.trim(),
          avatar: updatedAvatar,
          is_profile_completed: true,
        }),
      );

      navigate(`/${user.username}`, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-4">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between border-b border-[#30363d] pb-3">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-[#e6edf3]">
            Complete Your Profile
          </h2>
          <p className="text-xs text-[#8b949e]">
            Configure your developer workspace visibility.
          </p>
        </div>
        <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-400 border border-blue-500/20">
          Step 2 of 2
        </span>
      </div>

      <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-5 shadow-xl shadow-black/40 space-y-4">
        {/* First & Last Name Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-[#8b949e]">
              First name <span className="text-red-400">*</span>
            </label>
            <input
              value={form.first_name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, first_name: e.target.value }))
              }
              placeholder="Iman"
              className="w-full rounded-lg border border-[#30363d] bg-[#0d1117] px-3 py-2 text-xs text-[#c9d1d9] outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-[#8b949e]">
              Last name <span className="text-red-400">*</span>
            </label>
            <input
              value={form.last_name}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, last_name: e.target.value }))
              }
              placeholder="Datta"
              className="w-full rounded-lg border border-[#30363d] bg-[#0d1117] px-3 py-2 text-xs text-[#c9d1d9] outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <div className="mb-1 flex items-center justify-between">
            <label className="text-xs font-medium text-[#8b949e]">
              Bio / Tagline
            </label>
            <span
              className={`text-[10px] ${form.bio.length >= 60 ? "text-amber-400 font-semibold" : "text-[#484f58]"}`}
            >
              {form.bio.length}/60
            </span>
          </div>
          <textarea
            rows={2}
            maxLength={60}
            value={form.bio}
            onChange={(e) =>
              setForm((prev) => ({ ...prev, bio: e.target.value }))
            }
            placeholder="Backend developer focused on scalable systems."
            className="w-full resize-none rounded-lg border border-[#30363d] bg-[#0d1117] px-3 py-2 text-xs text-[#c9d1d9] outline-none transition-all focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20"
          />
        </div>

        {/* Optional Avatar File Upload Input Field */}
        <div>
          <label className="mb-1 block text-xs font-medium text-[#8b949e]">
            Profile Picture{" "}
            <span className="text-[#484f58] font-normal">(Optional)</span>
          </label>
          <div className="flex items-center gap-3 rounded-lg border border-dashed border-[#30363d] bg-[#0d1117] p-3 hover:border-blue-500/50 transition-all">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[#30363d] bg-[#161b22] flex items-center justify-center text-[#8b949e]">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <User size={18} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-[#c9d1d9] truncate">
                {avatarFile ? avatarFile.name : "Choose an image file"}
              </p>
              <p className="text-[10px] text-[#484f58]">
                PNG, JPG, WEBP up to 5MB
              </p>
            </div>
            <label className="cursor-pointer rounded-lg bg-[#21262d] border border-[#30363d] px-3 py-1.5 text-xs font-medium text-[#c9d1d9] hover:bg-[#30363d] transition-all">
              Browse
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Developer Type Chips */}
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <Code2 size={14} className="text-[#8b949e]" />
            <h3 className="text-xs font-medium text-[#c9d1d9]">
              Developer type{" "}
              <span className="text-[#484f58] font-normal">(Max 3)</span>
            </h3>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {DEVELOPER_TYPES.map((type) => {
              const selected = developerTypes.includes(type);
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleDeveloperType(type)}
                  className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-all flex items-center gap-1 ${
                    selected
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                      : "border-[#30363d] bg-[#0d1117] text-[#8b949e] hover:border-[#388bfd]"
                  }`}
                >
                  {selected && <Check size={12} />}
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* Experience level */}
        <div>
          <div className="flex items-center gap-1.5 mb-1.5">
            <Briefcase size={14} className="text-[#8b949e]" />
            <h3 className="text-xs font-medium text-[#c9d1d9]">
              Experience level
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {LEVELS.map((item) => {
              const selected = level === item.value;
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setLevel(item.value)}
                  className={`rounded-lg border px-3 py-2 text-left text-xs font-medium transition-all ${
                    selected
                      ? "border-blue-500 bg-blue-500/10 text-blue-400 shadow-sm"
                      : "border-[#30363d] bg-[#0d1117] text-[#8b949e] hover:border-[#388bfd]/50"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Compact Accordion for Social Links */}
        <div className="rounded-lg border border-[#30363d] bg-[#0d1117]">
          <button
            type="button"
            onClick={() => setShowSocials((prev) => !prev)}
            className="flex w-full items-center justify-between px-3 py-2.5 text-left"
          >
            <div>
              <span className="text-xs font-medium text-[#c9d1d9]">
                Social links & Portfolio
              </span>
              <span className="ml-2 text-[10px] text-[#484f58]">Optional</span>
            </div>
            {showSocials ? (
              <ChevronUp size={14} className="text-[#8b949e]" />
            ) : (
              <ChevronDown size={14} className="text-[#8b949e]" />
            )}
          </button>

          {showSocials && (
            <div className="space-y-2.5 border-t border-[#30363d] p-3">
              <input
                value={form.linkedin_profile}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    linkedin_profile: e.target.value,
                  }))
                }
                placeholder="LinkedIn profile URL"
                className="w-full rounded-lg border border-[#30363d] bg-[#161b22] px-3 py-2 text-xs text-[#c9d1d9] outline-none focus:border-blue-500"
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
                className="w-full rounded-lg border border-[#30363d] bg-[#161b22] px-3 py-2 text-xs text-[#c9d1d9] outline-none focus:border-blue-500"
              />
            </div>
          )}
        </div>
      </div>

      {error && (
        <p className="mt-2 text-xs text-red-400 text-center">{error}</p>
      )}

      {/* Action Footer */}
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleCompleteProfile}
          disabled={saving || !form.first_name.trim() || !form.last_name.trim()}
          className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-lg shadow-emerald-900/20"
        >
          {saving ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <>
              Complete Setup <ArrowRight size={14} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
