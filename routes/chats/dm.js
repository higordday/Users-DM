
const router = require('express').Router();
const dm_controller = require('./../../controllers/chats/dm.js');

router.get('/chat/:target_username', dm_controller.dm);

module.exports = router;