// Item model
const Item = require('../models/Item');

const items_get = (req, res) => {
    Item.find()
        .sort({ date: -1 })
        .then(items => res.json(items))
};

const item_post = (req, res) => {
    const newItem = new Item({
        name: req.body.name
    });
    newItem.save()
        .then(item => res.json(item))
};

const item_delete = (req, res) => {
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}))
}

module.exports = {
    items_get,
    item_post,
    item_delete
} 