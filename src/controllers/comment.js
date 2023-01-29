import { UserScheam, BlogScheam, CommentScheam } from '../models/index.js';
import { isValidObjectId } from 'mongoose';
import Blog from '../models/Blog.js';

export default {
  async getComment(req, res) {
    const { blogId } = req.params;
    if (!isValidObjectId(blogId)) return res.status(400).send({ error: 'blogId를 확인해주세요.' });
    console.log(req.params);
    const comments = await CommentScheam.find({ blog: blogId }).limit(1);
    return res.send({ comments });
  },

  async postBlog(req, res) {
    try {
      const { blogId } = req.params;
      const { content, userId } = req.body;
      if (!isValidObjectId(blogId)) return res.status(400).send({ error: 'blogId를 확인해주세요.' });
      if (!isValidObjectId(userId)) return res.status(400).send({ error: 'userId 확인해주세요.' });
      if (typeof content !== 'string') return res.status(400).send({ error: 'content를 확인해주세요.' });

      const [blog, user] = await Promise.all([await BlogScheam.findById(blogId), await UserScheam.findById(userId)]);
      console.log(blog);

      if (!blog || !user) return res.status(400).send({ error: 'blog or user가 없습니다.' });
      if (!blog.isLive) return res.status(400).send({ error: 'blog가 비공개 되어있습니다.' });
      const comment = new CommentScheam({ content, user, blog });

      await Promise.all([comment.save(), Blog.updateOne({ _id: blogId }, { $push: { comments: comment } })]);
      return res.send({ comment });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },
};
