import express from 'express';
import * as userController from '../controllers/userController.js';


const router = express.Router();

router.get(
    '/',
    userController.getAllUsersHandler,
);

router.get(
    '/:id',
    userController.getUserByIdHandler
);

router.post(
    '/',
    userController.createUserHandler
);

router.put(
    '/:id',
    userController.updateUserHandler
);

// router.delete(
//     '/:id',
//     userController.deleteUserHandler
// );

export default router;