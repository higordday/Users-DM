
const router = require('express').Router();
const chats_lister_controller = require('./../controllers/chats/list.js');

router.get('/', chats_lister_controller.list);

module.exports = router;