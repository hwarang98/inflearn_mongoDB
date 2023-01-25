import { Router } from 'express';
import mongoose from 'mongoose';
import userController from '../controllers/user.js';

const userRouter = Router();

userRouter.get('/', userController.getUser);
userRouter.get('/:userId', userController.getParamsUser);

userRouter.post('/', userController.postUser);

userRouter.delete('/:userId', userController.deleteUser);

userRouter.patch('/:userId', userController.patchUser);

export default userRouter;
