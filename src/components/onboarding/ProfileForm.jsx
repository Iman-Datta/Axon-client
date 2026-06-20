import { useState } from "react";
import { Loader2 } from "lucide-react";

import { useDispatch, useSelector } from "react-redux";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;

export default function ProfileForm({ refresh }) {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const [form, setForm] = useState({
    display_name: "",
    bio: "",
    role: "",
    stack: "",
    website: "",
  });

  const [avatar, setAvatar] = useState(null);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const updateField = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const submitProfile = async () => {
    if (!form.display_name.trim()) {
      setError("Display name required");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const body = new FormData();

      body.append("display_name", form.display_name.trim());

      body.append("bio", form.bio.trim());

      body.append("role", form.role);

      body.append("stack", form.stack.trim());

      body.append("website", form.website.trim());

      if (avatar) {
        body.append("avatar", avatar);
      }

      const res = await fetchWithAuth(
        `${API}/auth/profile/complete/`,
        {
          method: "PATCH",
          body,
        },
        dispatch,
        accessToken,
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Profile update failed");
      }

      refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Avatar */}
      <div className="flex items-center gap-5">
        <label
          className="
          h-20 w-20 rounded-full
          border-2 border-dashed
          border-[#30363d]
          bg-[#0d1117]
          flex items-center justify-center
          cursor-pointer
          overflow-hidden
          "
        >
          {avatar ? (
            <img
              src={URL.createObjectURL(avatar)}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-xs text-[#8b949e]">Upload</span>
          )}

          <input
            hidden
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </label>

        <div>
          <p className="text-sm font-medium text-[#c9d1d9]">Profile picture</p>

          <p className="text-xs text-[#8b949e]">PNG, JPG up to 2MB.</p>
        </div>
      </div>

      <div className="border-t border-[#21262d]" />

      {/* Name */}

      <div>
        <label className="text-sm text-[#c9d1d9]">Display name</label>

        <input
          name="display_name"
          value={form.display_name}
          onChange={updateField}
          placeholder="Iman Datta"
          className="
          mt-1 w-full rounded-lg
          border border-[#30363d]
          bg-[#0d1117]
          px-3 py-2.5
          text-[#c9d1d9]
          outline-none
          "
        />
      </div>

      {/* Bio */}

      <div>
        <label className="text-sm text-[#c9d1d9]">Bio</label>

        <textarea
          name="bio"
          maxLength={160}
          value={form.bio}
          onChange={updateField}
          rows={3}
          placeholder="Tell the community about yourself"
          className="
          mt-1 w-full resize-none rounded-lg
          border border-[#30363d]
          bg-[#0d1117]
          px-3 py-2.5
          text-[#c9d1d9]
          outline-none
          "
        />

        <p className="text-right text-xs text-[#484f58]">
          {form.bio.length}/160
        </p>
      </div>

      {/* Role + Stack */}

      <div className="grid grid-cols-2 gap-4">
        <select
          name="role"
          value={form.role}
          onChange={updateField}
          className="
          rounded-lg
          border border-[#30363d]
          bg-[#0d1117]
          px-3 py-2.5
          text-[#c9d1d9]
          "
        >
          <option value="">Select role</option>

          <option>Full-stack Developer</option>

          <option>Frontend Developer</option>

          <option>Backend Developer</option>

          <option>Student</option>
        </select>

        <input
          name="stack"
          value={form.stack}
          onChange={updateField}
          placeholder="React, Django"
          className="
          rounded-lg
          border border-[#30363d]
          bg-[#0d1117]
          px-3 py-2.5
          text-[#c9d1d9]
          "
        />
      </div>

      {/* Website */}

      <input
        name="website"
        value={form.website}
        onChange={updateField}
        placeholder="https://yoursite.dev"
        className="
        w-full rounded-lg
        border border-[#30363d]
        bg-[#0d1117]
        px-3 py-2.5
        text-[#c9d1d9]
        "
      />

      {error && <p className="text-xs text-red-400">{error}</p>}

      <button
        onClick={submitProfile}
        disabled={saving}
        className="
        w-full rounded-lg
        bg-[#238636]
        py-3
        text-white
        disabled:opacity-50
        "
      >
        {saving ? (
          <Loader2 className="mx-auto animate-spin" />
        ) : (
          "Complete Profile"
        )}
      </button>
    </div>
  );
}
