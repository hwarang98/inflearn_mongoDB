import { UserScheam, BlogScheam, CommentScheam } from '../models/index.js';
import { isValidObjectId, startSession } from 'mongoose';
import Blog from '../models/Blog.js';

export default {
  async getComment(req, res) {
    let { page } = req.query;
    page = parseInt(page);
    const { blogId } = req.params;
    if (!isValidObjectId(blogId)) return res.status(400).send({ error: 'blogId를 확인해주세요.' });

    const comments = await CommentScheam.find({ blog: blogId })
      .sort({ createAt: -1 })
      .skip(page * 3)
      .limit(3);
    return res.send({ comments });
  },

  async postComment(req, res) {
    const session = await startSession();
    let comment;
    try {
      await session.withTransaction(async () => {
        const { blogId } = req.params;
        const { content, userId } = req.body;
        if (!isValidObjectId(blogId)) return res.status(400).send({ error: 'blogId를 확인해주세요.' });
        if (!isValidObjectId(userId)) return res.status(400).send({ error: 'userId 확인해주세요.' });
        if (typeof content !== 'string') return res.status(400).send({ error: 'content를 확인해주세요.' });

        const [blog, user] = await Promise.all([
          BlogScheam.findById(blogId, {}, { session }), // find에도 꼭 session 을 넣을것!
          UserScheam.findById(userId, {}, { session }),
        ]);

        if (!blog || !user) return res.status(400).send({ error: 'blog or user가 없습니다.' });
        if (!blog.isLive) return res.status(400).send({ error: 'blog가 비공개 되어있습니다.' });
        comment = new CommentScheam({
          content,
          user,
          userFullName: `${user.name.first} ${user.name.last}`,
          blog: blogId,
        });

        // await Promise.all([comment.save(), Blog.updateOne({ _id: blogId }, { $push: { comment: comment } })]);

        blog.commentCount++;
        blog.comment.push(comment);
        if (blog.commentCount > 3) blog.comment.shift();

        await Promise.all([comment.save({ session }), blog.save()]); // blog에는 find 할때 session을 넣어줬기때문에 내장되있어서 필요없음
      });

      return res.send({ comment });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    } finally {
      await session.endSession;
    }
  },

  async patchComment(req, res) {
    try {
      const { commentId } = req.params;
      const { content } = req.body;

      if (typeof content !== 'string') return res.status(400).send({ error: 'content는 필수입니다' });

      const [comment] = await Promise.all([
        CommentScheam.findOneAndUpdate({ _id: commentId }, { content }, { new: true }),
        Blog.updateOne({ 'comment._id': commentId }, { 'comment.$.content': content }),
      ]);
      return res.send({ comment });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },

  async deleteComment(req, res) {
    const { commentId } = req.params;
    const comment = await CommentScheam.findByIdAndDelete({ _id: commentId });

    await BlogScheam.updateOne({ 'comment._id': commentId }, { $pull: { comment: { _id: commentId } } });

    return res.send({ comment });
  },
};
