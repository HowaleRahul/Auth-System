const express = require('express');
const app = express.Router();
const logger = require('../middlewares/logger');

app.post("/",(req,res) =>{
    logger.info(`User logged out`);
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully' });
});
    
module.exports = app;