import { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loader2, Check, AlertCircle, User } from "lucide-react";

import { fetchWithAuth } from "../../../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;

const inputClass =
  "w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm text-[#c9d1d9] placeholder-[#6e7681] outline-none transition-colors focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff] disabled:opacity-50";
const labelClass = "block text-sm font-medium text-[#c9d1d9] mb-1.5";
const hintClass = "mt-1.5 text-xs text-[#6e7681]";

function Field({ label, hint, children }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
      {hint && <p className={hintClass}>{hint}</p>}
    </div>
  );
}

function SectionHeading({ children }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-wider text-[#6e7681]">
      {children}
    </h2>
  );
}

function useConfig(type, details, slug) {
  const isOrg = type === "organization";

  if (isOrg) {
    return {
      title: "General",
      subtitle: "Basic information about this organization.",
      url: `${API}/org/${slug}/update`,
      editableFields: ["name", "description"],
      buildForm: (source) => ({
        name: source?.name || "",
        description: source?.description || "",
      }),
      responseKey: "organization",
      successMessage: "Organization updated.",
      readOnlyInfo: [
        { label: "Slug", value: details?.slug },
        { label: "Members", value: details?.members_count },
      ],
    };
  }

  return {
    title: "Profile",
    subtitle: "This is how you'll appear across Axon.",
    url: `${API}/auth/profile/update`,
    editableFields: [
      "first_name",
      "last_name",
      "bio",
      "location",
      "linkedin_profile",
      "portfolio_website",
    ],
    buildForm: (source) => ({
      first_name: source?.first_name || "",
      last_name: source?.last_name || "",
      bio: source?.bio || "",
      location: source?.location || "",
      linkedin_profile: source?.linkedin_profile || "",
      portfolio_website: source?.portfolio_website || "",
    }),
    responseKey: "user",
    successMessage: "Profile updated.",
    readOnlyInfo: [
      { label: "Username", value: details?.username && `@${details.username}` },
      { label: "Email", value: details?.email },
    ],
  };
}

