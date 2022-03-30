const express = require('express');
const router  = express.Router();
const products = require('../controllers/products');
router.get('/', products.getProducts);
router.get('/:id', products.getProduct);
router.post('/', products.createProduct);
router.put('/:id', products.updateProduct);
router.delete('/:id', products.deleteProduct);

module.exports = router;