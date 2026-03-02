const {app} = require('./app');
const logger = require('./middlewares/logger');
require('dotenv').config();
const port = process.env.Port || 3000;

app.listen(port, () =>{
    logger.info(`Server Running at port ${port}.`);
    console.log(`Server Running at port ${port}.`);
})