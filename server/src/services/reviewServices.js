import * as reviewRepo from "../repositories/reviewRepo.js";

// Miscellaneous error handler
function httpError(message, status) {
  const err = new Error(message);
  err.status = status;
  return err;
}

export async function getAllReviews(){
    return await reviewRepo.getAllReviews();
}

export async function getReview(gameId, userId) {
  const reviews = await reviewRepo.getReview(gameId, userId);
  if (reviews?.length == 0) {
    throw httpError(`Cannot find review for game ${gameId} by user ${userId}`, 404);
  }
  return reviews[0];
}

//Returns empty array if no reviews found for the given gameId
export async function getReviewsByGame(gameId) {
  return await reviewRepo.getReviewsByGame(gameId);
}

//Returns empty array if no reviews found for the given userId
export async function getReviewsByUser(userId) {
  return await reviewRepo.getReviewsByUser(userId);
}

export async function createReview(data) {
  const { game_id, user_id, stars, written_review } = data ?? {};
  try {
    const created = await reviewRepo.createReview({ game_id, user_id, stars, written_review });
    return created[0];
  } catch (error) {
    // 23505 is Postgres's "unique violation": this user already reviewed this game
    if (error.code === "23505") throw httpError("You have already reviewed this game", 409);
    throw error;
  }
}

export async function updateReview(gameId, userId, data) {
  const { stars, written_review } = data ?? {};
  const updated = await reviewRepo.updateReview(gameId, userId, { stars, written_review });
  if (updated?.length == 0) {
    throw httpError(`Cannot find review for game ${gameId} by user ${userId}`, 404);
  }
  return updated[0];
}

export async function deleteReview(gameId, userId) {
  const deleted = await reviewRepo.deleteReview(gameId, userId);
  if (deleted?.length == 0) {
    throw httpError(`Cannot find review for game ${gameId} by user ${userId}`, 404);
  }
  return deleted[0];
}