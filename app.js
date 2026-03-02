const express =  require('express');
const app = express();
const login = require('./routes/login');
const register = require('./routes/register');
const users = require('./users.json');
const logout = require('./routes/logout');
const cookieParser = require('cookie-parser');
const authenticateToken = require('./middlewares/authenticateToken');
const logger = require('./middlewares/logger');


app.use((req,res,next)=>{
    logger.info(`${req.method} ${req.url}`);
    next();
});
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const router = express.Router();
router.use(authenticateToken.authenticateToken);

router.post("/", (req,res) => {
   if(!users)
        return res.status(404).json({message: "users not found"});
    res.status(200).json(users);
});

router.post("/contact", (req,res) => {
   if(!users)
        return res.status(404).json({message: "users not found"});
    res.status(200).json(users);
});

app.use("/login",login);
app.use("/register",register);
app.use("/logout",logout);
app.use("/", router);



app.use((req,res)=>{
    res.status(404).json({message:"Invalid url"});
})

module.exports = {app, router};
