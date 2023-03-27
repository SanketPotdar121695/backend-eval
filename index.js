const cors = require('cors');
const express = require('express');
const { connection, PORT } = require('./db');
const { postRouter } = require('./routes/post.routes');
const { userRouter } = require('./routes/user.routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use('/users', userRouter);
app.use('/posts', postRouter);

app.get('/', (req, res) => {
  res.status(200).send({ message: 'Welcome to LinkedIn Posts Database!' });
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log(err.message);
  }
  console.log(`App is running on port ${PORT}`);
});
