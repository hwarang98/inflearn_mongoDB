import { Schema, model, Types } from 'mongoose';
import comment from './Comment.js';

const BlogScheam = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    isLive: { type: Boolean, required: true, default: false }, // 임시저장 false 면 임시저장, true면 유저한테 노출
    user: {
      _id: { type: Types.ObjectId, required: true, ref: 'user' },
      username: { type: String, required: true },
      name: {
        first: { type: String, required: true },
        last: { type: String, required: true },
      },
    },
    comment: { type: [comment.schema] },
  },
  { timestamps: true, versionKey: false }
);

// BlogScheam.virtual('comments', {
//   ref: 'comment',
//   localField: '_id',
//   foreignField: 'blog',
// });

// BlogScheam.set('toObject', { virtuals: true });
// BlogScheam.set('toJson', { virtuals: true });

const Blog = model('blog', BlogScheam);

export default Blog;
