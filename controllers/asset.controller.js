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
    const {
      availability,
      assetType,
      sortbyquantity,
      search,
    } = req.query;

    // Build dynamic filter
    const filter = {};

    // 1. Filter by availability
    if (availability === "instock") {
      filter.quantity = { $gt: 0 };
    } else if (availability === "outofstock") {
      filter.quantity = { $lte: 0 };
    } else if (availability) {
      return res.status(400).send({
        success: false,
        message: "Invalid availability value",
      });
    }

    // 2. Filter by asset type
if (assetType) {
  if (assetType === "returnable") {
    filter.type = "Returnable";
  } else if (assetType === "nonreturnable") {
    filter.type = "Non-Returnable";
  } else {
    return res.status(400).send({
      success: false,
      message: "Invalid asset type",
    });
  }
}

    // 3. Search by asset name (case-insensitive)
    if (search) {
      const escapedSearch = search.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      filter.name = {
        $regex: escapedSearch,
        $options: "i",
      };
    }

    // 4. Sort by quantity
    const sort = {};

    if (sortbyquantity === "asc") {
      sort.quantity = 1;
    } else if (sortbyquantity === "desc") {
      sort.quantity = -1;
    } else if (sortbyquantity) {
      return res.status(400).send({
        success: false,
        message: "Invalid quantity sort value",
      });
    }

    // Fetch assets using filters and sorting
    const assets = await Asset.find(filter).sort(sort);

    return res.status(200).send({
      success: true,
      data: assets,
      total: assets.length,
      message: "Assets fetched successfully",
    });
  } catch (error) {
    console.error("Get assets error:", error);

    return res.status(500).send({
      success: false,
      message: "Failed to fetch assets",
    });
  }
};


const updateAsset = async (req, res) => {
    
    const {productName,productType,quantity,date} = req.body;
  try {
    const _id = req.params._id;
    const updatedAsset = await Asset.findByIdAndUpdate( _id , {name: productName,type:productType,quantity,date});
   return res.status(200).send({
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
