import express from 'express';
import { signUpHandler, logInHandler } from '../controllers/authController.js';
import { validateSignup, validateUser } from '../middleware/userValidators.js';
import logInLimiter from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/signup', validateSignup, signUpHandler);
router.post('/login', logInLimiter, validateUser, logInHandler);

export default router;