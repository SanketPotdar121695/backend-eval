const { Router } = require('express');
const { authRequired } = require('../middlewares/auth.middleware');
const { PostModel } = require('../models/post.model');

const postRouter = Router();

// Authorization middleware
postRouter.use(authRequired);

// POST request
postRouter.post('/add', async (req, res) => {
  try {
    let post = new PostModel(req.body);
    await post.save();
    res
      .status(200)
      .send({ message: 'New post has been added in the database.' });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// GET request (simple)
postRouter.get('/', async (req, res) => {
  let { min, max, page } = req.query,
    posts;
  try {
    if (min && max) {
      posts = await PostModel.find({
        no_of_comments: { $gte: min, $lte: max }
      }).limit(3);
      res.status(200).send(posts);
    }
    posts = await PostModel.find({ userID: req.body.userID }).limit(3).skip(3);
    res.status(200).send(posts);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// GET request (with added functionalities)
postRouter.get('/top', async (req, res) => {
  try {
    let posts = await PostModel.find({
      userID: req.body.userID
    })
      .sort({ no_of_comments: -1 })
      .limit(1);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// PUT/PATCH request
postRouter.patch('/update/:postID', async (req, res) => {
  let updates = req.body;
  let { postID } = req.params;

  try {
    let posts = await PostModel.find({ userID: req.body.userID }).findById(
      postID
    );
    if (posts !== undefined) {
      await PostModel.findByIdAndUpdate(postID, updates);
      res.status(200).send({ message: 'Post has been updated successfully!' });
    } else
      res
        .status(400)
        .send({ message: 'Access denied: You are not authorized !' });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// DELETE request
postRouter.delete('/delete/:postID', async (req, res) => {
  let { postID } = req.params;

  try {
    let posts = await PostModel.find({ userID: req.body.userID }).findById(
      postID
    );
    if (posts !== undefined) {
      await PostModel.findByIdAndDelete(postID);
      res.status(200).send({ message: 'Post has been deleted successfully!' });
    } else
      res
        .status(400)
        .send({ message: 'Access denied: You are not authorized !' });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = { postRouter };
