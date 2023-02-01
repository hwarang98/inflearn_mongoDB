import { Router } from 'express';
import commentController from '../controllers/comment.js';

const commentRouter = Router({ mergeParams: true });

commentRouter.get('/', commentController.getComment);

commentRouter.post('/', commentController.postComment);

commentRouter.patch('/:commentId', commentController.patchComment);

commentRouter.delete('/:commentId', commentController.deleteComment);

export default commentRouter;
