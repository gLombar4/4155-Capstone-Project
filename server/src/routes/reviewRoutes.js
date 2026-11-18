import express from 'express';
import * as reviewController from '../controllers/reviewController.js';
import { authenticateUser, authorizeReviewOwner } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get(
    '/',
    reviewController.getAllReviewsHandler,
);

//These two must always be above the "/:gameId/:userId" route so they don't get swallowed by it
router.get("/game/:gameId", 
    reviewController.getReviewsByGameHandler
);
router.get("/user/:userId", 
    reviewController.getReviewsByUserHandler
);


router.get("/:gameId/:userId", 
    reviewController.getReviewHandler
);

router.post(
    "/", 
    authenticateUser,
    authorizeReviewOwner,
    reviewController.createReviewHandler
);

router.put("/:gameId/:userId", 
    authenticteUser,
    authorizeReviewOwner,
    reviewController.updateReviewHandler
);

router.delete("/:gameId/:userId", 
    authenticateUser,
    authorizeReviewOwner,
    reviewController.deleteReviewHandler
);

export default router;