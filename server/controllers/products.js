const db = require('./db')

exports.getProducts = (req,res)=>{
    db.query('SELECT*FROM online_store.products' ,(err, result)=>{
        if (err) console.log(err);
        res.json({result})
    })
}

exports.getProduct = (req,res)=>{
    const id =req.params.id;
    db.query( `SELECT*FROM online_store.products WHERE id='${id}'` ,(err, result)=>{
        if (err) res.status(404).send({res: 'Nie odnaleziono produktu'});
        res.json({result})
    })
}

exports.createProduct =(req,res)=>{
    console.log(req.body.file)
    const name = req.body.name;
    const description = req.body.description;
    const descriptionShort = 'max ';
    const price = req.body.price;
    const pic = req.body.file?.file;
    const productNumber = req.body.productNumber;
    const isAvailable = req.body.productNumber?1:0;
    console.log(`INSERT INTO online_store.products (product_name,product_despcription,product_description_short,product_price,product_pic,products_ammount,is_available) VALUES ('${name}','${description}','${descriptionShort}','${price}','${pic}','${productNumber}','${isAvailable}')`)

    db.query( 
        `INSERT INTO online_store.products (product_name,product_despcription,product_description_short,product_price,product_pic,products_ammount,is_available) VALUES ('${name}','${description}','${descriptionShort}','${price}','${pic}','${productNumber}','${isAvailable}')`
        ,(err, result)=>{
        if (err) console.log(err);
        res.json({result})
    })
}

exports.updateProduct = (req,res)=>{
    const name = req.body.name;
    const description = req.body.description;
    const descriptionShort = 'max ';
    const price = req.body.price;
    const pic = req.body.file?.file;
    const productsNumber = req.body.productNumber;
    const isAvailable = req.body.productNumber?1:0;
   
    db.query( 
        `UPDATE online_store.products SET product_name='${name}' product_despcription='${description}' product_description_short='${descriptionShort}',product_price='${price}',product_pic='${pic}',products_ammount='${productsNumber},'is_available='${isAvailable}' WHERE id='${id}'`
       ,(err, result)=>{
        if (err) console.log(err);
        res.json({result})
    })
}

exports.deleteProduct = (req,res)=>{
    const id =req.params.id;
    db.query(`DELETE FROM online_store.products WHERE id='${id}'`,(err, result)=>{
        if (err) res.status(404).send({res: 'Użytkownik nie został znaleziony'});
        res.json({result})
    })

}
