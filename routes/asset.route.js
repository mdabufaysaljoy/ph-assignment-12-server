const router = require("express").Router();

const {createAsset,deleteAsset,getAllAsset,updateAsset} = require("../controllers/asset.controller");
 
const verifyManager = require("../middlewares/verifyManager");
const verifyToken = require("../middlewares/verifyToken");


//? create asset 

router.post("/create",verifyToken,verifyManager,createAsset);


//? get all assets

router.get("/",verifyToken,getAllAsset);

//? update asset

router.put("/update/:_id",verifyToken,verifyManager,updateAsset);

//? delete asset

router.delete("/delete/:_id",verifyToken,verifyManager,deleteAsset);

module.exports = router;