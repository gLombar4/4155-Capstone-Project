import { useState } from 'react';
import BasicRating from './Rating';
import { API_URL } from '../api';

export default function ReviewForm({ gameId, userId, existing, onSaved, onCancel }) {
    const [stars, setStars] = useState(existing ? existing.stars : 0);
    const [writtenReview, setWrittenReview] = useState(
        existing ? existing.written_review || '' : '',
    );
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (!stars) {
            setError('Pick a star rating first.');
            return;
        }

        const url = existing
            ? `${API_URL}/reviews/${gameId}/${userId}`
            : `${API_URL}/reviews`;

        const response = await fetch(url, {
            method: existing ? 'PUT' : 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                game_id: Number(gameId),
                user_id: Number(userId),
                stars: stars,
                written_review: writtenReview,
            }),
        });

        if (!response.ok) {
            setError('Could not save your review. Please try again.');
            return;
        }

        onSaved();
    };

    return (
        <form className="review-form" onSubmit={handleSubmit}>
            <BasicRating value={stars} onChange={setStars} />
            <textarea
                className="review-input"
                value={writtenReview}
                onChange={(event) => setWrittenReview(event.target.value)}
                placeholder="Write your review..."
                maxLength={500}
            />
            {error && <p className="review-error">{error}</p>}
            <div className="review-form-buttons">
                <button type="submit">{existing ? 'Save' : 'Post review'}</button>
                {existing && (
                    <button type="button" className="review-cancel" onClick={onCancel}>
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}