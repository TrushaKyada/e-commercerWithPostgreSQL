const db = require("../config/dbconfig");
const product = db.product;
const Validator = require("validatorjs");
const cloudinary = require("../config/cloudinary.config");
exports.insertProduct = async(req,res) => {
    try {
        const validator = new Validator(req.body,{
            name:"required",
            qty:"required",
            price:"required",
        });
        const cloudinaryImageUpload = async(file) => {
            return new Promise(resolve=>{
                cloudinary.uploader.upload(file,(err,res)=>{
                    if(err) return err;
                    resolve({
                        res:res.secure_url
                    })
                })
            })
        }
        const file = req.file;
        const {path} = file;
        const newPath = await cloudinaryImageUpload(path);
        if(validator.fails()){
            const key = Object.keys(validator.errors.all())[0];
            const error = validator.errors.first(key);
            res.status(400).json({
                error,
                status:400
            })
        }
        else{
            const productData = {
                name:req.body.name,
                qty:req.body.qty,
                price:req.body.price,
                image:newPath.res
            }
            const data = await product.create(productData);
            res.status(200).json({
                message:"product inserted successfully...!!!",
                status:200,
                data:data
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Something went wrong!!!",
            status:500
        })
    }
}
exports.viewById = async(req,res) => {
    try {
        const data = await product.findOne({
            where:{
                id:req.params.id
            }
        })
        if(data){
            res.status(200).json({
                message:"product view successfully...!!!",
                status:200,
                data:data
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"Something went wrong...!!!",
            status:500
        })
    }
}
exports.viewAll = async(req,res) => {
    try {
        const data = await product.findAll()
        if(data[0]){
            res.status(200).json({
                message:"product view successfully...!!!",
                status:200,
                data:data
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"Something went wrong...!!!",
            status:500
        })
    }
}
exports.updateQtyAndPrice = async(req,res) => {
    try {
        const data = await product.findOne({
            where:{
                id:req.params.id
            }
        })
        if(data){
            await product.update(req.body,{where:{id:data.id}})
            res.status(200).json({
                message:"product updated successfully...!!!",
                status:200
            })
        }
        else{
            res.status(404).json({
                message:"product not found",
                status:404
            })
        }
    } catch (error) {
       
        res.status(500).json({
            message:"Something went wrong...!!!",
            status:500
        })
    }
}
exports.deleteProduct = async(req,res) => {
    try {
        const data = await product.findOne({
            where:{
                id:req.params.id
            }
        })
        if(data){
            await product.delete({where:{id:data.id}})
            res.status(200).json({
                message:"product deleted successfully...!!!",
                status:200
            })
        }
        else{
            res.status(404).json({
                message:"product not found",
                status:404
            })
        }
    } catch (error) {
        res.status(500).json({
            message:"Something went wrong...!!!",
            status:500
        })
    }
}
