import EditProfileSidebar from "./EditProfileSidebar";

function ProfileSidebar({ user, onUpdate }) {
  return <EditProfileSidebar user={user} onUpdate={onUpdate} />;
}

export default ProfileSidebar;