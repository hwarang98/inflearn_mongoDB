import Express from 'express';
const app = Express();
const port = 3000;

const users = [];

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
