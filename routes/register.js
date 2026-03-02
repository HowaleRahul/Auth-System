const express = require('express');
const app = express.Router();
const cookieParser = require('cookie-parser');
const userController = require('../controllers/user');


app.use(cookieParser());

app.post("/",userController.registerUser);

module.exports = app;