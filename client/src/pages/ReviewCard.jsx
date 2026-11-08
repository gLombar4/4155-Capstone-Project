// Profile review card
export default function ReviewCard({ review }) {
  return (
    <article className="review-card">
      <div className="review-card-top">
        <h3>{review.game}</h3>
        <span className="review-rating">{review.rating}/10</span>
      </div>
      <p>{review.body}</p>
      <small>{review.created_at}</small>
    </article>
  );
}