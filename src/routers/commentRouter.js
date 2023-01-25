import { Router } from 'express';
import commentController from '../controllers/comment.js';

const commentRouter = Router({ mergeParams: true });

commentRouter.get('/:commentId', commentController.getComment);

commentRouter.post('/', commentController.postBlog);

export default commentRouter;
