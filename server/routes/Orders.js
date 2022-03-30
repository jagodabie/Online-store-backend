const express = require('express');
const router = express.Router();
const orders = require('../controllers/orders');

router.get('/', orders.getOrders);
router.get('/:id', orders.getOrder);
router.post('/', orders.createOrder);
router.put('/:id', orders.updateOrder);
router.delete('/:id', orders.deleteOrder);

module.exports = router;
