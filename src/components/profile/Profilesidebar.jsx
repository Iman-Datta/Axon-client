import EditProfileSidebar from "./Editprofilesidebar";

function ProfileSidebar({ user, onUpdate, isOwnProfile }) {
  if (!isOwnProfile) {
    return null;
  }

  return (
    <EditProfileSidebar
      user={user}
      onUpdate={onUpdate}
      isOwnProfile={isOwnProfile}
    />
  );
}

export default ProfileSidebar;
