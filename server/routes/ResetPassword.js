const express = require('express');
const router  = express.Router();
const resetPassword = require('../controllers/forgotPassword');
router.put('/', resetPassword.resetPassword);
module.exports = router;