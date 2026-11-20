import Rating from "@mui/material/Rating";
import fallbackCover from "../assets/ncf.png";

export default function ProfileReviewCard({ review, game, cover }) {
  const coverUrl = cover?.url
    ? cover.url.replace(/^\/\//, "https://").replace(/t_thumb/, "t_cover_big")
    : fallbackCover;
  const createdAt = review.created_at ? new Date(review.created_at) : null;
  const reviewDate =
    createdAt && !Number.isNaN(createdAt.getTime())
      ? createdAt.toLocaleDateString()
      : null;

  return (
    <li className="review-card profile-review-card">
      <img
        className="review-card-cover"
        src={coverUrl}
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = fallbackCover;
        }}
        alt={game?.name ? `${game.name} cover` : "Game cover"}
      />
      <div className="profile-review-card-content">
        <div className="review-card-head">
          <span className="review-author">
            {game?.name || `Game ${review.game_id}`}
          </span>
          <Rating
            className="rating-stars"
            value={review.stars}
            readOnly
            size="small"
          />
        </div>
        <p className="review-text">
          {review.written_review || "No written review."}
        </p>
        <div className="review-card-foot">
          {reviewDate && (
            <time className="review-date" dateTime={review.created_at}>
              {reviewDate}
            </time>
          )}
        </div>
      </div>
    </li>
  );
}