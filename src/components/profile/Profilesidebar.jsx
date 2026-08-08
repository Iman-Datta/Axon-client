import EditProfileSidebar from "./Editprofilesidebar";

function ProfileSidebar({ user, onUpdate }) {
  return <EditProfileSidebar user={user} onUpdate={onUpdate} />;
}

export default ProfileSidebar;