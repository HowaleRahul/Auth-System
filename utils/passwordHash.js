const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.hashPassword = async(password) => {
    try{
        const hash = await bcrypt.hash(password, saltRounds);
            return hash;
    }catch(err){
        throw(err);
    }
}

exports.checkPassword = async(plainPass, hashPass) =>{
    try{
        const plain = await bcrypt.compare(plainPass, hashPass);
        //bcyrpt.compareSync(password, user.password);
            return plain;
    }catch(err){
        throw(err);
    }
}

/* exports.passwordHash = async(pass) => {
    try{
        const hash = await bcrypt.hash(pass,saltrounds)
        return hash
    }
        catch(err)
        {
            throw(err);
        }
    */