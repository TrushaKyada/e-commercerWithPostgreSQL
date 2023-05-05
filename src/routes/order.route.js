const router = require('express').Router();
const { insertOrder, insertOrderOfCart, orderStatusUpdate, getOrderByProductId, getAllOrder, getOrderByOrderId } = require("../controller/order.ctrl");
const { userVerify, adminVerify } = require('../middleware/auth');

router.post('/insert/:id',userVerify,insertOrder);
router.post('/insertFromCart/:cart_Id/:product_ID',userVerify,insertOrderOfCart);
router.put('/updateStatus/:id',adminVerify,orderStatusUpdate);
router.get('/viewByProduct/:product_ID',adminVerify,getOrderByProductId);
router.get('/viewByUser',userVerify,getOrderByOrderId);
router.get('/viewAll',adminVerify,getAllOrder);

module.exports = router;