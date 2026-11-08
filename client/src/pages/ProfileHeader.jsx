// profile page header
export default function ProfileHeader({ profile }) {
  return (
    <header className="profile-header">
      <div className="profile-avatar">
        {profile.avatar_url ? (
          <img src={profile.avatar_url} alt={`${profile.username}'s avatar`} />
        ) : (
          <span>{profile.username[0].toUpperCase()}</span>
        )}
      </div>
      <div>
        <h1>{profile.username}</h1>
        <p>{profile.bio}</p>
        <small>{profile.review_count} reviews</small>
      </div>
    </header>
  );
}