import { Router } from 'express';
import { mongoose, isValidObjectId } from 'mongoose';
import Blog from '../models/Blog.js';
import User from '../models/User.js';
const blogRouter = Router();

blogRouter.get('/', async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

blogRouter.get('/:blogId', async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

blogRouter.post('/', async (req, res) => {
  try {
    const { title, content, isLive, userId } = req.body;
    if (typeof title !== 'string') res.status(400).send({ error: 'title을 입력해주세요.' });
    if (typeof content !== 'string') res.status(400).send({ error: 'content를 입력해주세요.' });
    if (isLive && typeof isLive !== 'string') res.status(400).send({ error: 'isLive는 boolean 입니다.' });
    if (!isValidObjectId(userId)) res.status(400).send({ error: 'ID를 확인해주세요.' });

    const user = await User.findById(userId);
    if (!user) res.status(400).send({ error: '해당 유저가 존재하지 않습니다.' });

    const blog = new Blog({ ...req.body, user });
    await blog.save();
    return res.send({ blog });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

blogRouter.put('/', async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

blogRouter.patch('/:blogId/live', async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

export default blogRouter;
