import Express from 'express';
import mongoose from 'mongoose';
import router from './routers/index.js';
import generateFakeData from '../faker2.js';

const app = Express();
const port = 8080;

const MONGO_URL =
  'mongodb+srv://hwarang:rmawjdrn12@mongodbtutorlal.yty5hfi.mongodb.net/BlogService?retryWrites=true&w=majority';

const server = async () => {
  try {
    mongoose.set('strictQuery', false);
    // mongoose.set('debug', true);
    await mongoose.connect(MONGO_URL);

    // 목업 데이터 db save

    console.log('MongoDB 연결 성공');

    app.use(Express.json());
    app.use(router);

    app.listen(port, async () => {
      console.log(`server listening on port ${port}`);
      // for (let i = 0; i < 20; i++) {
      //   await generateFakeData(10, 1, 10);
      // }
    });
  } catch (error) {
    throw error;
  }
};

server();
