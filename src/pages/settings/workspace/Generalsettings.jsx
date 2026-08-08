import { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Loader2, Check, AlertCircle } from "lucide-react";

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

// Per-type config: what's editable, where it saves, and how the
// read-only info + form fields are laid out. Keeping this in one object
// is what lets a single component drive both /settings/profile and
// /settings/general instead of maintaining two near-identical pages.
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
      "avatar",
      "bio",
      "location",
      "linkedin_profile",
      "portfolio_website",
    ],
    buildForm: (source) => ({
      first_name: source?.first_name || "",
      last_name: source?.last_name || "",
      avatar: source?.avatar || "",
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
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const isDirty = JSON.stringify(form) !== JSON.stringify(savedForm);

  const handleChange = (field) => (e) => {
    setSuccess(false);
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleReset = () => {
    setForm(savedForm);
    setError(null);
    setSuccess(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(false);

    try {
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

      const updated = { ...details, ...data[config.responseKey] };
      setSavedForm(config.buildForm(updated));
      setForm(config.buildForm(updated));
      onUpdate?.(updated);
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
          <SectionHeading>About</SectionHeading>

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

            <Field
              label="Avatar URL"
              hint="Paste a link to an image hosted elsewhere."
            >
              <input
                type="url"
                value={form.avatar}
                onChange={handleChange("avatar")}
                placeholder="https://..."
                disabled={isSaving}
                className={inputClass}
              />
            </Field>
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
