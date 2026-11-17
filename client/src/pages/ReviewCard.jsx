import fallbackCover from "../assets/ncf.png";

// Profile review card
export default function ReviewCard({ review, game, cover }) {
  const coverUrl = cover?.url
    ? cover.url.replace(/^\/\//, "https://").replace(/t_thumb/, "t_cover_big")
    : fallbackCover;
  const createdAt = review.created_at ? new Date(review.created_at) : null;
  const reviewDate =
    createdAt && !Number.isNaN(createdAt.getTime())
      ? createdAt.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : null;

  return (
    <article className="review-card">
      <img
        className="review-card-cover"
        src={coverUrl}
        onError={(event) => {
          event.currentTarget.onerror = null;
          event.currentTarget.src = fallbackCover;
        }}
        alt={game?.name ? `${game.name} cover` : "Game cover"}
      />
      <div className="review-card-content">
        <div className="review-card-top">
          <h3>{game?.name || `Game ${review.game_id}`}</h3>
          <span className="review-rating">{review.stars}/5</span>
        </div>
        <p>{review.written_review}</p>
        {reviewDate && (
          <small>
            <time dateTime={review.created_at}>{reviewDate}</time>
          </small>
        )}
      </div>
    </article>
  );
}