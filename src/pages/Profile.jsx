import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileChecklist from "../components/profile/ProfileChecklist";

const API = import.meta.env.VITE_API_URL;

function Profile() {
  const { username } = useParams();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API}/auth/${username}/`, {
          signal: controller.signal,
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Profile not found");
        }

        setProfile(result.data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();

    return () => controller.abort();
  }, [username]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0d1117] text-white flex items-center justify-center">
        {error}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      <ProfileHeader user={profile} />

      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3 order-2 lg:order-1">
            <ProfileSidebar user={profile} />
          </aside>

          <section className="lg:col-span-9 order-1 lg:order-2">
            <ProfileChecklist user={profile} />
          </section>
        </div>
      </div>
    </main>
  );
}

export default Profile;
