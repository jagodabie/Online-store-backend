const express = require('express');
const router  = express.Router();
const Auth = require('../controllers/Auth');
router.post('/', Auth.isAuth);

module.exports = router;