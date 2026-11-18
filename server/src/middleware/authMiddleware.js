import { getUserByName } from '../repositories/userRepo.js';
import jwt from 'jsonwebtoken';
//Authenticate user by their username/pw
export function authenticateUser(req, res, next) {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
        return res.status(401).json({
            error: 'Authentication required'
        });
    }

    const token = authorization.slice(7);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            user_id: decoded.id,
            role: decoded.role
        };

        next();
    } catch (error) {
        return res.status(401).json({
            error: 'Invalid or expired token'
        });
    }
}

//Check whether function has allowed role
export function authorizedRoles(...allowedRoles) {
    return (req, res, next) => {
        if(!req.user) {
            return res.status(401).json({
                error: 'Authentication required'
            });
        }
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                error: 'Access denied'
            });
        }
        next();
    };
}

//Check logged-in user owns the review
export function authorizeReviewOwner(req, res, next) {
    if(!req.user) {
        return res.status(401).json({
            error: 'Authentication required'
        });
    }

    const reviewUserId = Number(
        req.params.userId ?? req.body?.user_id
    );
    if (!Number.isInteger(reviewUserId)) {
        return res.status(400).json({
            error: 'Invalid review user ID'
        });
    }
    if (
        req.user.role === 'admin' || 
        Number(req.user.user_id) === reviewUserId
        ) {
            return next();
        }
    return res.status(403).json({
        error: 'You do not own this review'
    });             
}