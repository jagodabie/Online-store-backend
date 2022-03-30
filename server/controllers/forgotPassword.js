const db = require('./db')
const {sign , verify} =require('jsonwebtoken'); 

const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox5ecba0dec8984b899a91dabb687fbe82.mailgun.org';
const mg = mailgun({apiKey: '4caad3d4a952da3f13975cc4edc04355-7005f37e-a5c4e5ac', domain: DOMAIN});


exports.forgotPassword = (req,res) => {
    const { email } = req.body

    const userAuth = `SELECT*FROM store.users WHERE email='${email}'`;

    db.query(userAuth ,(err, result)=>{
        if(err || result.length ===0){
            return  res.status(404).json({err: "Nie ma takiego użytkownika!" });
        }
        const accessToken = sign({id: result[0].id }, "87485s4adasd");
        const data ={
            from: 'noreplay@hello.com',
            to: email, 
            subject: 'Restartowanie hasła',
            html:`
                <h2> Nacisnij na link aby zrestartować hasło </h2>
                <a href='http://localhost:3000/auth/reset/${accessToken}'>
                http://localhost:3000/auth/reset/${accessToken}
                <a>
            `
        }
     
            return db.query(`UPDATE store.users SET reset_link='${accessToken}' WHERE email='${email}'` ,function(err, result){
                if(err)
                {
                    //res.status(404).json({ error: "Błąd link do restartu hasła !"})
                    console.log(err)                
                 }else{
                    mg.messages().send(data, function (error, body) {
                        if(error){
                            return res.json({ error: err.message})
                        }
                        console.log(body);
                    });
                    res.status(200).json({ message: "Na adres email zostanie wysłany link restartujący hasło." })
                }
            
            })
    });
   
}
exports.resetPassword = (req,res) => {

    const { resetLink, newPassword} = req.body;
    if(resetLink){
        verify(resetLink,"87485s4adasd", function(err, decodeData){
            if(err){
                return res.status(401).json({
                    error: "Incorrect token"
                })
            }
            const userAuth = `SELECT*FROM store.users WHERE reset_link='${resetLink}'`
            db.query(userAuth ,(err, result)=>{
                if(err || result.length ===0){
                    return  res.status(404).json({ error: "Nie ma takiego użytkownika!" });
                }
                return db.query(`UPDATE store.users SET password='${newPassword}' WHERE reset_link='${resetLink}'` ,function(err, result){
                    if(err){console.log(err)
                    }else{
                    res.status(200).json({ message: "Hasło zostało zmienione" })}
                    })
            });
        })
    }else{
        return res.status(401).json({ error: "Brak autentykacji!" });
    }
}

