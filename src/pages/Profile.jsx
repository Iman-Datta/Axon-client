import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ProfileLayout from "../components/shared/ProfileLayout";
import ProfileChecklist from "../components/profile/ProfileChecklist";

const API = import.meta.env.VITE_API_URL;

function Profile() {
  const { slug } = useParams();

  const authUser = useSelector((state) => state.auth.user);

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isOwnProfile = authUser?.username === slug;

  const displayProfile = isOwnProfile ? authUser : profile;

  useEffect(() => {
    if (!slug || isOwnProfile) {
      return;
    }

    const controller = new AbortController();

    async function fetchProfile() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API}/auth/${slug}/`, {
          signal: controller.signal,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Profile not found.");
        }

        setProfile(result.data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();

    return () => controller.abort();
  }, [slug, isOwnProfile]);

  if (loading) {
    return (
      <ProfileLayout user={authUser}>
        <div className="py-20 text-center text-[#8b949e]">
          Loading profile...
        </div>
      </ProfileLayout>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center">
        {error}
      </main>
    );
  }

  if (!displayProfile) {
    return (
      <main className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center">
        Profile not found.
      </main>
    );
  }

  return (
    <ProfileLayout user={displayProfile}>
      <ProfileChecklist user={displayProfile} />
    </ProfileLayout>
  );
}

export default Profile;
