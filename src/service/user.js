import mongoose from 'mongoose';
import user from '../controllers/user.js';
import User from '../models/User.js';

export default class UserService {
  getAllUser() {
    return User.find({});
  }

  getUser(userId) {
    if (!mongoose.isValidObjectId(userId)) {
      return null;
    }

    return User.findOne({ _id: userId });
  }

  deleteUserById(userId) {
    if (!mongoose.isValidObjectId(userId)) {
      return null;
    }

    return User.findOneAndDelete({ _id: userId });
  }

  findById(userId) {
    if (!mongoose.isValidObjectId(userId)) {
      return null;
    }
    User.findById(userId);
  }
}
