const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
    itemList: Array
})

const ItemModel = mongoose.model("item-list", ItemSchema)
module.exports = ItemModel