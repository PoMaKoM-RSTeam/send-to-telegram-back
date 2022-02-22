import { Router } from 'express';
import PostController from '../controllers/postController';
import authMiddleware from '../middleware/authMiddleware';

const postRouter = Router();
postRouter.get('/postsCalendar', authMiddleware, PostController.getPostsCalendar);
postRouter.post('/set', authMiddleware, PostController.setPost);
export default postRouter;
