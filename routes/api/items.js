const express = require('express');
const router = express.Router();
const itemsControllers = require('../../controllers/itemsControllers');
const auth = require('../../middleware/auth')


// @route GET api/items
// @desc get all items
// @access public 
router.get('/', itemsControllers.items_get);

// @route POST api/items
// @desc create aan item
// @access private
router.post('/', auth, itemsControllers.item_post);

// @route DELETE api/items
// @desc create an item
// @access private
router.delete('/:id', auth, itemsControllers.item_delete);

module.exports = router;