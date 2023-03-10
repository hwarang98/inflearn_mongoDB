import mongoose from 'mongoose';
import UserService from '../service/user.js';
import { UserScheam, BlogScheam, CommentScheam } from '../models/index.js';

export default {
  async getUser(req, res) {
    try {
      const user = new UserService();
      const getAllusers = await user.getAllUser();

      return res.send({ getAllusers });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  },

  async getParamsUser(req, res) {
    try {
      const user = new UserService();
      const { userId } = req.params;

      const getUser = await user.getUser(userId);

      if (getUser === null) return 'userId를 확인해주세요!';

      return res.send({ getUser });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  },

  async postUser(req, res) {
    try {
      const { username, name } = req.body;
      if (!username) {
        return res.status(400).send({ err: '이름을 입력해주세요.' });
      }
      if (!name || !name.first || !name.last) {
        return res.status(400).send({ err: '성 or 이름을 입력해주세요.' });
      }

      const user = new UserScheam(req.body);
      await user.save();
      return res.send({ user });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  },

  async deleteUser(req, res) {
    try {
      const user = new UserService();
      const { userId } = req.params;

      const [userDelete] = await Promise.all([
        user.deleteUserById(userId),
        BlogScheam.deleteMany({ 'user._id': userId }),
        BlogScheam.updateMany({ 'comment.user': userId }, { $pull: { comment: { user: userId } } }),
        CommentScheam.updateMany({ user: userId }),
      ]);
      return res.send({ userDelete });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  },

  async patchUser(req, res) {
    try {
      const { userId } = req.params;
      const { age, name } = req.body;

      if (!mongoose.isValidObjectId(userId)) return res.status(400).send({ error: '입력값을 확인해 주세요.' });

      if (!age && !name) return res.status(400).send({ err: '나이 또는 이름을 입력해주세요' });

      if (age && typeof age !== 'number') return res.status(400).send({ err: 'age는 숫자여야 합니다.' });

      if (name && typeof name.first !== 'string' && typeof name.last !== 'string') {
        return res.status(400).send({ err: '성 또는 이름을 입력해 주세요.' });
      }

      let user = await UserScheam.findById(userId);
      console.log({ userBeforeEdit: user });
      if (age) user.age = age;
      if (name) {
        user.name = name;
        await Promise.all([
          BlogScheam.updateMany({ 'user._id': userId }, { 'user.name': name }),
          BlogScheam.updateMany(
            {},
            { 'comment.$[comment].userFullName': `${name.first} ${name.last}` },
            { arrayFilters: [{ 'comment.user': userId }] }
          ),
        ]);
      }
      console.log({ userAfterEdit: user });
      await user.save();

      console.log(user);
      return res.send(user);
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  },
};
