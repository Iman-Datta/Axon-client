import { useState, useEffect } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import ProfileForm from "./ProfileForm";
import { fetchWithAuth } from "../../utils/fetchWithAuth";

const API = import.meta.env.VITE_API_URL;

export default function CompleteProfile({ profile, refresh }) {
  console.log(profile?.data); // Debug
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { accessToken, user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    first_name: profile?.data?.first_name || "",

    last_name: profile?.data?.last_name || "",

    bio: "",

    linkedin_profile: "",

    portfolio_website: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");



  const handleCompleteProfile = async () => {
    try {
      setSaving(true);

      setError("");

      const res = await fetchWithAuth(
        `${API}/auth/profile/complete/`,

        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            first_name: form.first_name.trim(),

            last_name: form.last_name.trim(),

            bio: form.bio.trim(),

            linkedin_profile: form.linkedin_profile.trim(),

            portfolio_website: form.portfolio_website.trim(),
          }),
        },

        dispatch,

        accessToken,
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Profile update failed");
      }

      await refresh();

      if (user?.username) {
        navigate(`/${user.username}`, {
          replace: true,
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* heading */}

      <div className="mb-6">
        <h2 className="text-base font-semibold text-[#c9d1d9]">
          Set up your profile
        </h2>

        <p className="mt-1 text-sm text-[#8b949e]">
          Complete your developer profile.
        </p>
      </div>

      {/* form */}

      <div
        className="
        rounded-xl
        border border-[#30363d]
        bg-[#161b22]
        p-6
      "
      >
        <ProfileForm form={form} setForm={setForm} />
      </div>

      {error && <p className="mt-3 text-xs text-red-400">{error}</p>}

      <div className="mt-6">
        <button
          onClick={handleCompleteProfile}
          disabled={saving || !form.first_name.trim() || !form.last_name.trim()}
          className="
            flex
            w-full
            items-center
            justify-center
            gap-2

            rounded-lg
            bg-[#238636]
            py-3

            text-sm
            font-semibold
            text-white

            hover:bg-[#2ea043]

            disabled:opacity-50
            disabled:cursor-not-allowed

            transition-colors
          "
        >
          {saving ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              Finish setup
              <ArrowRight size={16} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
