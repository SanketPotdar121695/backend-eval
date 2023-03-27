const jwt = require('jsonwebtoken');
const { privateKey } = require('../db');

const authRequired = (req, res, next) => {
  let token = req.headers.authorization.split(' ')[1];
  if (token) {
    let decoded = jwt.verify(token, privateKey);
    if (decoded) {
      req.body.userID = decoded.userID;
      next();
    } else
      res
        .status(400)
        .send({ message: 'Access denied: authorization required!' });
  } else res.status(400).send({ message: 'Please login first!' });
};

module.exports = { authRequired };
