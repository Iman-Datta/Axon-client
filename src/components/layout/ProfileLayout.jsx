import ProfileHeader from "../profile/ProfileHeader";
import ProfileSidebar from "../profile/Profilesidebar";

function ProfileLayout({ user, children, isOwnProfile }) {
  return (
    <main className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      <ProfileHeader user={user} />

      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div
          className={`grid grid-cols-1 gap-8 ${
            isOwnProfile ? "lg:grid-cols-12" : "lg:grid-cols-1"
          }`}
        >
          <aside className={isOwnProfile ? "lg:col-span-3" : "max-w-md"}>
            <ProfileSidebar user={user} isOwnProfile={isOwnProfile} />
          </aside>

          {isOwnProfile && (
            <section className="lg:col-span-9 space-y-6">{children}</section>
          )}
        </div>
      </div>
    </main>
  );
}

export default ProfileLayout;
