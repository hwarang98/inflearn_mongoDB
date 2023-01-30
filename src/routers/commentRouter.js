import { Router } from 'express';
import commentController from '../controllers/comment.js';

const commentRouter = Router({ mergeParams: true });

commentRouter.get('/', commentController.getComment);

commentRouter.post('/', commentController.postBlog);

commentRouter.patch('/:commentId', commentController.patchBlog);

export default commentRouter;
