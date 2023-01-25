import mongoose from 'mongoose';
import CommentService from '../service/comment.js';
import Comment from '../models/Comment.js';
import User from '../models/User.js';
import Blog from '../models/Blog.js';
import { isValidObjectId } from 'mongoose';

export default {
  async getComment(req, res) {
    return res.send(req.params);
  },

  async postBlog(req, res) {
    try {
      const { blogId } = req.params;
      const { content, userId } = req.body;
      if (!isValidObjectId(blogId)) return res.status(400).send({ error: 'blogId를 확인해주세요.' });
      if (!isValidObjectId(userId)) return res.status(400).send({ error: 'userId 확인해주세요.' });
      if (typeof content !== 'string') return res.status(400).send({ error: 'content를 확인해주세요.' });

      const [blog, user] = await Promise.all([
        await Blog.findByIdAndUpdate(blogId),
        await User.findByIdAndUpdate(userId),
      ]);

      if (!blog || !user) return res.status(400).send({ error: 'blog or user가 없습니다.' });
      if (!blog.isLive) res.status(400).send({ error: 'blog가 비공개 되어있습니다.' });
      const comment = new Comment({ content, user, blog });
      comment.save();
      return res.send({ comment });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },
};
