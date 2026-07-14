import { useState } from "react";
import { X } from "lucide-react";

function CreateEpicModal({ onClose, onSubmit, loading = false }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    color: "#3B82F6",
  });

  const colors = [
    "#3B82F6",
    "#22C55E",
    "#F97316",
    "#A855F7",
    "#EF4444",
    "#64748B",
  ];

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-lg rounded-2xl border border-[#30363d] bg-[#161b22] p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-[#e6edf3]">
            Create New Epic
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-[#8b949e] hover:bg-[#21262d]"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#c9d1d9]">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Authentication System"
              className="w-full rounded-lg border border-[#30363d] bg-[#0d1117] px-4 py-3 text-[#e6edf3] outline-none focus:border-[#58a6ff]"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#c9d1d9]">
              Description
            </label>

            <textarea
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe this epic..."
              className="w-full rounded-lg border border-[#30363d] bg-[#0d1117] px-4 py-3 text-[#e6edf3] outline-none focus:border-[#58a6ff]"
            />
          </div>

          {/* Color */}
          <div>
            <label className="mb-2 block text-sm font-medium text-[#c9d1d9]">
              Color
            </label>

            <div className="flex gap-3">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      color,
                    }))
                  }
                  className={`h-8 w-8 rounded-full border-2 transition ${
                    formData.color === color
                      ? "border-white scale-110"
                      : "border-transparent"
                  }`}
                  style={{
                    backgroundColor: color,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#30363d] px-4 py-2 text-[#c9d1d9] hover:bg-[#21262d]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-[#238636] px-4 py-2 font-medium text-white hover:bg-[#2ea043]"
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
