const express = require('express');
const router = express.Router();
const usersControllers = require('../../controllers/authControllers');
const auth = require('../../middleware/auth')



// @route POST api/auth
// @desc register auth user
// @access public 
router.post('/', usersControllers.user_register);

// @route GET api/auth
// @desc rget user data
// @access private
router.get('/user', auth, usersControllers.user_data);

module.exports = router;