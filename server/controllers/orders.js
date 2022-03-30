
const mysql = require('mysql');
const db = mysql.createConnection({
    user: "root",
    password: "QAZ123qaz.", 
    host: "127.0.0.1",
    port:3306,
    database: "online_store",
    insecureAuth : true,
    multipleStatements: true,
})

exports.getOrders =  (req, res) => {
      db.query('SELECT*FROM online_store.orders',(err, result)=>{
      if (err) console.log(err);
       result.forEach(item =>{
       item.productList = JSON.parse(item.products_list)
       })

      res.json({result})
  })
}

exports.getOrder = (req,res)=>{
    const id =req.params.id;
    db.query( `SELECT*FROM online_store.orders WHERE id='${id}'` ,(err, result)=>{
        if (err) res.status(404).send({res: 'Nie odnaleziono zamówienia'});
        res.json({result})
    })
}

exports.createOrder =(req,res)=>{
    const number = req.body?.number || null;
    const totalPrice = req.body?.totalPrice || 0;
    const productsList = JSON.stringify(req?.body?.productsList) || null;
    const user = req.body?.user || 0;
    const status = req.body?.status || null;
    const name = req.body?.name || null;
    const surname = req.body?.surname || null;
    const email = req.body?.email || null;
    const adress = {
        street: req.body?.street || null, 
        number: req.body?.number || null,
        flatNumber: req.body?.flatNumber || null, 
        postalCode: req.body?.postalCode || null,
        locality: req.body?.locality || null
    };
   
    db.query( 
        `INSERT INTO online_store.orders (number,total_price,products_list,userIn,status,name,surname,email,street,street_number,flat_number,postal_code,locality) VALUES ('${number}','${totalPrice}','${productsList}','${user}','${status}','${name}','${surname}','${email}','${adress.street}','${adress.number}','${adress.flatNumber}','${adress.postalCode}','${adress.locality}')`
        ,(err, result)=>{
        if (err) console.log(err);
        res.json({result})
    })
}

exports.updateOrder = (req,res)=>{
    const number = req.body.number;
    const totalPrice = req.body.totalPrice;
    const productsList = req.body.productsList;
    const user = req.body.user;
    const status = req.body.status;
    db.query(
        `UPDATE online_store.orders SET number='${number}',total_price=${totalPrice}',products_list='${productsList}',user='${user}',status='${status}') VALUES ' ,,'${user}','${status}')` 
       ,(err, result)=>{
        if (err) console.log(err);
        res.json({result})
    })
}

exports.deleteOrder = (req,res)=>{
    const id =req.params.id;
    db.query(`DELETE FROM online_store.orders WHERE id='${id}'`,(err, result)=>{
        if (err) res.status(404).send({res: 'Użytkownik nie został znaleziony'});
        res.json({result})
    })

}
