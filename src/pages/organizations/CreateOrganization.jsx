import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createOrganization } from "./services/organizationService";

function CreateOrganization() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector((state) => state.auth.accessToken);

  const user = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [belongsTo, setBelongsTo] = useState("");

  const [accepted, setAccepted] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!accepted || !belongsTo) {
      return;
    }

    try {
      setLoading(true);

      const data = await createOrganization(formData, dispatch, accessToken);

      navigate(`/${data.organization.slug}`);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center pt-20 px-6">
      <div className="w-full max-w-xl">
        <h1 className="text-center text-3xl font-bold mb-10">
          Set up your organization
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Organization Name */}
          <div>
            <label className="text-lg font-semibold">
              Organization name
              <span className="text-red-500"> *</span>
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="
                mt-3
                w-full
                rounded-md
                border
                border-[#30363d]
                bg-[#0d1117]
                px-3
                py-2.5
                outline-none
                focus:border-[#58a6ff]
              "
            />

            <p className="mt-2 text-sm text-[#8b949e]">
              Your URL will be: https://axon.dev/
              {formData.name.toLowerCase().replaceAll(" ", "-")}
            </p>
          </div>

          {/* Description */}
          <div>
            <label className="text-lg font-semibold">Description</label>

            <textarea
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="
                mt-3
                w-full
                rounded-md
                border
                border-[#30363d]
                bg-[#0d1117]
                px-3
                py-2.5
                outline-none
                focus:border-[#58a6ff]
                resize-none
              "
            />
          </div>

          {/* Radio Buttons */}
          <div>
            <h2 className="text-xl font-semibold mb-4">
              This organization belongs to:
            </h2>

            <div className="space-y-5">
              <label className="flex gap-3 cursor-pointer">
                <input
                  type="radio"
                  value="personal"
                  checked={belongsTo === "personal"}
                  onChange={(e) => setBelongsTo(e.target.value)}
                />

                <div>
                  <h3 className="font-semibold text-lg">My personal account</h3>

                  <p className="text-sm text-[#8b949e]">
                    i.e. {user.username} ({user.first_name} {user.last_name})
                  </p>
                </div>
              </label>

              <label className="flex gap-3 cursor-pointer">
                <input
                  type="radio"
                  value="business"
                  checked={belongsTo === "business"}
                  onChange={(e) => setBelongsTo(e.target.value)}
                />

                <div>
                  <h3 className="font-semibold text-lg">
                    A business or institution
                  </h3>

                  <p className="text-sm text-[#8b949e]">
                    Example: University, Company, Startup
                  </p>
                </div>
              </label>
            </div>
          </div>

          {/* Terms */}
          <label className="flex gap-3 items-start cursor-pointer">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-1"
            />

            <p className="text-base">I accept the Terms of Service.</p>
          </label>

          {/* Button */}
          <button
            disabled={!accepted || !belongsTo || !formData.name || loading}
            className="
              w-full
              py-3
              rounded-md
              font-medium
              bg-[#238636]
              hover:bg-[#2ea043]
              disabled:bg-[#1f3d28]
              disabled:cursor-not-allowed
              transition-colors
            "
          >
            {loading ? "Creating..." : "Create organization"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateOrganization;
