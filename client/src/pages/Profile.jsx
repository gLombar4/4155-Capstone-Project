import { useParams } from "react-router-dom"
import ProfileHeader from "../components/ProfileHeader";
import ReviewCard from "../components/ReviewCard";
import "./Profile.css";

const testProfile = {
  username: "testuser",
  bio: "This is a test profile",
  avatar_url: "",
  review_count: 2,
}

const testReviews = [
  { id: 1, game: "Hades", rating: 9, body: "Great loop, every run feels different.", created_at: "2026-10-12" },
  { id: 2, game: "Elden Ring", rating: 8, body: "Beautiful world, some rough boss spikes.", created_at: "2026-09-30" },
]
export default function Profile() {
  const { username } = useParams();
  
  return (
    <main className="Profile">
      <ProfileHeader profile={{ ...testProfile, username }} />
          <section className = "profile-reviews">
            <h2>Reviews</h2>
            {testReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </section>
    </main>
    
  );
}
