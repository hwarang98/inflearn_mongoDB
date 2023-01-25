import { Router } from 'express';
import blogControllers from '../controllers/blog.js';

const blogRouter = Router();

blogRouter.get('/', blogControllers.getAllBlog);
blogRouter.get('/:blogId', blogControllers.getParamsBlogId);

blogRouter.post('/', blogControllers.postBlog);

blogRouter.put('/:blogId', blogControllers.putBlog);

blogRouter.patch('/:blogId/live', blogControllers.patchBlog);

export default blogRouter;
