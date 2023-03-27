const bcrypt = require('bcrypt');
const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { privateKey } = require('../db');
const { UserModel } = require('../models/user.model');

const userRouter = Router();

// Registration
userRouter.post('/register', async (req, res) => {
  const newUser = req.body;
  try {
    const user = await UserModel.find({ email: newUser.email });
    if (user.length > 0) {
      res.status(400).send({ message: 'User already exist, please login' });
    } else {
      bcrypt.hash(newUser.password, 5, async (err, hash) => {
        try {
          let user = new UserModel({ ...newUser, password: hash });
          await user.save();
          res
            .status(200)
            .send({ message: 'New user has been created successfully !' });
        } catch (err) {
          res.status(400).send({ message: err.message });
        }
      });
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

// Login
userRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          jwt.sign({ userID: user[0]._id }, privateKey, (err, token) => {
            if (token) {
              res.status(200).send({ message: 'Login Succeful!', token });
            } else res.status(400).send({ message: err.message });
          });
        } else
          res
            .status(400)
            .send({ message: 'Wrong Password! Please try again.' });
      });
    } else
      res.status(400).send({ message: 'Wrong Credentials! Please try again.' });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = { userRouter };
