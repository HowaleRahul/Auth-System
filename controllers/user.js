const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const Password = require('../utils/passwordHash');
const userModel = require('../models/user');
const logger = require('../middlewares/logger');
const { generatePasswordWithOptions } = require ("password-generator");
require('dotenv').config();

exports.registerUser = async(req,res)=> {
const userData = req.body;
logger.info(`Register attempt: ${userData.email}`);

  if (!userData.name || !userData.email) {
    logger.warn(`Registartion failed`);
    return res.status(400).json({ message: "bad request" });
  }

  try {
    const users = await userModel.readUsers();

    const userExist = users.find(user => user.email === userData.email)
    if(userExist){
        return res.status(400).json({message:"email already registered"});
    } 

    const newId = uuid.v4();

  
    const plainPassword =  await generatePasswordWithOptions({
      length: 8,
      numbers: true,
      symbols: true,
      uppercase: true,
      excludeSimilarCharacters: true,
      lowercase: true,
      exclude: '"/\\(){}[]|`~',
      ignoreSecurityRecommendations: true,
      strict: true
    });

    // console.log(plainPassword);

    const hashedPassword = await Password.hashPassword(plainPassword);

    const newUser = { id: newId, name: userData.name, email: userData.email, password: hashedPassword };
    users.push(newUser);

    await userModel.writeUser(users);
    logger.info(`User registered successfully ID: ${newId}`);

    return res.json({ status: "success user registered!", id: newId});
  } catch (err) {
    logger.error(`Register error : ${err.message}`);
    return res.status(500).json({ message: "Internal server error" });
  }
}

exports.loginUser = async (req,res) =>{
    const {email, password} = req.body;
    logger.info(`Login attempt: ${email}`);
    
    if(!email || !password){
        logger.warn(`Login failed - Missing credentials`);
        return res.status(400).json({message: "All fields are required!"});
    }
    const data = await userModel.readUsers();
    const user = data.find((user) => user.email === email);

    if(!user){
        logger.warn(`Login failed - User not found: ${email}`);
        return res.status(404).json({message: "User not found!"});
    }

    const isPasswordValid = await Password.checkPassword(password, user.password);

    if(!isPasswordValid){
        logger.warn(`Login failed - Invalid password or Email`);
        return res.status(401).json({message: "Invalid credentials!"});
    }
    else{
      const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_SECRET, { expiresIn: "5m" });
      res.cookie("token", token);
      logger.info(`User logged in successfully: ${email}`);

      res.status(200).json({message: "Logged in successfully!", token: token});
    }
}