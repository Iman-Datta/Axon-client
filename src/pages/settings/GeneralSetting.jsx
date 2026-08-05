import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Lock, Globe, Copy, Check } from "lucide-react";

function SectionCard({ title, description, children }) {
  return (
    <section className="rounded-2xl border border-[#30363d] bg-[#161b22] p-6">
      <h2 className="text-lg font-semibold text-[#f0f6fc]">{title}</h2>
      {description && (
        <p className="mt-1 text-sm text-[#8b949e]">{description}</p>
      )}
      <div className="mt-5">{children}</div>
    </section>
  );
}

function GeneralSetting() {
  const project = useOutletContext() || {};

  const [name, setName] = useState(project.name || "");
  const [description, setDescription] = useState(project.description || "");
  const [website, setWebsite] = useState(project.website || "");
  const [visibility, setVisibility] = useState(project.visibility || "public");
  const [copied, setCopied] = useState(false);

  const isDirty =
    name !== (project.name || "") ||
    description !== (project.description || "") ||
    website !== (project.website || "") ||
    visibility !== (project.visibility || "public");

  const handleCopySlug = () => {
    navigator.clipboard?.writeText(project.slug || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleSave = () => {
    // Wire this up to your update-project mutation.
    console.log("Saving project changes", {
      name,
      description,
      website,
      visibility,
    });
  };

  return (
    <div className="space-y-8">
      {/* Project Name */}
      <SectionCard
        title="Project name"
        description="This is the display name shown across the workspace."
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Axon Backend V2"
          className="w-full rounded-lg border border-[#30363d] bg-[#0d1117] px-3 py-2 text-[#f0f6fc] outline-none transition focus:border-[#388bfd]"
        />
      </SectionCard>

      {/* Slug (read-only) */}
      <SectionCard
        title="Project slug"
        description="The unique identifier used in URLs. Slugs can't be changed after a project is created."
      >
        <div className="flex items-center justify-between gap-3 rounded-lg border border-[#30363d] bg-[#0d1117]/60 px-3 py-2">
          <code className="truncate text-sm text-[#8b949e]">
            {project.slug || "—"}
          </code>
          <button
            type="button"
            onClick={handleCopySlug}
            className="flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs text-[#8b949e] transition hover:bg-[#21262d] hover:text-[#c9d1d9]"
          >
            {copied ? <Check size={13} /> : <Copy size={13} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </SectionCard>

      {/* Description */}
      <SectionCard
        title="Description"
        description="A short description about this project."
      >
        <textarea
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what this project is for..."
          className="w-full resize-none rounded-lg border border-[#30363d] bg-[#0d1117] px-3 py-2 text-[#f0f6fc] outline-none transition focus:border-[#388bfd]"
        />
      </SectionCard>

      {/* Website */}
      <SectionCard
        title="Website"
        description="Link to a homepage, repository, or docs for this project."
      >
        <input
          type="url"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="https://github.com/your-org/your-repo"
          className="w-full rounded-lg border border-[#30363d] bg-[#0d1117] px-3 py-2 text-[#f0f6fc] outline-none transition focus:border-[#388bfd]"
        />
      </SectionCard>

      {/* Visibility */}
      <SectionCard
        title="Visibility"
        description="Control who can see this project."
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setVisibility("public")}
            className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-left transition ${
              visibility === "public"
                ? "border-[#388bfd] bg-[#388bfd]/10"
                : "border-[#30363d] bg-[#0d1117] hover:border-[#484f58]"
            }`}
          >
            <Globe
              size={18}
              className={
                visibility === "public" ? "text-[#58a6ff]" : "text-[#8b949e]"
              }
            />
            <span>
              <span className="block text-sm font-medium text-[#f0f6fc]">
                Public
              </span>
              <span className="block text-xs text-[#8b949e]">
                Anyone can view this project.
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => setVisibility("private")}
            className={`flex items-start gap-3 rounded-lg border px-4 py-3 text-left transition ${
              visibility === "private"
                ? "border-[#388bfd] bg-[#388bfd]/10"
                : "border-[#30363d] bg-[#0d1117] hover:border-[#484f58]"
            }`}
          >
            <Lock
              size={18}
              className={
                visibility === "private" ? "text-[#58a6ff]" : "text-[#8b949e]"
              }
            />
            <span>
              <span className="block text-sm font-medium text-[#f0f6fc]">
                Private
              </span>
              <span className="block text-xs text-[#8b949e]">
                Only workspace members can view this project.
              </span>
            </span>
          </button>
        </div>
      </SectionCard>

      {/* Save */}
      <div className="flex items-center justify-end gap-3">
        {isDirty && (
          <span className="text-xs text-[#8b949e]">
            You have unsaved changes
          </span>
        )}
        <button
          type="button"
          onClick={handleSave}
          disabled={!isDirty}
          className="rounded-lg bg-[#238636] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#2ea043] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Save changes
        </button>
      </div>
    </div>
  );
}

export default GeneralSetting;
