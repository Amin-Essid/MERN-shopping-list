const express = require('express');
const router = express.Router();
const usersControllers = require('../../controllers/usersControllers');


// @route POST api/ysers
// @desc register new user
// @access public 
router.post('/', usersControllers.user_register);

module.exports = router;