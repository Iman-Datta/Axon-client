import { useState } from "react";
import { CheckCircle2, X } from "lucide-react";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import ProfileProjects from "../components/profile/ProfileProjects";
import ProfileOrganizations from "../components/profile/ProfileOrganizations";
import ProfileTabs from "../components/profile/ProfileTabs";
import ContributionGraph from "../components/profile/ContributionGraph";
import ActivityFeed from "../components/profile/ActivityFeed";

function Profile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [show, setShow] = useState(true);

  const checklist = [
    "GitHub Connected",
    "Organization Created",
    "First Project Created",
    "Automation Enabled",
  ];

  return (
    <main className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      <ProfileHeader />

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3 space-y-5">
            <ProfileSidebar />

            <ProfileOrganizations />
          </aside>

          <section className="lg:col-span-9">
            {show && (
              <div
                className="
relative mb-6 p-5 rounded-2xl
border border-[#30363d]
bg-gradient-to-br from-[#161b22] to-[#0d1117]
"
              >
                <button
                  onClick={() => setShow(false)}
                  className="absolute right-4 top-4 text-[#8b949e]"
                >
                  <X size={16} />
                </button>

                <h2 className="text-xl font-bold text-white">
                  Welcome to Axon 🚀
                </h2>

                <p className="text-sm text-[#8b949e] mt-1 mb-5">
                  Your Git aware workspace is ready.
                </p>

                <div className="grid sm:grid-cols-2 gap-3">
                  {checklist.map((item) => (
                    <div
                      key={item}
                      className="
flex items-center gap-3
bg-[#161b22]
border border-[#30363d]
rounded-xl p-3
"
                    >
                      <CheckCircle2 size={18} className="text-green-500" />

                      <span>{item}</span>
                    </div>
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

            {activeTab === "organizations" && <ProfileOrganizations />}

            {activeTab === "activity" && <ActivityFeed />}
          </section>
        </div>
      </div>
    </main>
  );
}

export default Profile;
