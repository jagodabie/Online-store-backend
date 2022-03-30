const express = require('express');
const router  = express.Router();
const forgotPassword = require('../controllers/forgotPassword');
router.put('/', forgotPassword.forgotPassword);
module.exports = router;