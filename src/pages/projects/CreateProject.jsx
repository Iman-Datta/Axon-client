import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { createProject } from "../../services/projectService";

function CreateProject() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector((state) => state.auth.accessToken);

  const user = useSelector((state) => state.auth.user);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Project name is required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const workspaceSlug = user.username;

      const data = await createProject(
        workspaceSlug,
        formData,
        dispatch,
        accessToken,
      );

      navigate(`/${workspaceSlug}/${data.project.slug}`);
    } catch (err) {
      console.error(err);

      if (typeof err === "string") {
        setError(err);
      } else if (err?.message) {
        setError(err.message);
      } else if (err?.errors?.name?.length) {
        setError(err.errors.name[0]);
      } else if (err?.errors?.description?.length) {
        setError(err.errors.description[0]);
      } else {
        setError("Something went wrong while creating the project.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center pt-20 px-6">
      <div className="w-full max-w-xl">
        <h1 className="text-center text-3xl font-bold mb-10">
          Create a new project
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="text-lg font-semibold">
              Project name
              <span className="text-red-500"> *</span>
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-3 w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2.5 outline-none focus:border-[#58a6ff]"
            />

            <p className="mt-2 text-sm text-[#8b949e]">
              URL: {window.location.origin}/{user.username}/
              {formData.name.toLowerCase().replaceAll(" ", "-")}
            </p>
          </div>

          <div>
            <label className="text-lg font-semibold">Description</label>

            <textarea
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-3 w-full rounded-md border border-[#30363d] bg-[#0d1117] px-3 py-2.5 outline-none focus:border-[#58a6ff] resize-none"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            disabled={!formData.name || loading}
            className="w-full py-3 rounded-md font-medium bg-[#238636] hover:bg-[#2ea043] disabled:bg-[#1f3d28] disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Creating..." : "Create project"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProject;
