import { isValidObjectId } from 'mongoose';
import { UserScheam, BlogScheam } from '../models/index.js';

export default {
  async getAllBlog(req, res) {
    try {
      const blog = await BlogScheam.find({})
        .limit(20)
        .populate([{ path: 'user' }, { path: 'comments', populate: { path: 'user' } }]);
      return res.send({ blog });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: error.message });
    }
  },

  async getParamsBlogId(req, res) {
    try {
      const { blogId } = req.params;
      if (!isValidObjectId(blogId)) {
        return res.status(400).send({ error: 'blogId를 확인해주세요.' });
      }
      const blog = await BlogScheam.findById({ _id: blogId });
      return res.send({ blog });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: error.message });
    }
  },

  async postBlog(req, res) {
    try {
      const { title, content, isLive, userId } = req.body;
      if (typeof title !== 'string') res.status(400).send({ error: 'title을 입력해주세요.' });
      if (typeof content !== 'string') res.status(400).send({ error: 'content를 입력해주세요.' });
      if (isLive && typeof isLive !== 'boolean') res.status(400).send({ error: 'isLive는 boolean 입니다.' });
      if (!isValidObjectId(userId)) res.status(400).send({ error: 'ID를 확인해주세요.' });

      const user = await UserScheam.findById(userId);
      if (!user) res.status(400).send({ error: '해당 유저가 존재하지 않습니다.' });

      const blog = new BlogScheam({ ...req.body, user });
      await blog.save();
      return res.send({ blog });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: error.message });
    }
  },

  async putBlog(req, res) {
    try {
      const { title, content } = req.body;
      const { blogId } = req.params;
      if (!isValidObjectId(blogId)) {
        return res.status(400).send({ error: 'blogId를 확인해주세요.' });
      }

      if (typeof title !== 'string') {
        res.status(400).send({ error: 'title을 입력해주세요.' });
      }

      if (typeof content !== 'string') {
        res.status(400).send({ error: 'content를 입력해주세요.' });
      }

      const blog = await BlogScheam.findByIdAndUpdate({ _id: blogId }, { title, content }, { new: true });
      return res.send(blog);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: error.message });
    }
  },

  async patchBlog(req, res) {
    try {
      const { blogId } = req.params;
      const { isLive } = req.body;

      if (!isValidObjectId(blogId)) {
        return res.status(400).send({ error: 'blogId를 확인해주세요.' });
      }

      if (typeof isLive !== 'boolean') {
        return res.status(400).send({ error: 'isLive가 boolean값이 아닙니다' });
      }

      const blog = await BlogScheam.findByIdAndUpdate(blogId, { isLive }, { new: true });

      return res.send({ blog });
    } catch (error) {
      console.log(error);
      res.status(500).send({ error: error.message });
    }
  },
};
