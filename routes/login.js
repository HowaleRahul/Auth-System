const express = require('express');
const app = express.Router();
const userController = require('../controllers/user');
require('dotenv').config();

app.post('/',userController.loginUser);

module.exports = app;