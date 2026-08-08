import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MapPin,
  Calendar,
  Mail,
  Globe,
  ArrowUpRight,
  Pencil,
  X,
  Check,
  Loader2,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import { fetchWithAuth } from "../../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;
const UPDATE_PROFILE_URL = `${API}/auth/profile/update`;

const EDITABLE_FIELDS = [
  "bio",
  "location",
  "linkedin_profile",
  "portfolio_website",
];

function EditProfileSidebar({ user, onUpdate }) {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [profile, setProfile] = useState(user || {});
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const startEditing = () => {
    setError(null);
    setForm({
      bio: profile.bio || "",
      location: profile.location || "",
      linkedin_profile: profile.linkedin_profile || "",
      portfolio_website: profile.portfolio_website || "",
    });
    setIsEditing(true);
  };

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleCancel = () => {
    setForm(null);
    setError(null);
    setIsEditing(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      const payload = EDITABLE_FIELDS.reduce((acc, field) => {
        acc[field] = form[field];
        return acc;
      }, {});

      const response = await fetchWithAuth(
        UPDATE_PROFILE_URL,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
        dispatch,
        accessToken,
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        const message = data?.errors
          ? Object.values(data.errors).flat().join(" ")
          : "Couldn't update profile. Try again.";
        throw new Error(message);
      }

      const updatedProfile = { ...profile, ...data.user };
      setProfile(updatedProfile);
      onUpdate?.(updatedProfile);
      setIsEditing(false);
      setForm(null);
    } catch (err) {
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const joinedDate = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  const metaDetails = [
    profile?.location && {
      icon: MapPin,
      label: "Location",
      value: profile.location,
    },
    joinedDate && { icon: Calendar, label: "Joined", value: joinedDate },
  ].filter(Boolean);

  const socialLinks = [
    profile?.is_github_connected &&
      profile?.github_profile && {
        icon: FaGithub,
        label: "GitHub",
        handle: profile.github_username,
        href: profile.github_profile,
      },
    profile?.linkedin_profile && {
      icon: FaLinkedin,
      label: "LinkedIn",
      handle: profile.linkedin_profile.replace(/^https?:\/\/(www\.)?/, ""),
      href: profile.linkedin_profile,
    },
    profile?.portfolio_website && {
      icon: Globe,
      label: "Website",
      handle: profile.portfolio_website.replace(/^https?:\/\/(www\.)?/, ""),
      href: profile.portfolio_website,
    },
    profile?.email && {
      icon: Mail,
      label: "Email",
      handle: profile.email,
      href: `mailto:${profile.email}`,
    },
  ].filter(Boolean);

  const inputClass =
    "w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm text-[#c9d1d9] placeholder-[#6e7681] outline-none transition-colors focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] disabled:opacity-50";
  const labelClass = "block text-[11px] text-[#6e7681] mb-1.5";

  return (
    <aside className="relative pr-5">
      <style>{`
        .bio-textarea::-webkit-scrollbar {
          width: 8px;
        }
        .bio-textarea::-webkit-scrollbar-track {
          background: transparent;
        }
        .bio-textarea::-webkit-scrollbar-thumb {
          background-color: #30363d;
          border-radius: 8px;
          border: 2px solid #0d1117;
        }
        .bio-textarea::-webkit-scrollbar-thumb:hover {
          background-color: #484f58;
        }
        .bio-textarea {
          scrollbar-width: thin;
          scrollbar-color: #30363d transparent;
        }
      `}</style>

      <div className="pointer-events-none absolute right-0 top-1 bottom-1 w-px bg-gradient-to-b from-transparent via-[#30363d] to-transparent" />

      {/* Header row with Edit toggle */}
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8b949e]">
          About
        </h2>

        {!isEditing && (
          <button
            type="button"
            onClick={startEditing}
            className="flex items-center gap-1.5 rounded-md border border-[#30363d] px-2.5 py-1 text-xs text-[#c9d1d9] transition-colors hover:border-[#8b949e] hover:bg-[#161b22]"
          >
            <Pencil size={12} />
            Edit profile
          </button>
        )}
      </div>

      {!isEditing ? (
        <>
          {/* Read-only view */}
          <p className="mt-3 text-[14px] leading-relaxed text-[#c9d1d9]">
            {profile?.bio || "This user hasn't added a bio yet."}
          </p>

          {metaDetails.length > 0 && (
            <div className="mt-6 border-t border-[#21262d] pt-6">
              <dl className="space-y-3.5">
                {metaDetails.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#161b22] ring-1 ring-[#21262d]">
                      <Icon size={14} className="text-[#8b949e]" />
                    </span>
                    <div className="min-w-0 leading-tight">
                      <dt className="text-[11px] text-[#6e7681]">{label}</dt>
                      <dd className="truncate text-sm text-[#c9d1d9]">
                        {value}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {socialLinks.length > 0 && (
            <div className="mt-6 border-t border-[#21262d] pt-6">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#8b949e]">
                Links
              </h2>

              <div className="mt-3 space-y-1">
                {socialLinks.map(({ icon: Icon, label, handle, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group -mx-2 flex items-center gap-3 rounded-md px-2 py-2 transition-colors hover:bg-[#161b22]"
                  >
                    <Icon
                      size={16}
                      className="shrink-0 text-[#8b949e] transition-colors group-hover:text-[#e6edf3]"
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm text-[#c9d1d9] group-hover:text-[#e6edf3]">
                        {label}
                      </span>
                      <span className="block truncate text-xs text-[#6e7681]">
                        {handle}
                      </span>
                    </span>
                    <ArrowUpRight
                      size={13}
                      className="shrink-0 text-[#6e7681] opacity-0 transition-opacity group-hover:opacity-100"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {/* Edit form */}
          <div className="mt-3 space-y-4">
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label className={labelClass.replace("mb-1.5", "mb-0")}>
                  Bio
                </label>
                <span className="text-[11px] text-[#6e7681]">
                  {form.bio.length}/280
                </span>
              </div>
              <textarea
                rows={4}
                maxLength={280}
                value={form.bio}
                onChange={handleChange("bio")}
                placeholder="Tell people about yourself"
                disabled={isSaving}
                className={`bio-textarea ${inputClass} resize-none leading-relaxed`}
              />
            </div>

            <div>
              <label className={labelClass}>Location</label>
              <input
                type="text"
                value={form.location}
                onChange={handleChange("location")}
                placeholder="City, Country"
                disabled={isSaving}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>LinkedIn profile</label>
              <input
                type="url"
                value={form.linkedin_profile}
                onChange={handleChange("linkedin_profile")}
                placeholder="https://linkedin.com/in/username"
                disabled={isSaving}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Website</label>
              <input
                type="url"
                value={form.portfolio_website}
                onChange={handleChange("portfolio_website")}
                placeholder="https://yourdomain.com"
                disabled={isSaving}
                className={inputClass}
              />
            </div>
          </div>

          {error && <p className="mt-4 text-xs text-[#f85149]">{error}</p>}

          {/* Cancel / Save */}
          <div className="mt-6 flex items-center justify-end gap-2 border-t border-[#21262d] pt-6">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              className="flex items-center gap-1.5 rounded-md border border-[#30363d] px-3 py-1.5 text-xs text-[#c9d1d9] transition-colors hover:border-[#8b949e] hover:bg-[#161b22] disabled:opacity-50"
            >
              <X size={13} />
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-1.5 rounded-md bg-[#238636] px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#2ea043] disabled:opacity-70"
            >
              {isSaving ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                <Check size={13} />
              )}
              {isSaving ? "Saving…" : "Save"}
            </button>
          </div>
        </>
      )}
    </aside>
  );
}

export default EditProfileSidebar;
