const db = require("../config/dbconfig");
const addToCart = db.addToCart;
const product = db.product;
const Validator = require("validatorjs");
exports.insertaddToCart = async (req, res) => {
    try {
        const validator = new Validator(req.body, {
            qty: "required",
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
            const addToCartData = await addToCart.findOne({
                where: {
                    user_ID: req.user.id
                }
            })
            if (addToCartData) {
                const productRecord = await product.findOne({ id: req.params.id });
                if (productRecord) {
                    if (productRecord.qty < req.body.qty) {
                        res.status(503).json({
                            message: "Product is not available",
                            status: 503
                        })
                    }
                    else {
                        const productArr1 = addToCartData.product_info;
                        const addToCartProductData = {
                            product_ID: req.params.id,
                            qty: req.body.qty,
                            price: productRecord.price,
                            total_price: req.body.qty * productRecord.price
                        }
                        productArr1.push({ addToCartProductData });
                        await addToCart.update({ product_info: productArr1 }, {
                            where: {
                                id: addToCartData.id
                            }
                        });
                        res.status(200).json({
                            message: "addToCart inserted successfully",
                            status: 200,
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
                const productRecord = await product.findOne({ id: req.params.id });
                if (productRecord) {
                    if (productRecord.qty < req.body.qty) {
                        res.status(503).json({
                            message: "Product is not available",
                            status: 503
                        })
                    }
                    else {
                        const productArr = [
                            {
                                product_ID: req.params.id,
                                qty: req.body.qty,
                                price: productRecord.price,
                                total_price: req.body.qty * productRecord.price
                            }
                        ]
                        const addToCartData = {
                            user_ID: req.user.id,
                            product_info: productArr
                        }
                        const data = addToCart.create(addToCartData)
                        res.status(200).json({
                            message: "addToCart inserted successfully..!!",
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
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Something went wrong..!!",
            status: 500
        })
    }
}
exports.viewaddToCarts = async (req, res) => {
    try {
        const data = await addToCart.findAll();
        if (data) {
            res.status(200).json({
                message: "View successfully..!!",
                status: 200,
                data: data
            })
        }
        else {
            res.status(404).json({
                message: "addToCart is not found",
                status: 404
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "something went wrong..!!",
            status: 500
        })
    }
}
exports.viewCartByProductId = async (req, res) => {
    try {
        const data = await addToCart.findAll({
            where: {
                product_ID: req.params.id
            }
        });
        if (data[0]) {
            res.status(200).json({
                message: "successfully..!!!",
                status: 200,
                data: data
            })
        }
        else {
            res.status(404).json({
                message: "addToCart not found..!!!",
                status: 404
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "something went wrong..!!",
            status: 500
        })
    }
}
exports.viewCartByUserId = async (req, res) => {
    try {
        const data = await addToCart.findAll({
            where: {
                user_ID: req.user.id
            }
        });
        if (data[0]) {
            res.status(200).json({
                message: "successfully..!!!",
                status: 200,
                data: data
            })
        }
        else {
            res.status(404).json({
                message: "addToCart not found..!!!",
                status: 404
            })
        }
    } catch (error) {
        res.status(500).json({
            message: "something went wrong..!!",
            status: 500
        })
    }
}