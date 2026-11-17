import { useEffect, useState } from 'react';
import ReviewCard from './ReviewCard';
import ReviewForm from './ReviewForm';
import { API_URL } from '../api';
import './Reviews.css';

export default function Reviews({ gameId }) {
    const [reviews, setReviews] = useState([]);
    const [myReview, setMyReview] = useState(null);
    const [editing, setEditing] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const userId = localStorage.getItem('user_id');

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const [reviewResponse, userResponse] = await Promise.all([
                    fetch(`${API_URL}/reviews/game/${gameId}`),
                    fetch(`${API_URL}/users`),
                ]);

                const [reviewData, userData] = await Promise.all([
                    reviewResponse.json(),
                    userResponse.json(),
                ]);

                // Reviews only store user_id, so match the names from the users table
                const names = {};
                userData.forEach((user) => {
                    names[user.user_id] = user.user_name;
                });

                const mine = reviewData.find(
                    (review) => review.user_id === Number(userId),
                );

                const others = reviewData
                    .filter((review) => review.user_id !== Number(userId))
                    .sort(() => Math.random() - 0.5)
                    .slice(0, 5);

                setReviews(
                    others.map((review) => ({
                        ...review,
                        user_name: names[review.user_id],
                    })),
                );

                setMyReview(
                    mine ? { ...mine, user_name: names[mine.user_id] } : null,
                );
            } catch (error) {
                console.log(error);
                setReviews([]);
            }
        };

        fetchReviews();
    }, [gameId, refresh, userId]);

    const reload = () => {
        setEditing(false);
        setRefresh(refresh + 1);
    };

    const handleDelete = async () => {
        await fetch(`${API_URL}/reviews/${gameId}/${userId}`, {
            method: 'DELETE',
        });
        reload();
    };

    return (
        <section className="reviews">
            <h2>Reviews</h2>

            {!userId && <p className="reviews-empty">Log in to leave a review.</p>}

            {userId && !myReview && (
                <ReviewForm gameId={gameId} userId={userId} onSaved={reload} />
            )}

            {userId && myReview && editing && (
                <ReviewForm
                    gameId={gameId}
                    userId={userId}
                    existing={myReview}
                    onSaved={reload}
                    onCancel={() => setEditing(false)}
                />
            )}

            {(myReview || reviews.length > 0) && (
                <ul className="review-list">
                    {myReview && !editing && (
                        <ReviewCard
                            review={myReview}
                            onEdit={() => setEditing(true)}
                            onDelete={handleDelete}
                        />
                    )}
                    {reviews.map((review) => (
                        <ReviewCard
                            key={`${review.game_id}-${review.user_id}`}
                            review={review}
                        />
                    ))}
                </ul>
            )}

            {!myReview && reviews.length === 0 && (
                <p className="reviews-empty">No reviews yet.</p>
            )}
        </section>
    );
}