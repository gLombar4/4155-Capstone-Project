// profile page header
export default function ProfileHeader({ profile }) {
  const initial = profile.username?.charAt(0).toUpperCase() || "?";

  return (
    <header className="profile-header">
      <div className="profile-avatar" aria-hidden="true">
        {initial}
      </div>
      <div>
        <h1>{profile.username}</h1>
        <small>{profile.review_count} reviews</small>
      </div>
    </header>
  );
}