import express from 'express';
import * as reviewController from '../controllers/reviewController.js';


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
    reviewController.createReviewHandler
);

router.put("/:gameId/:userId", 
    reviewController.updateReviewHandler
);

router.delete("/:gameId/:userId", 
    reviewController.deleteReviewHandler
);

export default router;