import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProfileLayout from "../components/shared/ProfileLayout";
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
    <ProfileLayout user={profile}>
      <ProfileChecklist user={profile} />

      {/* Future Components */}
      {/* <PinnedProjects user={profile} /> */}
      {/* <OrganizationPreview user={profile} /> */}
      {/* <RecentActivity user={profile} /> */}
    </ProfileLayout>
  );
}

export default Profile;
