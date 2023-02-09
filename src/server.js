import Express from 'express';
import mongoose from 'mongoose';
import router from './routers/index.js';
import generateFakeData from '../faker2.js';
import dotenv from 'dotenv';

dotenv.config();

const app = Express();
const port = 8080;

const server = async () => {
  try {
    const { MONGO_URI } = process.env;
    if (!MONGO_URI) throw new Error('MONGO_URI를 확인해주세요.');

    mongoose.set('strictQuery', false);
    // mongoose.set('debug', true);
    await mongoose.connect(MONGO_URI);

    console.log('MongoDB 연결 성공');

    app.use(Express.json());
    app.use(Express.urlencoded({ extended: false }));

    app.use(router);

    app.listen(port, async () => {
      console.log(`server listening on port ${port}`);
      console.time('insert Time: ');
      // await generateFakeData(10, 2, 10);
      console.timeEnd('insert Time: ');
    });
  } catch (error) {
    throw error;
  }
};

server();
