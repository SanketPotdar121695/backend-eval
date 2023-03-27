const mongoose = require('mongoose');
require('dotenv').config();
const PORT = process.env.PORT;
const privateKey = process.env.privateKey;

const connection = mongoose.connect(process.env.mongoURL);
module.exports = { connection, PORT, privateKey };
