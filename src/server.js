import Express from 'express';
import mongoose from 'mongoose';
import router from './routers/index.js';
import generateFakeData from '../faker.js';

const app = Express();
const port = 8080;

const MONGO_URL =
  'mongodb+srv://hwarang:rmawjdrn12@mongodbtutorlal.yty5hfi.mongodb.net/BlogService?retryWrites=true&w=majority';

const server = async () => {
  try {
    mongoose.set('strictQuery', false);
    mongoose.set('debug', true);
    await mongoose.connect(MONGO_URL);

    // 목업 데이터 db save
    // await generateFakeData(100, 10, 300);
    console.log('MongoDB 연결 성공');

    app.use(Express.json());
    app.use(router);

    app.listen(port, () => {
      console.log(`server listening on port ${port}`);
    });
  } catch (error) {
    throw error;
  }
};

server();
