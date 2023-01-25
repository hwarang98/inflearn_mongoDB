import mongoose from 'mongoose';
import User from '../models/User.js';

export default {
  async getUser(req, res) {
    try {
      const users = await User.find({});
      return res.send({ users });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  },

  async getParamsUser(req, res) {
    try {
      const { userId } = req.params;
      if (!mongoose.isValidObjectId(userId)) {
        return res.status(400).send({ error: 'invaild userId' });
      }

      const user = await User.findOne({ _id: userId });
      return res.send({ user });
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

      const user = new User(req.body);
      await user.save();
      return res.send({ user });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  },

  async deleteUser(req, res) {
    try {
      const { userId } = req.params;
      if (!mongoose.isValidObjectId(userId)) {
        return res.status(400).send({ error: 'invaild userId' });
      }

      const user = await User.findOneAndDelete({ _id: Object(userId) });

      return res.send({ user });
    } catch (error) {
      console.log(error);
      return res.status(500).send({ error: error.message });
    }
  },

  async patchUser(req, res) {
    try {
      const { userId } = req.params;
      const { age, name } = req.body;

      if (!mongoose.isValidObjectId(userId))
        return res.status(400).send({ error: '입력값을 확인해 주세요.' });

      if (!age && !name)
        return res.status(400).send({ err: '나이 또는 이름을 입력해주세요' });

      if (age && typeof age !== 'number')
        return res.status(400).send({ err: 'age는 숫자여야 합니다.' });

      if (
        name &&
        typeof name.first !== 'string' &&
        typeof name.last !== 'string'
      ) {
        return res.status(400).send({ err: '성 또는 이름을 입력해 주세요.' });
      }

      let user = await User.findById(userId);
      console.log({ userBeforeEdit: user });
      if (age) user.age = age;
      if (name) user.name = name;
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
