const fs = require('fs/promises');

exports.readUsers = async () => {
    try{
        const user = await fs.readFile("./users.json","utf-8")
        return JSON.parse(user);
        }
        catch(err){
            throw(err);
        }
}

exports.writeUser = async (user) =>{
    await fs.writeFile("./users.json",JSON.stringify(user,null,2));
}