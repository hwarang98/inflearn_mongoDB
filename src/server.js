import Express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';

const app = Express();
const port = 3000;

const MONGO_URL =
  'mongodb+srv://hwarang:rmawjdrn12@mongodbtutorlal.yty5hfi.mongodb.net/BlogService?retryWrites=true&w=majority';

const server = async () => {
  try {
    mongoose.set('strictQuery', false);
    mongoose.set('debug', true);
    await mongoose.connect(MONGO_URL);
    console.log('MongoDB 연결 성공');
    app.use(Express.json());

    app.use('/user', userRouter);

    app.listen(port, () => {
      console.log(`server listening on port ${port}`);
    });
  } catch (error) {
    throw error;
  }
};

server();
