const mongoose = require('mongoose');

// User schema
const userSchema = mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    gender: String,
    password: String,
    age: Number,
    city: String,
    is_married: Boolean
  },
  {
    versionKey: false
  }
);

// User model
const UserModel = mongoose.model('user', userSchema);

module.exports = { UserModel };
