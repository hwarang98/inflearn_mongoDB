import Express from 'express';
import mongoose from 'mongoose';

const app = Express();
const port = 3000;

const users = [];
const MONGO_URL =
  'mongodb+srv://hwarang:rmawjdrn12@mongodbtutorlal.yty5hfi.mongodb.net/BlogService?retryWrites=true&w=majority';

const server = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log('MongoDB 연결 성공');
    app.use(Express.json());

    app.get('/user', (req, res) => {
      return res.send({ users: users });
    });

    app.post('/user', (req, res) => {
      const { name, age } = req.body;
      users.push({ name: name, age: age });
      return res.send('success');
    });

    app.listen(port, () => {
      console.log(`server listening on port ${port}`);
    });
  } catch (error) {
    throw error;
  }
};

server();
