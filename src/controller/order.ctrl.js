const db = require("../config/dbconfig");
const order = db.order;
const product = db.product;
const addToCart = db.addToCart;
const Validator = require("validatorjs");

exports.insertOrder = async (req, res) => {
    try {
        const validator = new Validator(req.body, {
            qty: "required",
            price: "required"
        });
        if (validator.fails()) {
            const key = Object.keys(validator.errors.all())[0];
            const error = validator.errors.first(key);
            res.status(400).json({
                error,
                status: 400
            })
        }
        else {
            const productRecord = await product.findOne({ id: req.params.id });
            if (productRecord) {
                if (productRecord.qty < req.body.qty) {
                    res.status(503).json({
                        message: "Product is not available",
                        status: 503
                    })
                }
                else {
                    await product.update({ qty: product.qty - req.body.qty }, {
                        where: {
                            id: req.params.id
                        }
                    })
                    const addToCartData = addToCart.build({
                        product_ID: req.params.id,
                        user_ID: req.user.id,
                        qty: req.body.qty,
                        price: productRecord.price,
                        total_price: qty * productRecord.price
                    })
                    const data = await addToCartData.save();
                    res.status(200).json({
                        message: "Order is inserted successfully",
                        status: 200,
                        data: data
                    })
                }
            }
            else {
                res.status(404).json({
                    message: "Product not found",
                    status: 404
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong..!!",
            status: 500
        })
    }
}

exports.insertOrderOfCart = async (req, res) => {
    try {
        const cart_data = await addToCart.findOne({
            where: {
                id: req.params.cart_Id
            }
        });
        if (cart_data) {
            const product_info = cart_data.product_info
            const productOfCart = product_info.filter(product => {
                return product.product_ID == req.params.product_ID
            });
            if (productOfCart[0]) {
                const productRecord = await product.findOne({
                    where: {
                        id: req.params.product_ID
                    }
                })
                if (productRecord) {

                    if (productOfCart[0].qty > productRecord.qty) {
                        res.status(503).json({
                            message: "Product is not available",
                            status: 503
                        })
                    }
                    else {
                        const orderData = order.build({
                            product_ID: req.params.product_ID,
                            user_ID: req.user.id,
                            qty: productOfCart[0].qty,
                            price: productOfCart[0].price,
                            total_price: productOfCart[0].qty * productOfCart[0].price
                        });
                        const data = await orderData.save();
                        product_info.splice(product_info.findIndex((data) => {
                            return data.product_ID == req.params.product_ID
                        }), 1);
                        await addToCart.update({ product_info: product_info }, {
                            where: {
                                id: req.params.cart_Id
                            }
                        })
                        await product.update({ qty: productRecord.qty - req.body.qty }, {
                            where: {
                                id: req.params.id
                            }
                        });
                        res.status(200).json({
                            message: "Order is inserted successfully",
                            status: 200,
                            data: data
                        })
                    }
                }
                else {
                    res.status(404).json({
                        message: "Product not found",
                        status: 404
                    })
                }
            }
            else {
                res.status(404).json({
                    message: "Product not found in your cart",
                    status: 404
                })
            }
        } else {
            res.status(404).json({
                message: "Cart not found",
                status: 404
            })
        }

    } catch (error) {
        res.status(500).json({
            message: "Something went wrong..!!",
            status: 500
        })
    }
}

exports.orderStatusUpdate = async (req, res) => {
    try {
        const orderRecord = await order.findOne({
            where: {
                id: req.params.id
            }
        });
        if (orderRecord) {
            if (orderRecord.status == req.body.status) {
                res.status(409).json({
                    message: "Order status is already updated..!!",
                    status: 409
                })
            }
            else {
                if (req.body.status == 1) {
                    res.status(400).json({
                        message: "Order status can't be updated..!!",
                        status: 400
                    })
                }
                else if (req.body.status == 2) {
                    await order.update({ status: req.body.status }, {
                        where: {
                            id: req.params.id
                        }
                    });
                    res.status(200).json({
                        message: "Order is in process..!!",
                        status: 200
                    })
                }
                else if (req.body.status == 3) {
                    await order.update({ status: req.body.status }, {
                        where: {
                            id: req.params.id
                        }
                    });
                    res.status(200).json({
                        message: "Order is delivered..!!",
                        status: 200
                    })
                }
                else if (req.body.status == 4) {
                    await order.update({ status: req.body.status }, {
                        where: {
                            id: req.params.id
                        }
                    });
                    res.status(200).json({
                        message: "Payment of ordered item is successfully..!!",
                        status: 200
                    })
                }
                else if (req.body.status == 5) {
                    await order.update({ status: req.body.status }, {
                        where: {
                            id: req.params.id
                        }
                    });
                    const productRecord = await product.findOne({ id: orderRecord.product_ID });
                    if (productRecord) {
                        await product.update({ qty: productRecord.qty + orderRecord.qty }, {
                            where: {
                                id: orderRecord.product_ID
                            }
                        });
                        res.status(200).json({
                            message: "Order is cancelled..!!",
                            status: 200
                        })
                    }
                    else {
                        res.status(404).json({
                            message: "Product not found...!!!",
                            status: 404
                        });
                    }
                }
                else if (req.body.status == 6) {
                    await order.update({ status: req.body.status }, {
                        where: {
                            id: req.params.id
                        }
                    });
                    const orderHistoryData = await order.build({
                        order_ID: req.params.id,
                        product_ID: orderRecord.product_ID,
                        user_ID: req.user.id,
                        price: orderRecord.price,
                        total_price: orderRecord.total_price,
                        qty: orderRecord.qty,
                        orderCreatedDate: orderRecord.createdAt
                    })
                    const data = await orderHistoryData.save();
                    res.status(200).json({
                        message: "Order process is closed successfully..!!",
                        status: 200,
                        data: data
                    })
                }
            }
        }
        else {
            res.status(404).json({
                message: "Order not found...!!!",
                status: 404
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong..!!",
            status: 500
        })
    }
}

exports.getOrderByProductId = async (req, res) => {
    try {
        const productRecord = await db.product.findOne({
            where: {
                id: req.params.product_ID
            }
        });
        if (productRecord) {
            const orderRecord = await order.findOne({
                where: {
                    product_ID: req.params.product_ID
                }
            });
            if (orderRecord) {
                res.status(200).json({
                    message: "Order found..!!",
                    status: 200,
                    data: orderRecord
                })
            }
            else {
                res.status(404).json({
                    message: "Order not found..!!",
                    status: 404
                })
            }
        }
        else {
            res.status(404).json({
                message: "Product not found..!!",
                status: 404
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Somrthing went wrong..!!",
            status: 500
        })
    }
}

exports.getOrderByUserId = async (req, res) => {
    try {
        const orderRecord = await order.findOne({
            where: {
                user_ID: req.user.id
            }
        })
        if (orderRecord) {
            res.status(200).json({
                message: "Order found..!!",
                status: 200,
                data: orderRecord
            })
        }
        else{
            res.status(404).json({
                message: "Order not found..!!",
                status: 404
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong..!!",
            status: 500
        })
    }
}

exports.getOrderByOrderId = async (req, res) => {
    try {
        const orderRecord = await order.findOne({where:{
            id:req.params.order_ID
        }});
        if (orderRecord) {
            res.status(200).json({
                message: "Order found..!!",
                status: 200,
                data: orderRecord
            })
        }
        else {
            res.status(404).json({
                message: "Order not found..!!",
                status: 404
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong..!!",
            status: 500
        })
    }
}

exports.getAllOrder = async (req,res) => {
    try {
        const orderRecord = await order.findAll()
        if (orderRecord) {
            res.status(200).json({
                message: "Order found..!!",
                status: 200,
                data: orderRecord
            });
        }
        else{
            res.status(404).json({
                message: "Order not found..!!",
                status: 404
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong..!!",
            status: 500
        })
    }
}
