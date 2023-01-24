import { Schema, model } from 'mongoose';

const UsetScheam = new Schema(
  {
    username: { type: String, require: true, unique: true },
    name: {
      first: { type: String, require: true },
      last: { type: String, require: true },
    },
    age: Number,
    email: String,
  },
  { timestamps: true }
);

const User = model('user', UsetScheam);

export default User;
