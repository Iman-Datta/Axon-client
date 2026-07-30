import { useState } from "react";
import { X, Layers, AlertCircle } from "lucide-react";

const PRESET_COLORS = [
  "#3B82F6",
  "#22C55E",
  "#F97316",
  "#A855F7",
  "#EF4444",
  "#64748B",
  "#EAB308",
  "#EC4899",
  "#14B8A6",
  "#6366F1",
];

function CreateEpicModal({ onClose, onSubmit, loading = false, error }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "#3B82F6",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleColorPick = (color) => {
    setFormData((prev) => ({ ...prev, color }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl border border-[#30363d] bg-[#161b22] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#21262d] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#0d1117] ring-1 ring-[#30363d]">
              <Layers className="h-4 w-4 text-[#8b949e]" />
            </div>
            <h2 className="text-sm font-semibold text-[#e6edf3]">
              Create New Epic
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-[#8b949e] transition hover:bg-[#21262d] hover:text-[#e6edf3]"
          >
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 px-5 py-5">
            {/* Name */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#c9d1d9]">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Authentication System"
                maxLength={100}
                className="w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm text-[#e6edf3] placeholder-[#6e7681] outline-none transition focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]/40"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#c9d1d9]">
                Description
                <span className="ml-1 font-normal text-[#6e7681]">
                  (optional)
                </span>
              </label>
              <textarea
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe this epic..."
                maxLength={500}
                className="w-full resize-none rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2 text-sm text-[#e6edf3] placeholder-[#6e7681] outline-none transition focus:border-[#58a6ff] focus:ring-1 focus:ring-[#58a6ff]/40"
              />
            </div>

            {/* Color */}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-[#c9d1d9]">
                Color
              </label>

              <div className="flex flex-wrap items-center gap-2">
                {PRESET_COLORS.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleColorPick(color)}
                    className={`h-6 w-6 rounded-full transition ${
                      formData.color.toLowerCase() === color.toLowerCase()
                        ? "ring-2 ring-white ring-offset-2 ring-offset-[#161b22]"
                        : "hover:scale-110"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}

                {/* Custom color — no backend restriction */}
                <label className="relative flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-dashed border-[#6e7681] bg-[#0d1117] text-[10px] text-[#6e7681] transition hover:border-[#8b949e] hover:text-[#8b949e]">
                  +
                  <input
                    type="color"
                    value={formData.color}
                    onChange={(e) => handleColorPick(e.target.value)}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  />
                </label>
              </div>

              <div className="mt-2.5 flex items-center gap-2">
                <div
                  className="h-4 w-4 shrink-0 rounded-full ring-1 ring-[#30363d]"
                  style={{ backgroundColor: formData.color }}
                />
                <input
                  type="text"
                  value={formData.color}
                  onChange={(e) => handleColorPick(e.target.value)}
                  spellCheck={false}
                  className="w-24 rounded-md border border-[#30363d] bg-[#0d1117] px-2 py-1 font-mono text-xs uppercase text-[#c9d1d9] outline-none focus:border-[#58a6ff]"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-400">
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {error}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-2 border-t border-[#21262d] px-5 py-3.5">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-[#30363d] px-3.5 py-1.5 text-xs font-medium text-[#c9d1d9] transition hover:bg-[#21262d]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className={`rounded-md px-3.5 py-1.5 text-xs font-medium text-white transition ${
                loading
                  ? "cursor-not-allowed bg-[#30363d] text-[#8b949e]"
                  : "bg-[#238636] hover:bg-[#2ea043]"
              }`}
            >
              {loading ? "Creating..." : "Create Epic"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateEpicModal;
