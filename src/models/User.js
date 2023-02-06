import { Schema, model } from 'mongoose';

const UserScheam = new Schema(
  {
    username: { type: String, required: true, unique: true },
    name: {
      first: { type: String, required: true },
      last: { type: String, required: true },
    },
    age: { type: Number, index: true },
    email: String,
  },
  { timestamps: true }
);

const User = model('user', UserScheam);

export default User;
