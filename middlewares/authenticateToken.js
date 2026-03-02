const jwt = require('jsonwebtoken');
const logger = require('./logger');
require('dotenv').config();

exports.authenticateToken = async (req, res, next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  // Bearer <token>

    if (token == null){
        logger.warn(`Authentication failed - No token provided`);// No token present
        return res.sendStatus(401); 
    }  

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err){
            logger.warn(`Authentication failed - Invalid token: ${err.message}`);
            return res.sendStatus(403);  // Invalid token
        } 
        req.user = user;
        logger.info(`Authentication successful for user`);
        next();
    });
}