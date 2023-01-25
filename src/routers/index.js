import { Router } from 'express';
import blogRouter from './blogRouter.js';
import userRouter from './userRouter.js';

const router = Router();

router.use('/blog', blogRouter);
router.use('/user', userRouter);

export default router;
