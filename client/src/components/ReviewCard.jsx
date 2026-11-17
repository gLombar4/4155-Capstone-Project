import Rating from '@mui/material/Rating';

export default function ReviewCard({ review, onEdit, onDelete }) {
    return (
        <li className="review-card">
            <div className="review-card-head">
                <span className="review-author">
                    {review.user_name || `User ${review.user_id}`}
                </span>
                <Rating
                    className="rating-stars"
                    value={review.stars}
                    readOnly
                    size="small"
                />
            </div>
            <p className="review-text">
                {review.written_review || 'No written review.'}
            </p>
            <div className="review-card-foot">
                <span className="review-date">
                    {new Date(review.created_at).toLocaleDateString()}
                </span>
                {onEdit && (
                    <div className="review-actions">
                        <button type="button" onClick={onEdit}>Edit</button>
                        <button type="button" onClick={onDelete}>Delete</button>
                    </div>
                )}
            </div>
        </li>
    );
}