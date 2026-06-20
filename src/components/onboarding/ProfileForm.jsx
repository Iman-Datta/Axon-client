export default function ProfileForm({ form, setForm }) {
  const updateField = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="space-y-5">
      {/* First + Last Name */}
      <div className="grid grid-cols-2 gap-4">
        <input
          name="first_name"
          value={form.first_name || ""}
          onChange={updateField}
          placeholder="First name"
          className="
            rounded-lg
            border border-[#30363d]
            bg-[#0d1117]
            px-3 py-2.5
            text-[#c9d1d9]
            outline-none
          "
        />

        <input
          name="last_name"
          value={form.last_name || ""}
          onChange={updateField}
          placeholder="Last name"
          className="
            rounded-lg
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
        <textarea
          name="bio"
          maxLength={160}
          rows={3}
          value={form.bio || ""}
          onChange={updateField}
          placeholder="Tell the community about yourself"
          className="
            w-full
            resize-none
            rounded-lg
            border border-[#30363d]
            bg-[#0d1117]
            px-3 py-2.5
            text-[#c9d1d9]
            outline-none
          "
        />

        <p className="text-right text-xs text-[#484f58]">
          {(form.bio || "").length}/160
        </p>
      </div>

      {/* LinkedIn */}
      <input
        type="url"
        name="linkedin_profile"
        value={form.linkedin_profile || ""}
        onChange={updateField}
        placeholder="LinkedIn profile URL"
        className="
          w-full
          rounded-lg
          border border-[#30363d]
          bg-[#0d1117]
          px-3 py-2.5
          text-[#c9d1d9]
          outline-none
        "
      />

      {/* Portfolio */}
      <input
        type="url"
        name="portfolio_website"
        value={form.portfolio_website || ""}
        onChange={updateField}
        placeholder="Portfolio website URL"
        className="
          w-full
          rounded-lg
          border border-[#30363d]
          bg-[#0d1117]
          px-3 py-2.5
          text-[#c9d1d9]
          outline-none
        "
      />
    </div>
  );
}
