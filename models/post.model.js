const mongoose = require('mongoose');

// Post schema
const postSchema = mongoose.Schema(
  {
    title: String,
    body: String,
    device: ['Laptop', 'Tablet', 'Mobile'],
    no_of_comments: Number
  },
  {
    versionKey: false
  }
);

// Post model
const PostModel = mongoose.model('post', postSchema);

module.exports = { PostModel };
