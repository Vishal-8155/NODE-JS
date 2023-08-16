const express = require('express');

const router = express.Router();

const {getuser, getalluser} = require('../controller/user2');

router.route('/user').get(getuser);
router.route('/alluser').get(getalluser);

module.exports = router;