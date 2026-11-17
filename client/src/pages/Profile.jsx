import { useParams } from "react-router-dom"
import ProfileHeader from "../components/ProfileHeader";
import ProfileReviewCard from "../components/ProfileReviewCard";
import "./Profile.css";

const testProfile = {
  username: "testuser",
  bio: "This is a test profile",
  avatar_url: "",
  review_count: 2,
}

const testReviews = [
  {
    id: 1,
    review: {
      game_id: 1,
      stars: 4,
      written_review: "Great loop, every run feels different.",
      created_at: "2026-10-12",
    },
    game: { name: "Hades" },
    cover: null,
  },
  {
    id: 2,
    review: {
      game_id: 2,
      stars: 5,
      written_review: "Beautiful world, some rough boss spikes.",
      created_at: "2026-09-30",
    },
    game: { name: "Elden Ring" },
    cover: null,
  },
]
export default function Profile() {
  const { username } = useParams();
  
  return (
    <main className="profile">
      <ProfileHeader profile={{ ...testProfile, username }} />
          <section className="profile-reviews">
            <h2>Reviews</h2>
            <ul className="profile-review-list">
              {testReviews.map((review) => (
                <ProfileReviewCard
                  key={review.id}
                  review={review.review}
                  game={review.game}
                  cover={review.cover}
                />
              ))}
            </ul>
          </section>
    </main>
    
  );
}
