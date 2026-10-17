const {model} = require("mongoose");

const assetSchema = require("../schema/asset.schema");

const Asset = model("Asset",assetSchema);

module.exports = Asset;