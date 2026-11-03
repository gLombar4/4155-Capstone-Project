import * as reviewServices from '../services/reviewServices.js'

export async function getAllReviewsHandler(req, res){
    try{
        const users = await reviewServices.getAllReviews(req.user);
        res.status(200).json(users);
    }catch(error){
        res.status(error.status || 500).json({"error": "Uh Oh"});
    }
}

export async function getReviewHandler(req, res) {
  try {
    const review = await reviewServices.getReview(
      Number(req.params.gameId),
      Number(req.params.userId),
    );
    res.status(200).json(review);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
}

export async function getReviewsByGameHandler(req, res) {
  try {
    const reviews = await reviewServices.getReviewsByGame(Number(req.params.gameId));
    res.status(200).json(reviews);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
}

export async function getReviewsByUserHandler(req, res) {
  try {
    const reviews = await reviewServices.getReviewsByUser(Number(req.params.userId));
    res.status(200).json(reviews);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
}

export async function createReviewHandler(req, res) {
  try {
    // Relies on auth middleware; does not verify user_id in the body matches the logged-in user
    const newReview = await reviewServices.createReview(req.body);
    res.status(201).json(newReview);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
}

export async function updateReviewHandler(req, res) {
  try {
    // Relies on auth middleware; does not verify the caller owns this review
    const updated = await reviewServices.updateReview(
      Number(req.params.gameId),
      Number(req.params.userId),
      req.body,
    );
    res.status(200).json(updated);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
}

export async function deleteReviewHandler(req, res) {
  try {
    // Relies on auth middleware; does not verify the caller owns this review
    const deleted = await reviewServices.deleteReview(
      Number(req.params.gameId),
      Number(req.params.userId),
    );
    res.status(200).json(deleted);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
}