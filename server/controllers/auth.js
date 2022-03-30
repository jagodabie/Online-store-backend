const db = require('./db')
const bcrypt = require("bcrypt");
const {sign} =require('jsonwebtoken'); 

exports.isAuth = (req,res) => {
    const { login,password } = req.body;
    const userAuth = `SELECT*FROM online_store.users WHERE login='${login}'`;
    db.query(userAuth ,(err, result)=>{
        result.length !==0 ? bcrypt.compare(password, result[0].password).then((match) => {
        if (!match) res.status(400).json({ error: "Błędny login lub hasło." });
            const accessToken = sign({id: result[0].id ,login: result[0].login}, "ksdfjsdkfjsdkfdkfsd");
            res.status(200).json({
                message : 'Success',
                userInfo:{
                accessToken : accessToken, 
                login: result[0].login,
                name: result[0].name,
                surname: result[0].surname,
                email: result[0].email,
                admin: result[0].user_admin,
                client: result[0].user_client,
                }
            });
        }) : 
        res.status(404).json({ error: "Nie ma takiego użytkownika!" });
    });
   
}

