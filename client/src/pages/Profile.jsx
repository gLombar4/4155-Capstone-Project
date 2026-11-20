import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../api";
import Header from "../components/header";
import Footer from "../components/footer";
import ProfileHeader from "../components/ProfileHeader";
import ProfileReviewCard from "../components/ProfileReviewCard";
import "./Profile.css";

export default function Profile() {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      setLoading(true);
      setProfile(null);
      setReviews([]);
      setError("");

      try {
        const profileResponse = await fetch(
          `${API_URL}/users/username/${encodeURIComponent(username)}`
        );
        if (!profileResponse.ok) {
          if (profileResponse.status === 404) {
            throw new Error("Profile not found.");
          }
          throw new Error("Unable to load this profile.");
        }

        const profileData = await profileResponse.json();
        const reviewsResponse = await fetch(
          `${API_URL}/reviews/user/${profileData.user_id}`
        );
        if (!reviewsResponse.ok) {
          throw new Error("Unable to load this profile's reviews.");
        }

        const reviewData = await reviewsResponse.json();
        if (cancelled) return;

        setProfile(profileData);
        setReviews(
          reviewData.map((review) => ({ review, game: null, cover: null }))
        );

        if (reviewData.length > 0) {
          const gameIds = [
            ...new Set(reviewData.map((review) => review.game_id)),
          ];
          const idList = gameIds.join(",");
          const [gamesResponse, coversResponse] = await Promise.all([
            fetch("/api/games", {
              method: "POST",
              headers: { Accept: "application/json" },
              body: `fields id,name; where id = (${idList});`,
            }),
            fetch("/api/covers", {
              method: "POST",
              headers: { Accept: "application/json" },
              body: `fields game,url; where game = (${idList});`,
            }),
          ]);

          if (!gamesResponse.ok || !coversResponse.ok) {
            throw new Error("Game details are temporarily unavailable.");
          }

          const [games, covers] = await Promise.all([
            gamesResponse.json(),
            coversResponse.json(),
          ]);
          if (cancelled) return;

          setReviews(
            reviewData.map((review) => ({
              review,
              game:
                games.find(
                  (game) => String(game.id) === String(review.game_id)
                ) || null,
              cover:
                covers.find(
                  (cover) => String(cover.game) === String(review.game_id)
                ) || null,
            }))
          );
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError.message || "Unable to load this profile.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProfile();
    return () => {
      cancelled = true;
    };
  }, [username]);

  return (
    <>
      <Header />
      <main className="profile">
        {loading && <p role="status">Loading profile...</p>}
        {!loading && error && <p role="alert">{error}</p>}
        {!loading && profile && (
          <>
            <ProfileHeader
              profile={{
                username: profile.user_name,
                review_count: reviews.length,
              }}
            />
            <section className="profile-reviews">
              <h2>Reviews</h2>
              <ul className="profile-review-list">
                {reviews.map(({ review, game, cover }) => (
                  <ProfileReviewCard
                    key={`${review.game_id}-${review.user_id}`}
                    review={review}
                    game={game}
                    cover={cover}
                  />
                ))}
              </ul>
              {reviews.length === 0 && <p>No reviews yet.</p>}
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
