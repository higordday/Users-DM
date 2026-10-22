
const router = require('express').Router();
const login_controller = require('./../../controllers/users/login.js');

router.post('/users/login', login_controller.login);

module.exports = router;