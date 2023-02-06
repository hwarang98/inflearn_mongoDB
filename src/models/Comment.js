import { Schema, model, Types } from 'mongoose';

const CommentScheam = new Schema(
  {
    content: { type: String, required: true },
    user: { type: Types.ObjectId, required: true, ref: 'user', index: true },
    userFullName: { type: String, required: true },
    blog: { type: Types.ObjectId, required: true, ref: 'blog' },
  },
  { timestamps: true }
);

CommentScheam.index({ blog: 1, createAt: -1 });

const Comment = model('comment', CommentScheam);

export default Comment;
