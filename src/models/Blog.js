import { Schema, model, Types } from 'mongoose';

const BlogScheam = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    isLive: { type: Boolean, required: true, default: false }, // 임시저장 false 면 임시저장, true면 유저한테 노출
    user: { type: Types.ObjectId, required: true, ref: 'user' },
  },
  { timestamps: true }
);

BlogScheam.virtual('comments', {
  ref: 'comment',
  localField: '_id',
  foreignField: 'blog',
});

BlogScheam.set('toObject', { virtuals: true });
BlogScheam.set('toJson', { virtuals: true });

const Blog = model('blog', BlogScheam);

export default Blog;
