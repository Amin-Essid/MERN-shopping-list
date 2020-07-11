const express = require('express');
const router = express.Router();
const itemsControllers = require('../../controllers/itemsControllers');


// @route GET api/items
// @desc get all items
// @access public 
router.get('/', itemsControllers.items_get);

// @route POST api/items
// @desc create aan item
// @access public 
router.post('/', itemsControllers.item_post);

// @route DELETE api/items
// @desc create an item
// @access public 
router.delete('/:id', itemsControllers.item_delete);

module.exports = router;