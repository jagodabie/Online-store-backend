const db = require('../controllers/db');
const bcrypt = require("bcrypt");

exports.getUsers = (req,res)=>{
    db.query('SELECT*FROM store.users' ,(err, result)=>{
        if (err) console.log(err);
        res.json({result})
    })
}

exports.getUser = (req,res)=>{
    const id =req.params.id;
    db.query( `SELECT*FROM store.users WHERE id='${id}'` ,(err, result)=>{
        if (err) res.status(404).send({res: 'Nie odnaleziono użytkownika'});
        res.json({result})
    })
}

exports.createUser =(req,res)=>{
    const login = req.body.login;
    const name = req.body.name;
    const password = req.body.password;
    const surname = req.body.surname;
    const email = req.body.email;
    const adress = {
        street: req.body.street, 
        number: req.body.number,
        flatNumber: req.body.flatNumber, 
        postalCode: req.body.postalCode,
        locality: req.body.locality
    };
    const admin = 0;
    const client = 1;
 
    db.query(
        `SELECT*FROM store.users WHERE login='${login}'`, 
        (err, result)=>{
            if (err) console.log(err);
            if(result.length !==0){
                res.status(200).json({ message: "Użytkownik o podaj nazwie istnieje w bazie danych." });
             }else{
                bcrypt.hash(password, 10).then((hash)=> {
                    db.query(
                        `INSERT INTO store.users (name,surname,email,adress_street,adress_street_number,adress_flat_number,adress_postal_code,adress_locality,user_client,user_admin,password,login) VALUES ('${name}','${surname}','${email}','${adress.street}','${adress.number}','${adress.flatNumber}','${adress.postalCode}','${adress.locality}','${client}','${admin}','${hash}','${login}')`
                        ,(err, result)=>{
                        res.status(200).json({message: 'Użytkownik został został poprawnie'});
                        if (err)  console.log(err)

                    })
                });
             }
    })

}

exports.updateUser = (req,res)=>{
    const login = req.body.login;
    const name = req.body.name;
    const password = req.body.password;
    const surname = req.body.surname;
    const email = req.body.email;
    const adress = {
        street: req.body.street, 
        number: req.body.number,
        flatNumber: req.body.flatNumber, 
        postalCode: req.body.postalCode,
        locality: req.body.locality
    };
    const admin =req.body.isAdmin;
    const client = req.body.isClient;
   
    db.query( 
        `UPDATE store.users SET name='${name}',surname='${surname}',email='${email}',adress_street='${adress.street}',adress_street_number='${adress.number}',adress_postal_code'${adress.postalCode}',adress_locality='${adress.locality}',user_client='${client}',user_admin='${admin},password='${password}',login='${login}' WHERE id='${id}'`
        ,(err, result)=>{
        if (err) console.log(err);
        res.json({result})
    })
}

exports.deleteUser = (req,res)=>{
    const id =req.params.id;
    db.query(`DELETE FROM store.users WHERE id='${id}'`,(err, result)=>{
        if (err) res.status(404).send({res: 'Użytkownik nie został znaleziony'});
        console.log(deleteUser)
        res.json({result})
    })

}
