const {Schema} = require("mongoose");

const assetSchema = new Schema({
    name: String,
    type: String,
    quantity: Number,
    date: String
},{timestamps:true});

module.exports = assetSchema