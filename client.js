import axios from 'axios';

const URL = 'http://localhost:8080';

const test = async () => {
  console.time('성능 측정: ');
  const blogsList = await axios.get(`${URL}/blog`);
  let blogs = blogsList.data.blog;
  // console.dir(blogs[3], { depth: 10 });

  // blogs = await Promise.all(
  //   blogs.map(async (blog) => {
  //     const [res1, res2] = await Promise.all([
  //       axios.get(`${URL}/blog/${blog.user}`),
  //       axios.get(`${URL}/blog/${blog._id}/comment`),
  //     ]);
  //     blog.user = res1.data.user;
  //     blog.comment = await Promise.all(
  //       res2.data.comments.map(async (comment) => {
  //         const {
  //           data: { user },
  //         } = await axios.get(`${URL}/user/${comment.user}`);
  //         comment.user = user;
  //         return comment;
  //       })
  //     );
  //     return blog;
  //   })
  // );
  console.timeEnd('성능 측정: ');
};

const testGroup = async () => {
  await test();
  await test();
  await test();
  await test();
  await test();
};

testGroup();