function GeneralSettings() {
  const { details, type, onUpdate } = useOutletContext();
  const { slug } = useParams();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const config = useConfig(type, details, slug);
  const isOrg = type === "organization";

  const [savedForm, setSavedForm] = useState(config.buildForm(details));
  const [form, setForm] = useState(config.buildForm(details));

  // Avatar states
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(details?.avatar || "");

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const isFormDirty = JSON.stringify(form) !== JSON.stringify(savedForm);
  const isAvatarDirty = avatarFile !== null;
  const isDirty = isFormDirty || isAvatarDirty;

  const handleChange = (field) => (e) => {
    setSuccess(false);
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
      setSuccess(false);
    }
  };

  const handleReset = () => {
    setForm(savedForm);
    setAvatarFile(null);
    setAvatarPreview(details?.avatar || "");
    setError(null);
    setSuccess(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
      let updatedData = { ...details };

      // 1. Call General text update API only if text fields changed
      if (isFormDirty) {
        const payload = config.editableFields.reduce((acc, field) => {
          acc[field] = form[field];
          return acc;
        }, {});

        const response = await fetchWithAuth(
          config.url,
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
            : `Couldn't update ${isOrg ? "organization" : "profile"}. Try again.`;
          throw new Error(message);
        }

        updatedData = { ...updatedData, ...data[config.responseKey] };
      }

      // 2. Conditionally call separate avatar update endpoint ONLY if a new file was chosen
      if (avatarFile) {
        const formData = new FormData();
        formData.append("avatar", avatarFile);

        // Uses slug for org or fallback parameter context safely
        const targetSlug = slug || details?.username;
        const avatarUrl = `${API}/auth/${targetSlug}/avtar/update/`;

        const avatarResponse = await fetchWithAuth(
          avatarUrl,
          {
            method: "PATCH",
            body: formData,
          },
          dispatch,
          accessToken,
        );

        const avatarData = await avatarResponse.json();

        if (!avatarResponse.ok || !avatarData.success) {
          throw new Error(
            avatarData.message || "Failed to update avatar image.",
          );
        }

        updatedData = { ...updatedData, avatar: avatarData.avatar };
      }

      setSavedForm(config.buildForm(updatedData));
      setForm(config.buildForm(updatedData));
      setAvatarFile(null);
      setAvatarPreview(updatedData.avatar || "");
      onUpdate?.(updatedData);
      setSuccess(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="max-w-2xl pb-24">
      <div>
        <h1 className="text-base font-semibold text-[#e6edf3]">
          {config.title}
        </h1>
        <p className="mt-1 text-sm text-[#8b949e]">{config.subtitle}</p>
      </div>

      {/* Read-only info block */}
      <div className="mt-6 grid grid-cols-1 gap-4 rounded-md border border-[#21262d] bg-[#161b22]/40 p-4 sm:grid-cols-2">
        {config.readOnlyInfo.map(({ label, value }) => (
          <div key={label}>
            <p className="text-xs text-[#6e7681]">{label}</p>
            <p className="mt-1 truncate text-sm text-[#c9d1d9]">
              {value ?? "—"}
            </p>
          </div>
        ))}
      </div>

      {isOrg ? (
        <div className="mt-8 space-y-5">
          <SectionHeading>Avatar</SectionHeading>
          <div className="flex items-center gap-4 rounded-lg border border-[#30363d] bg-[#0d1117] p-4">
            <div className="h-14 w-14 shrink-0 overflow-hidden rounded-md border border-[#30363d] bg-[#161b22] flex items-center justify-center text-[#8b949e]">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Org Avatar"
                  className="h-full w-full object-cover"
                />
              ) : (
                <User size={24} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-[#c9d1d9] truncate">
                {avatarFile ? avatarFile.name : "Organization logo"}
              </p>
              <p className="text-[11px] text-[#6e7681]">
                PNG, JPG, WEBP up to 5MB
              </p>
            </div>
            <label className="cursor-pointer rounded-md bg-[#21262d] border border-[#30363d] px-3 py-1.5 text-xs font-medium text-[#c9d1d9] hover:bg-[#30363d] transition-colors">
              Upload
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                disabled={isSaving}
                className="hidden"
              />
            </label>
          </div>

          <div className="pt-4">
            <SectionHeading>About</SectionHeading>
          </div>

          <Field label="Organization name">
            <input
              type="text"
              value={form.name}
              onChange={handleChange("name")}
              disabled={isSaving}
              className={inputClass}
            />
          </Field>

          <Field label="Description" hint={`${form.description.length}/280`}>
            <textarea
              rows={4}
              maxLength={280}
              value={form.description}
              onChange={handleChange("description")}
              placeholder="What does this organization do?"
              disabled={isSaving}
              className={`${inputClass} resize-none`}
            />
          </Field>
        </div>
      ) : (
        <div className="mt-8 space-y-8">
          <div className="space-y-5">
            <SectionHeading>Avatar</SectionHeading>
            <div className="flex items-center gap-4 rounded-lg border border-[#30363d] bg-[#0d1117] p-4">
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border border-[#30363d] bg-[#161b22] flex items-center justify-center text-[#8b949e]">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <User size={24} />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-[#c9d1d9] truncate">
                  {avatarFile ? avatarFile.name : "Profile picture"}
                </p>
                <p className="text-[11px] text-[#6e7681]">
                  PNG, JPG, WEBP up to 5MB
                </p>
              </div>
              <label className="cursor-pointer rounded-md bg-[#21262d] border border-[#30363d] px-3 py-1.5 text-xs font-medium text-[#c9d1d9] hover:bg-[#30363d] transition-colors">
                Upload
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  disabled={isSaving}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="space-y-5 border-t border-[#21262d] pt-8">
            <SectionHeading>Identity</SectionHeading>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="First name">
                <input
                  type="text"
                  value={form.first_name}
                  onChange={handleChange("first_name")}
                  disabled={isSaving}
                  className={inputClass}
                />
              </Field>

              <Field label="Last name">
                <input
                  type="text"
                  value={form.last_name}
                  onChange={handleChange("last_name")}
                  disabled={isSaving}
                  className={inputClass}
                />
              </Field>
            </div>
          </div>

          <div className="space-y-5 border-t border-[#21262d] pt-8">
            <SectionHeading>About</SectionHeading>

            <Field label="Bio" hint={`${form.bio.length}/280`}>
              <textarea
                rows={4}
                maxLength={280}
                value={form.bio}
                onChange={handleChange("bio")}
                placeholder="Tell people about yourself"
                disabled={isSaving}
                className={`${inputClass} resize-none`}
              />
            </Field>

            <Field label="Location">
              <input
                type="text"
                value={form.location}
                onChange={handleChange("location")}
                placeholder="City, Country"
                disabled={isSaving}
                className={inputClass}
              />
            </Field>
          </div>

          <div className="space-y-5 border-t border-[#21262d] pt-8">
            <SectionHeading>Links</SectionHeading>

            <Field label="LinkedIn profile">
              <input
                type="url"
                value={form.linkedin_profile}
                onChange={handleChange("linkedin_profile")}
                placeholder="https://linkedin.com/in/username"
                disabled={isSaving}
                className={inputClass}
              />
            </Field>

            <Field label="Website">
              <input
                type="url"
                value={form.portfolio_website}
                onChange={handleChange("portfolio_website")}
                placeholder="https://yourdomain.com"
                disabled={isSaving}
                className={inputClass}
              />
            </Field>
          </div>
        </div>
      )}

      {error && (
        <div className="mt-6 flex items-start gap-2 rounded-md border border-[#f85149]/30 bg-[#f85149]/10 px-3 py-2.5 text-sm text-[#f85149]">
          <AlertCircle size={15} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {(isDirty || (success && !isDirty)) && (
        <div className="fixed inset-x-0 bottom-0 z-10 border-t border-[#21262d] bg-[#0d1117]/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <p className="text-sm text-[#8b949e]">
              {isDirty ? (
                "You have unsaved changes."
              ) : (
                <span className="flex items-center gap-1.5 text-[#3fb950]">
                  <Check size={14} />
                  {config.successMessage}
                </span>
              )}
            </p>

            {isDirty && (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  disabled={isSaving}
                  className="rounded-md border border-[#30363d] px-3 py-1.5 text-sm text-[#c9d1d9] transition-colors hover:border-[#8b949e] hover:bg-[#161b22] disabled:opacity-50"
                >
                  Discard
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-1.5 rounded-md bg-[#238636] px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#2ea043] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSaving ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Check size={14} />
                  )}
                  {isSaving ? "Saving…" : "Save changes"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </form>
  );
}

export default GeneralSettings;
