import { Router } from 'express';
import blogRouter from './blogRouter.js';
import userRouter from './userRouter.js';
import commentRouter from './commentRouter.js';

const router = Router();

router.use('/user', userRouter);
router.use('/blog', blogRouter);
router.use('/blog/:blogId/comment', commentRouter);

export default router;
