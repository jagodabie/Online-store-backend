const express = require('express');
const app = express();
const PORT = 8080;
const cors = require('cors');
require('dotenv').config();
const port = 8000;
const stripe = require('stripe')('sk_test_51K6AERJqh6ddLpQD1dC09QeQh65lSkueXdgBC9l3YMetjtXF9WlpJF1VhgqTHjQwLsO1Bxnp6zlU4ontFeT6aVHI00HBQaHRLN');
const { v4: uuidv4 } = require('uuid');
uuidv4();
const db = require('./controllers/db');
const orders = require('./routes/Orders.js');
const products = require('./routes/Products');
const users = require('./routes/Users');
const auth = require('./routes/Auth');
const forgetPassword = require('./routes/ForgetPassword');
const restartPassword = require('./routes/ResetPassword');

app.use(cors());
app.use(express.json());

// Routers
app.use('/orders', orders);
app.use('/products', products);
app.use('/users', users);
app.use('/auth', auth);
app.use('/forget-password', forgetPassword);
app.use('/reset-password', restartPassword);

/*
app.post("/payment", (req, res) =>{
  const {product, token} =req.body.body;
  console.log(req.body)
  console.log("PRODUCT", product);
  console.log("PRICE", product.price);
  const idempontencyKey  = uuidv4();


  return stripe.customers.create({
    email: token.email,
    source: token.id
  }).then(customer => {
    stripe.charges.create({
      ammount: product.price * 100,
      currency:'pln',
      customer: customer.id,
      receipt_email: token.email,
      description: product.name
    },idempontencyKey)
    .then(result=> res.status(200).json(result))
    .catch(err => console.log(err))
  })
})
*/
const storeItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React Today" }],
  [2, { priceInCents: 20000, name: "Learn CSS Today" }],
])

app.post("/create-checkout-session", async (req, res) => {
  console.log(req.body.body)
  console.log(' wtf')
  try {
    const {product, token} =req.body.body
    console.log(req.body.body)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.body.product.map(item => {
        const storeItem = storeItems.get(item.id)
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem.name,
            },
            unit_amount: storeItem.priceInCents,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `${process.env.CLIENT_URL}`,
      cancel_url: `${process.env.CLIENT_URL}card/data-form`,
    })
    res.json({ url: session.url })
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: e.message })
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

