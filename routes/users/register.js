
const router = require('express').Router();
const register_controller = require('./../../controllers/users/register.js');

router.post('/users/register', register_controller.register);

module.exports = router;