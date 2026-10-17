import express from 'express';
import * as reviewController from '../controllers/reviewController.js';


const router = express.Router();

router.get(
    '/',
    reviewController.getAllReviewsHandler,
);

export default router;