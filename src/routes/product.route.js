const router = require("express").Router();
const {insertProduct,viewAll,viewById, updateQtyAndPrice, deleteProduct} = require("../controller/product.ctrl");
const { adminVerify } = require("../middleware/auth");
const multer = require("../middleware/image.middleware")
router.post("/insert",adminVerify,multer.single("image"),insertProduct);
router.get("/viewAll",viewAll);
router.get("/viewById",viewById);
router.put("/edit/:id",adminVerify,updateQtyAndPrice);
router.delete("/delete/:id",adminVerify,deleteProduct);
module.exports = router;