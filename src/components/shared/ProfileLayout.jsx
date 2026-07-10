import ProfileHeader from "../profile/ProfileHeader";
import ProfileSidebar from "../profile/ProfileSidebar";

function ProfileLayout({ user, children }) {
  return (
    <main className="min-h-screen bg-[#0d1117] text-[#c9d1d9]">
      <ProfileHeader user={user} />

      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3 order-2 lg:order-1">
            <ProfileSidebar user={user} />
          </aside>

          <section className="lg:col-span-9 order-1 lg:order-2 space-y-6">
            {children}
          </section>
        </div>
      </div>
    </main>
  );
}

export default ProfileLayout;
