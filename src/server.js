import Express from 'express';
import mongoose from 'mongoose';
import User from './models/User.js';

const app = Express();
const port = 3000;

const users = [];
const MONGO_URL =
  'mongodb+srv://hwarang:rmawjdrn12@mongodbtutorlal.yty5hfi.mongodb.net/BlogService?retryWrites=true&w=majority';

const server = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(MONGO_URL);
    console.log('MongoDB 연결 성공');
    app.use(Express.json());

    app.get('/user', async (req, res) => {
      try {
        const users = await User.find({});
        return res.send({ users });
      } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error.message });
      }
    });

    app.get('/user/:userId', async (req, res) => {
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
    });

    app.post('/user', async (req, res) => {
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
    });

    app.delete('/user/:userId', async (req, res) => {
      try {
        const { userId } = req.params;
        if (!mongoose.isValidObjectId(userId)) {
          return res.status(400).send({ error: 'invaild userId' });
        }
        const user = await User.findOneAndDelete({ userId });
        return res.send({ user });
      } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error.message });
      }
    });

    app.patch('/user/:userId', async (req, res) => {
      try {
        const { userId } = req.params;
        const { age } = req.body;
        if (!mongoose.isValidObjectId(userId) || typeof age === 'string') {
          return res.status(400).send({ error: '입력값을 확인해 주세요.' });
        }

        console.log(typeof age);
        const user = await User.findByIdAndUpdate(
          userId,
          { $set: { age } },
          { new: true }
        );
        return res.send(user);
      } catch (error) {
        console.log(error);
        return res.status(500).send({ error: error.message });
      }
    });

    app.listen(port, () => {
      console.log(`server listening on port ${port}`);
    });
  } catch (error) {
    throw error;
  }
};

server();
