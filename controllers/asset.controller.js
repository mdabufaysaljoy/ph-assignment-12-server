const Asset = require("../models/asset.model");

const createAsset = async (req, res) => {
    const {productName,productType,quantity,date} = req.body;
  try {
    const asset = await Asset.create({name: productName,type:productType,quantity,date});
 return   res.status(201).send({
      success: true,
      data: asset,
      message: "asset created successfully",
    });
  } catch (error) {
 return   res.status(501).send({ success: false, message: "asset creation failed" });
  }
};

const getAllAsset = async (req, res) => {
  try {
    const assets = await Asset.find();
 return   res.status(200).send({
      success: true,
      data: assets,
      message: "asset created successfully",
    });
  } catch (error) {
 return   res.status(501).send({ success: false, message: "asset find failed" });
  }
};

const updateAsset = async (req, res) => {
    
    const {productName,productType,quantity,date} = req.body;
  try {
    const _id = req.params._id;
    const updatedAsset = await Asset.findByIdAndUpdate({ _id }, {name: productName,type:productType,quantity,date});
   return res.status(203).send({
      success: true,
      data: updatedAsset,
      message: "asset updated successfully",
    });
  } catch (error) {
   return res.status(501).send({ success: false, message: "asset update failed" });
  }
};

const deleteAsset = async (req, res) => {
    try {
      const _id = req.params._id;
    const deletedAsset = await Asset.findByIdAndDelete(_id);
    if (!deletedAsset) {
      return res.status(404).send({
        success: false,
        message: "Asset not found",
      });
    }
   return res.status(200).send({
      success: true,
      data: deletedAsset,
      message: "asset deleted successfully",
    });
  } catch (error) {
 return   res.status(501).send({ success: false, message: "asset delete failed" });
  }
};

module.exports = {
  createAsset,
  getAllAsset,
  updateAsset,
  deleteAsset,
};
