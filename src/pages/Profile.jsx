import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle2, Circle, X } from "lucide-react";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileOrganizations from "../components/profile/ProfileOrganizations";
import ProfileTabs from "../components/profile/ProfileTabs";
import ContributionGraph from "../components/profile/ContributionGraph";
import ProfileProjects from "../components/profile/ProfileProjects";
import ActivityFeed from "../components/profile/ActivityFeed";

const API = import.meta.env.VITE_API_URL;

const INITIAL_CHECKLIST = [
  { id: "profile", label: "Profile completed", done: true },
  { id: "github", label: "GitHub connected", done: true },
  { id: "project", label: "First project created", done: false },
  { id: "automation", label: "Automation enabled", done: true },
];

function Profile() {
  const { username } = useParams();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState("overview");
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);
  const [showChecklist, setShowChecklist] = useState(true);

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

  const completedCount = checklist.filter((item) => item.done).length;

  const progress = Math.round((completedCount / checklist.length) * 100);

  const toggleItem = (id) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    );
  };

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

            <ProfileOrganizations />
          </aside>

          <section className="lg:col-span-9 order-1 lg:order-2">
            {showChecklist && (
              <div className="border border-[#30363d] bg-linear-to-br from-[#161b22] to-[#0d1117] rounded-2xl p-5 mb-6 relative">
                <button
                  onClick={() => setShowChecklist(false)}
                  className="absolute top-4 right-4 text-[#8b949e] hover:text-white"
                >
                  <X size={16} />
                </button>

                <h3 className="text-base font-semibold text-[#e6edf3]">
                  Welcome to Axon, {profile.first_name}
                </h3>

                <p className="text-sm text-[#8b949e] mb-4">
                  Your developer workspace is ready.
                </p>

                <div className="h-1.5 bg-[#21262d] rounded-full overflow-hidden mb-5">
                  <div
                    className="h-full bg-[#2f81f7] rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  {checklist.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className="flex gap-2 items-center text-left"
                    >
                      {item.done ? (
                        <CheckCircle2 size={17} className="text-[#238636]" />
                      ) : (
                        <Circle size={17} />
                      )}

                      <span className="text-sm text-[#c9d1d9]">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <ProfileTabs activeTab={activeTab} onChange={setActiveTab} />

            {activeTab === "overview" && (
              <>
                <ContributionGraph />
                <ProfileProjects />
                <ActivityFeed />
              </>
            )}

            {activeTab === "projects" && <ProfileProjects />}

            {activeTab === "organizations" && (
              <div className="mt-6 max-w-sm">
                <ProfileOrganizations />
              </div>
            )}

            {activeTab === "activity" && <ActivityFeed />}
          </section>
        </div>
      </div>
    </main>
  );
}

export default Profile;
