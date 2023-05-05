const router = require('express').Router();
const {insertaddToCart,viewCartByProductId,viewaddToCarts,viewCartByUserId} = require("../controller/addToCart.ctrl");
const { userVerify, adminVerify } = require('../middleware/auth');
router.post("/insert/:id",userVerify,insertaddToCart);
router.get("/viewAll",adminVerify,viewaddToCarts);
router.get("/viewByProductId/:id",adminVerify,viewCartByProductId);
router.get("/viewByUserId/:id",userVerify,viewCartByUserId);
module.exports = router;
