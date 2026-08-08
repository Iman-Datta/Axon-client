import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Type, Hash, FileText, Globe, Lock, Users } from "lucide-react";

import { updateProject } from "../../../services/projectService";

const DESCRIPTION_LIMIT = 280;
const MESSAGE_TIMEOUT = 3000;

const FIELD_DEFAULTS = {
  name: "",
  project_key: "",
  description: "",
  website: "",
  visibility: "private",
};

const VISIBILITY_OPTIONS = [
  {
    value: "private",
    icon: Lock,
    title: "Private",
    desc: "Only invited members can view this project.",
  },
  {
    value: "public",
    icon: Users,
    title: "Public",
    desc: "Anyone with the link can view this project.",
  },
];

function FieldHeader({ icon: Icon, title, hint }) {
  return (
    <div className="flex items-start gap-2">
      <Icon size={14} className="mt-0.5 shrink-0 text-[#8b949e]" />
      <div>
        <h2 className="text-sm font-semibold text-[#f0f6fc]">{title}</h2>
        <p className="mt-0.5 text-xs text-[#8b949e]">{hint}</p>
      </div>
    </div>
  );
}

function GeneralSetting() {
  const [formData, setFormData] = useState(FIELD_DEFAULTS);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null); // { type: "success" | "error", message: string }

  const { slug, project_slug } = useParams();
  const { project, setProject } = useOutletContext();

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const updateField = (field) => (value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  useEffect(() => {
    if (!project) return;

    setFormData({
      name: project.name || "",
      project_key: project.project_key || "",
      description: project.description || "",
      website: project.website || "",
      visibility: project.visibility || "private",
    });
  }, [project]);

  // Auto-dismiss success/error message
  useEffect(() => {
    if (!status) return;
    const timer = setTimeout(() => setStatus(null), MESSAGE_TIMEOUT);
    return () => clearTimeout(timer);
  }, [status]);

  const isDirty = Object.keys(FIELD_DEFAULTS).some(
    (key) => formData[key] !== (project?.[key] || FIELD_DEFAULTS[key]),
  );

  const handleSave = async () => {
    try {
      setSaving(true);
      setStatus(null);

      const response = await updateProject(
        slug,
        project_slug,
        formData,
        dispatch,
        accessToken,
      );

      setProject(response.project);
      setStatus({ type: "success", message: "Changes saved" });
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: err?.message || "Failed to save changes.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (!project) {
    return (
      <div className="flex h-full items-center justify-center">Loading...</div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col rounded-xl border border-[#21262d] bg-[#11161d]">
      {/* Scrollable Content */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4">
        <div className="space-y-5">
          {/* Project Name */}
          <div className="border-b border-[#21262d] pb-5">
            <FieldHeader
              icon={Type}
              title="Project name"
              hint="The display name shown across your workspace."
            />
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateField("name")(e.target.value)}
              placeholder="Axon Backend"
              disabled={saving}
              className="mt-3 w-full max-w-md rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm text-[#f0f6fc] outline-none transition focus:border-[#388bfd] disabled:opacity-60"
            />
          </div>

          {/* Project Key */}
          <div className="border-b border-[#21262d] pb-5">
            <FieldHeader
              icon={Hash}
              title="Project key"
              hint="Used as the prefix for ticket IDs."
            />
            <div className="mt-3 flex items-center gap-3">
              <input
                type="text"
                value={formData.project_key}
                onChange={(e) =>
                  updateField("project_key")(e.target.value.toUpperCase())
                }
                placeholder="AXON"
                maxLength={10}
                disabled={saving}
                className="w-full max-w-[10rem] rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm font-medium uppercase tracking-wide text-[#f0f6fc] outline-none transition focus:border-[#388bfd] disabled:opacity-60"
              />
              <span className="rounded-md border border-dashed border-[#30363d] bg-[#0d1117] px-2.5 py-1.5 font-mono text-xs text-[#8b949e]">
                {formData.project_key || "AXON"}-1
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="border-b border-[#21262d] pb-5">
            <FieldHeader
              icon={FileText}
              title="Description"
              hint="A short summary describing the purpose of this project."
            />
            <div className="mt-3 max-w-2xl">
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  e.target.value.length <= DESCRIPTION_LIMIT &&
                  updateField("description")(e.target.value)
                }
                placeholder="Describe what this project is for..."
                disabled={saving}
                className="w-full resize-none rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm text-[#f0f6fc] outline-none transition focus:border-[#388bfd] disabled:opacity-60"
              />
              <p className="mt-1 text-right text-[11px] text-[#6e7681]">
                {formData.description.length}/{DESCRIPTION_LIMIT}
              </p>
            </div>
          </div>

          {/* Website */}
          <div className="border-b border-[#21262d] pb-5">
            <FieldHeader
              icon={Globe}
              title="Website"
              hint="Link to your repository, documentation or homepage."
            />
            <input
              type="url"
              value={formData.website}
              onChange={(e) => updateField("website")(e.target.value)}
              placeholder="https://github.com/your-org/project"
              disabled={saving}
              className="mt-3 w-full max-w-lg rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm text-[#f0f6fc] outline-none transition focus:border-[#388bfd] disabled:opacity-60"
            />
          </div>

          {/* Visibility */}
          <div className="pb-2">
            <FieldHeader
              icon={Lock}
              title="Visibility"
              hint="Control who can access this project."
            />
            <div className="mt-3 grid max-w-lg grid-cols-1 gap-2 sm:grid-cols-2">
              {VISIBILITY_OPTIONS.map(({ value, icon: Icon, title, desc }) => {
                const selected = formData.visibility === value;
                return (
                  <button
                    key={value}
                    type="button"
                    disabled={saving}
                    onClick={() => updateField("visibility")(value)}
                    className="flex items-start gap-2.5 rounded-md border p-3 text-left transition disabled:opacity-60"
                    style={{
                      borderColor: selected ? "#388bfd" : "#30363d",
                      backgroundColor: selected
                        ? "rgba(56,139,253,0.08)"
                        : "#0d1117",
                    }}
                  >
                    <Icon
                      size={15}
                      className="mt-0.5 shrink-0"
                      style={{ color: selected ? "#58a6ff" : "#8b949e" }}
                    />
                    <div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: selected ? "#58a6ff" : "#f0f6fc" }}
                      >
                        {title}
                      </p>
                      <p className="mt-0.5 text-xs leading-4 text-[#8b949e]">
                        {desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="sticky bottom-0 mt-2 flex items-center justify-between border-t border-[#21262d] bg-[#0d1117] p-6">
        <div className="flex items-center gap-2">
          {status?.type === "error" && (
            <span className="text-xs text-[#f85149]">{status.message}</span>
          )}
          {status?.type === "success" && (
            <span className="text-xs text-[#3fb950]">{status.message}</span>
          )}
          {!status && isDirty && (
            <>
              <span className="h-1.5 w-1.5 rounded-full bg-[#d29922]" />
              <span className="text-xs text-[#8b949e]">
                You have unsaved changes
              </span>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={!isDirty || saving}
          className="rounded-md bg-[#238636] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#2ea043] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save changes"}
        </button>
      </div>
    </div>
  );
}

export default GeneralSetting;
